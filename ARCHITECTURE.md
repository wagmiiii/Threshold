# Threshold — Architecture

## Design constraints from Midnight itself
Midnight contracts (Compact) are structured around three distinct execution contexts, and the architecture below is organized around that split because it is not optional — it is how the platform works:

1. **Public ledger** — on-chain state, visible to all network participants. Anything written here is public by definition.
2. **Zero-knowledge circuits** — on-chain functions, compiled from Compact, that validate operations using proofs without revealing their private inputs.
3. **Local computation (witnesses)** — arbitrary code that runs on the user's own machine. Witnesses can read/return private data and update private state, but cannot modify public ledger state directly. Anything a witness returns that reaches a ledger field or an exported circuit's return value without an explicit `disclose()` call will fail to compile — this is a compiler-enforced privacy boundary, not a convention.

Everything in this document maps onto that three-way split.

## System overview

```
┌─────────────────────────────┐
│  Prover client (browser)    │
│  React + Midnight SDK       │
│  - private value input      │
│  - local witness functions  │
│  - commitment generation    │
└───────────┬─────────────────┘
            │ local computation only
            ▼
┌─────────────────────────────┐
│  Proof server (local)       │
│  generates ZK proof from    │
│  circuit + private witness  │
└───────────┬─────────────────┘
            │ proof + public outputs only
            ▼
┌─────────────────────────────┐
│  Midnight testnet            │
│  Compact contract:           │
│  - ledger state (public)     │
│  - circuits (proof-verified) │
└───────────┬─────────────────┘
            │ public reads
            ▼
┌─────────────────────────────┐
│  Verifier client (browser)  │
│  reads attestation records  │
└─────────────────────────────┘
```

