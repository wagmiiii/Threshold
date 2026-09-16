# Threshold — Architecture Essentials
(Outline only. Full reasoning lives in ARCHITECTURE.md. This file is for quick reference during implementation.)

## Product in one line
Prover proves `privateValue >= threshold` to a verifier via Midnight ZK proof. Chain sees: pass/fail, commitment, rule ID, timestamps. Chain never sees: the private value.

## Non-negotiable structural rules
- Three execution contexts, never blur them: **public ledger** (on-chain, visible), **circuits** (proof-verified, compiled from Compact), **witnesses** (local-only, cannot write ledger directly).
- The prover's private value NEVER appears in a circuit's exported return value or a ledger field. `disclose()` is the correct, intended mechanism for legitimately public data crossing into ledger state (like rule terms or commitments), but it must NEVER be used to leak the prover's raw private attribute.
- Witnesses return values into circuits; only circuits touch `ledger` fields.

## Stack (do not substitute without reason)
- Contract: Compact → compiles to ZK circuits + zkir + proving/verification keys (generated, don't hand-edit).
- Frontend: React + TS, consumes generated `contract/index.d.ts` bindings.
- Wallet: Midnight Lace connector.
- Proof gen: local proof server, client-side, real private inputs never leave the client.
- Network: Midnight testnet (Preview/Preprod) only. No mainnet.

## Hashing/commitment rules (correctness-critical)
- `persistentHash<T>` → anything durable/on-chain/auth-related (SHA-256, upgrade-stable).
- `transientHash<T>` → ephemeral in-circuit checks only, not for stored state.
- Commitments to the private value MUST be salted (`transientCommit(value, rand)` pattern). A bare hash of revenue-range numbers is brute-forceable. Salt is generated once, stored locally by the prover.

## Data model (minimal)
```
ledger rules: Map<Field, ThresholdRule>         # ruleId, comparisonType, thresholdValue, description — PUBLIC by design
ledger attestations: Map<Bytes<32>, AttestationRecord>  # keyed by commitment, not by identity
  AttestationRecord: passed: Boolean, ruleId, issuedAt, expiresAt

witness getPrivateValue(): Field   # local only
witness getSalt(): Field           # local only

circuit attest(ruleId): []          # pulls witnesses, compares, writes AttestationRecord if pass
circuit publishRule(...): []        # admin-only, writes rules (public terms, no privacy need)
circuit verify(commitment, ruleId): AttestationRecord   # public read
```

## v1 scope lock
- ONE comparison type: `>=`. No general rule engine.
- ONE attribute per attestation. No multi-attribute circuits.
- Expiry timestamp is the only freshness mechanism. No revocation registry.
- Default: do NOT write failing attestations on-chain (avoids metadata leakage of "this commitment tried and failed"). Reject client-side before submission unless a specific reason emerges to change this.
- No compliance/auditor disclosure flow. No custody or lending logic. Testnet only.

## Known unresolved decision
Whether failed attempts get an on-chain record at all — default is no (see above). Revisit only with explicit reasoning, not by default drift during implementation.

## Build-time reminder
Compact syntax/pragma versions (e.g. `language_version`) shift between releases — verify against current docs before writing the contract, don't rely on this doc's syntax fragments as gospel.

## Hard questions (self-critique) — condensed

**Would break:**
- `Field` used for the value/threshold comparison has no native ordering — implement `>=` with a real bounded comparison primitive or `Uint<N>`, not bare `Field` math. Verify against current Compact docs before writing this circuit.
- No identity binding on attestations → anyone holding a passing commitment can claim it. Fix: bind `proverPubKeyHash` into the commitment itself.
- `publishRule` has no access control modeled anywhere → add `sealed owner` + assert on caller.
- Live demo hard-depends on local proof server being up and current (stale keys after redeploy = silent failure). Pre-demo checklist, not an assumption.

**Missing edge cases:**
- Map keyed by `commitment` alone lets a second `attest` call (different `ruleId`, same commitment) silently overwrite a prior record. Key by `persistentHash(commitment, ruleId)` instead.
- Nothing stops `publishRule` from mutating an existing `ruleId`'s terms after attestations exist against it — needs immutability-once-set or versioning.
- `issuedAt`/`expiresAt` source ("block time or sequence number") is unpinned — pick one, verify against runtime.
- Retry-after-fail: salt reuse vs regeneration on retry was never decided; affects whether commitments stay stable per value.
- No existence check specified for `attest(ruleId)` against an unpublished rule.

**Overengineered for v1:**
- `transientHash` in the stack — nothing in this design needs it, drop it.
- Generic `comparisonType` field — only `gte` exists, hardcode it, drop the field.
- Local attestation history — pure UX polish, not core-loop-critical.
- Dynamic `publishRule` as general infra — a hardcoded threshold at deploy time proves the same privacy property with far less surface area to break under time pressure. Treat dynamic rules as v2.
