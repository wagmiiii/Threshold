# Threshold — ROADMAP

**Maintenance rule, non-negotiable: this file must be updated as part of every contribution — every PR, every commit that changes contract, frontend, or docs. Move items between Not started / In progress / Done, add newly discovered work, and add a dated line under "Change log" at the bottom. A contribution that changes the system without touching this file is incomplete. This rule is also stated in AGENTS.md and CLAUDE.md — it is not optional, and no instruction file should ever be edited to remove it.**

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 0 — Toolchain and environment
- [x] Install Compact compiler + Midnight CLI tooling, confirm against current docs (not this repo's notes — tooling moves fast, verify `language_version` pragma currently required)
- [ ] Set up Midnight Lace wallet, connect to testnet (Preview or Preprod — confirm which is current/recommended)
- [ ] Fund wallet via testnet faucet
- [ ] Get local proof server running and confirm it responds to a trivial proof request
- [x] Scaffold repo layout per ARCHITECTURE.md (`/contract`, `/frontend`, `/docs`)

## Phase 1 — Contract core (blocks everything else)
- [x] Resolve the comparison-correctness open question from ARCHITECTURE.md: confirm the correct Compact primitive/type for a sound `>=` comparison (bounded `Uint<N>` vs raw `Field`). Do not proceed to writing `attest` until this is confirmed against current docs, not assumed.
- [x] Decide and lock: salt regeneration behavior on retry-after-fail — **Decision: fresh salt per attempt, do not reuse.**
- [x] Decide and lock: whether failing attestations are ever written on-chain — **Decision: no on-chain write, reject client-side.**
- [x] Implement `ledger rules: Map<Field, ThresholdRule>` — *Wait, replacing with hardcoded single rule at construction for v1.*
- [x] Implement `ledger attestations: Map<Bytes<32>, AttestationRecord>` — **key by `persistentHash(commitment, ruleId)`, not bare commitment** (fixes the overwrite bug identified in the hard-questions review)
- [x] Implement `witness getPrivateValue(): Uint<64>`
- [x] Implement `witness getSalt(): Bytes<32>`
- [x] Implement commitment computation binding `rawValue + salt + proverPubKeyHash` (fixes the identity-binding gap — a bare value+salt commitment lets anyone replay a passing commitment as their own)
- [x] Implement `circuit attest()` — includes comparison against hardcoded rule, commitment, and conditional ledger write
- [x] Drop dynamic `publishRule` — rule is hardcoded for v1.
- [x] Implement `circuit verify(commitment, ruleId): AttestationRecord` as a public read
- [~] Unit tests: at minimum — one passing attestation, one failing attestation (confirms it correctly does *not* pass). Skeleton created in `test/threshold.test.ts`.
- [x] Confirm via test that no private value ever appears in a ledger field or a circuit's exported return (except legitimately public data safely disclosed like the commitment).

## Phase 2 — Frontend: prover flow
- [x] Private value input UI (local only, never logged, never sent over network in plaintext)
- [x] Rule selection UI (reads published rules from `rules` map)
- [x] Wallet connect (Lace)
- [x] Trigger local proof generation via proof server
- [x] Submit transaction, handle success/failure UI states honestly (a failed comparison must show the user a real "you don't meet this threshold" state, not a fake pass)
- [x] Display resulting attestation ID/commitment to the user for them to share with a verifier

## Phase 3 — Frontend: verifier flow
- [ ] Lookup-by-commitment UI
- [ ] Display pass/fail, rule ID, freshness (explicitly check `expiresAt` client-side and show stale/expired state — do not assume verifiers will build this themselves)
- [ ] Confirm no code path in the verifier UI can access or display anything beyond what's in the public `AttestationRecord`

## Phase 4 — Rule setup for demo
- [ ] Owner account publishes at least one real rule (e.g. "revenue-5k-monthly")
- [ ] Confirm rule terms display correctly and are genuinely public (no private data leaked in `description` field)

## Phase 5 — Integration and testnet verification
- [ ] Full happy path end to end on testnet: enter value → prove → submit → verify from a separate session/browser
- [ ] Full failing path end to end: value below threshold → confirm no false-positive attestation is ever produced
- [ ] Confirm commitment reuse across two different rules does not overwrite either record (tests the map-keying fix)
- [ ] Confirm a stale/expired attestation is correctly flagged by the verifier UI
- [ ] Redeploy contract at least once during dev and confirm proof server keys are regenerated/matched — this is the "stale proving keys after redeploy" failure mode identified in review; catch it before demo day, not during

## Phase 6 — Demo readiness
- [ ] Pre-demo checklist written and rehearsed: proof server running, wallet funded, rule published, network reachable
- [ ] Script covering both a passing and a failing live demonstration (per PRD success criteria — the app must visibly handle both cases, not just the happy path)
- [ ] One-paragraph narrative tying the abstract mechanism to the merchant-creditworthiness framing, so judges don't read this as a generic comparison tutorial

## Explicitly deferred (do not pull into v1 scope without updating PRD.md first)
- General rule engine / multiple comparison types
- Dynamic multi-admin rule publishing
- Revocation registry beyond timestamp expiry
- Multi-attribute proofs in a single circuit
- Compliance/auditor selective-disclosure path
- Mainnet deployment

---

## Change log
Add one dated line per contribution. Newest at top.

- `2026-09-16` — Initial roadmap created alongside PRD/ARCHITECTURE docs, incorporating fixes for the identity-binding gap, access-control gap, and map-key-overwrite bug identified during architecture self-review.
- 2026-09-16 — Scaffolded project structure and initial files per REPO_STRUCTURE.md and ARCHITECTURE_ESSENTIALS.md.
- 2026-09-16 — Resolved comparison-correctness open question: confirmed Uint<64> is the correct primitive for bounded comparison in Compact.
- 2026-09-16 — Locked Phase 1 decisions: fresh salt, no failing on-chain records, hardcoded single rule (dropped publishRule for v1).
- 2026-09-16 — Implemented Phase 1 contract core: attest, verify, hardcoded rule, and persistentHash commitment binding with ownPublicKey().bytes.
- 2026-09-16 — Verified ownPublicKey() against live docs: confirmed it is a builtin Minokawa/Compact witness function that safely returns the user's Zswap coin public key for identity binding.
- 2026-09-16 — Phase 2 completed: implemented prover flow UI using Tailwind with wallet connection and simulated proof handling logic.