The prover's raw private value never crosses the boundary into the proof server's output or onto the ledger. Only the commitment, the rule ID, the pass/fail boolean, and timestamps are public.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Smart contract | Compact (Midnight's DSL, TypeScript-like syntax, compiles to ZK circuits) | Mandatory — this is the only contract language Midnight supports. |
| Contract tooling | Midnight Compact compiler + zkir compiler (produces proving/verification keys) | Generated automatically from `.compact` source; do not hand-write circuit IR. |
| Frontend | React + TypeScript | Matches the generated TypeScript bindings the Compact compiler emits (`contract/index.d.ts`), minimizing glue code. |
| Wallet / signing | Midnight Lace wallet connector | Standard prover-facing wallet integration referenced across Midnight tutorials and example dApps. |
| Proof generation | Local Midnight proof server | Required — proofs are generated client-side against the user's private witness data, never server-side with real inputs. |
| Network target | Midnight testnet (Preview or Preprod, per current docs guidance) | No mainnet deployment for the hackathon; matches documented dev environment options. |
| Hashing | `persistentHash<T>` (SHA-256, stable across protocol upgrades) for anything stored in ledger state; `transientHash<T>` only for ephemeral in-circuit checks | Docs are explicit that persistentHash is the correct choice for anything durable or used for authentication; getting this backwards is a real correctness bug, not a style choice. |
| Commitments | Compact standard library `transientCommit<T>(value, rand)` pattern — value + random salt, so the underlying value can't be brute-forced from the public commitment | Required because revenue-style values have small-ish, guessable ranges; a bare hash without salt is not sufficient (documented explicitly). |

## Data model

### Ledger (public, on-chain state)

```
ledger rules: Map<Field, ThresholdRule>
ledger attestations: Map<Bytes<32>, AttestationRecord>
```

`ThresholdRule` (public — the bar itself is meant to be public):
- `ruleId: Field`
- `comparisonType: Uint<8>` (v1: gte only, encoded as a constant)
- `thresholdValue: Field`
- `description: Bytes<64>` (short public label, e.g. "revenue-5k-monthly")

`AttestationRecord` (public — only the result, never the input):
- `commitment: Bytes<32>` — persistentHash of (proverPublicId, salt) or equivalent binding commitment
- `ruleId: Field`
- `passed: Boolean`
- `issuedAt: Field` (block time or sequence number)
- `expiresAt: Field`
- key note: the record's key in the map is the commitment hash itself, so lookups are by commitment, not by prover identity, which avoids building an implicit public registry of "who has attested to what."

### Private state (local to prover, never on-chain)
- `rawValue: Field` — the actual revenue/attribute figure.
- `salt: Field` — random value used in the commitment, generated once per attestation and stored locally so the prover can re-derive/reference the same commitment later if needed.
- Local attestation history (which rule IDs this device has proven against, and when) — purely a UX convenience, reconstructable from the prover's own memory, never read from other users' data.

### Witness functions (local computation, called from circuits)
- `witness getPrivateValue(): Field` — returns the user-entered raw value from local storage/input. Never touches ledger.
- `witness getSalt(): Field` — returns or generates the commitment salt.

These witnesses cannot write to ledger state themselves; their return values are consumed inside a circuit, which is the only thing permitted to update `ledger` fields.

### Circuits (on-chain, proof-verified)
- `circuit attest(ruleId: Field): []` — pulls `getPrivateValue()` and `getSalt()` via witness calls, looks up the `ThresholdRule` for `ruleId`, evaluates the comparison, computes the commitment via `transientCommit`/`persistentHash`, and — only if the comparison holds — writes a new `AttestationRecord` with `passed: true`. If the comparison does not hold, the circuit either writes `passed: false` or (safer default, avoids any on-chain trace of a failed attempt) simply does not submit — this decision is a v1 open question, see essentials doc.
- `circuit publishRule(ruleId, comparisonType, thresholdValue, description): []` — admin/verifier-only in the demo; writes to `rules`. No privacy requirement here since rule terms are meant to be public.
- `circuit verify(commitment: Bytes<32>, ruleId: Field): AttestationRecord` — pure read against `attestations`, callable by anyone (the whole point is public verifiability of the result without private data).

## Security and privacy boundaries (must hold, not aspirational)
1. `rawValue` must never appear in any circuit's exported return value or any ledger field without an explicit `disclose()` call — and no such call should exist in this build. If the compiler ever requires one to make the code build, that's a signal the circuit design leaked private data and needs to be restructured, not disclosed around.
2. Commitments must use salted hashing (`transientCommit` pattern), not a bare hash of the raw value — bare hashing of a guessable-range number (typical monthly revenue bands) is brute-forceable and is a real vulnerability, not a theoretical one.
3. `persistentHash` (SHA-256-based, upgrade-stable) is used for anything that must remain valid and consistent long-term (ledger-stored commitments); `transientHash` is reserved for short-lived in-circuit consistency checks only.
4. Ledger fields that should never change post-deployment (if any config constants end up on-chain) should be marked `sealed`.
5. Bounded execution is inherent to Compact's compiled-circuit model — no unbounded loops over private data in circuits; comparison logic here is trivially bounded (single scalar comparison) so this is low-risk for v1 but stated explicitly so it isn't forgotten if the rule engine is ever extended.

## Repository / build layout (Compact compiler conventions)
Following the standard Compact project output structure documented for Midnight contracts:
```
/contract
  threshold.compact        # source: ledger + circuits + witnesses
  /contract                # compiler-generated TypeScript API + JS impl the frontend imports
  /keys                    # proving/verification keys per circuit
  /zkir                    # intermediate circuit representations, used by the proof server
  /compiler                # JSON metadata: circuit/type info, versioning
/frontend
  /src
    prover/                # private-value entry, commitment + proof submission flow
    verifier/               # lookup-by-commitment read view
    lib/midnight-client.ts  # wallet + proof server + contract call wrappers
/docs
  PRD.md
  ARCHITECTURE.md
  ARCHITECTURE_ESSENTIALS.md
```

## Open technical risks
- Whether a failed (`passed: false`) attestation should be written on-chain at all, versus rejected client-side before submission, materially changes the privacy story (a failed on-chain record still leaks "this commitment exists and failed rule X at time Y," which is metadata leakage even without revealing the value). Default to **not submitting failing attempts** unless there's a specific product reason to record them.
- Exact current Compact syntax/stdlib function signatures should be re-verified against the live docs at build time — language version pragmas (`pragma language_version >= 0.22` seen in current examples) change between releases, and hackathon judges will notice a contract that doesn't compile against current tooling.
- Testnet faucet/wallet setup time is a real cost not reflected in the "trivial circuit logic" risk assessment — budget for it.

## Hard questions (self-critique)

### What would break
1. **Field-vs-ordered-comparison correctness.** `thresholdValue` and the private value are typed as `Field` throughout this doc. Field elements live in a finite field (arithmetic mod a large prime) and do not have a native, safe notion of `>=` the way integers do — a naive field-element comparison can be wrong or simply not soundly provable in-circuit without an explicit range/bit-decomposition check. This is not a style note, it's a likely source of a circuit that either fails to compile as written or, worse, compiles but proves something other than what's intended. `attest` needs its comparison implemented via a documented Compact comparison primitive or an explicit bounded `Uint<N>` type for the value and threshold, not bare `Field` subtraction-and-sign-check logic assumed implicitly here.
2. **No identity binding on `AttestationRecord`.** As modeled, `attestations` is keyed purely by `commitment`, with no link to a public prover identifier (wallet address, pubkey hash, anything). Anyone holding a passing commitment can present it as their own. This breaks the product's actual claim, not just an edge case — it needs a `proverPubKeyHash` field in the record, bound into the commitment computation itself (e.g. `persistentHash(rawValue, salt, proverPubKeyHash)`), or the whole "prove YOUR eligibility" story doesn't hold up under five minutes of adversarial questioning.
3. **`publishRule` has no access control specified.** The doc says "admin/verifier-only in the demo" but defines no `owner` ledger field, no check inside the circuit body. As written, any address can publish a permissive rule and self-attest against it. Needs a `sealed owner: Bytes<32>` field set at construction and an assert inside `publishRule` comparing caller identity against it, or this circuit does not do what the PRD claims it does.
4. **Proof server as a hard runtime dependency at demo time.** This is an operational break, not a code break, but it's the most probable actual failure: if the local proof server isn't running, isn't reachable, or wasn't restarted after a contract redeploy (stale proving keys), the entire live flow stalls. Worth a documented pre-demo checklist, not just an assumption it'll be running.

### Edge cases missing
1. **Same commitment reused against a different rule.** The map is keyed by `commitment` alone. A second `attest` call with the same commitment but a different `ruleId` overwrites the first record rather than creating a second one, silently destroying a prior valid attestation. The key should be a composite, e.g. `persistentHash(commitment, ruleId)`, not `commitment` alone.
2. **Rule mutation after attestations exist.** Nothing prevents `publishRule` from being called again with the same `ruleId` and a different `thresholdValue`, which would retroactively change the meaning of every existing `AttestationRecord` pointing at that `ruleId` without those records changing. Either `ruleId → rule terms` must be immutable once published (a `sealed`-style constraint, enforced by assert-if-exists in the circuit) or rules need versioning.
3. **Timestamp source ambiguity.** `issuedAt`/`expiresAt` are specified only as "block time or sequence number" — those are not interchangeable and expiry math built against one will be wrong if the actual runtime supplies the other. This needs to be pinned to whatever the Midnight ledger context actually exposes, verified against docs, not left as an "or."
4. **Retry-after-fail path.** If a comparison fails client-side and nothing is submitted (the documented default), what happens to the already-generated salt and commitment on a retry? Not specified. Reusing the same salt across a fail-then-retry is privacy-neutral but was never actually decided, and if the salt is instead regenerated every attempt, the "same underlying value maps to a stable commitment" property claimed elsewhere in this doc no longer holds.
5. **Rule existence check.** `attest(ruleId)` assumes `rules[ruleId]` exists. No documented behavior for a `ruleId` that was never published — likely a runtime abort, but that should be an explicit assert with a clear failure mode, not an implicit map-lookup failure.

### What is overengineered
1. **Two hash functions in the stack table (`persistentHash` and `transientHash`) when v1 has no actual use for `transientHash`.** Nothing in this design needs an ephemeral, upgrade-unstable in-circuit-only hash. Including it as a stack decision adds a distinction to get right (and get wrong) that the current scope doesn't call for. Cut it from v1; revisit only if a genuinely ephemeral check gets added later.
2. **General `comparisonType: Uint<8>` field when only `gte` is implemented.** Modeling this as a generic, extensible comparison-type enum is building for a v2 rule engine that the PRD explicitly says is out of scope. For v1, hardcode the comparison direction and drop the field — it removes a whole class of "what does comparisonType=3 even mean" bugs for zero product loss right now.
3. **Local attestation history as client state.** Listed as a data-model concern but it's pure UX polish reconstructable from the user's own memory of what they did. It doesn't need architecture-level design attention before the core prove/verify loop works end to end on testnet.
4. **The full rule-publishing circuit (`publishRule`) as dynamic, general infrastructure.** A hardcoded threshold baked into the contract at deploy time proves the identical selective-disclosure property with strictly less surface area — no access-control bug to introduce, no rule-mutation edge case, no owner field to get right under time pressure. Dynamic rule publishing is legitimate v2 scope, not something that needs to exist for the demo to prove the point.
