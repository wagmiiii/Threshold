# Threshold — PRD

## What this is
Threshold is a private eligibility attestation app built on Midnight. A user proves they satisfy a numeric or categorical rule (a threshold, a membership check, a compliance condition) to a verifying party, without revealing the underlying private value. The chain records only a pass/fail result, a commitment to the hidden value, and metadata — never the value itself.

Concrete instance we are building for the hackathon: **merchant creditworthiness attestation**. A merchant proves "my trailing-90-day revenue is at or above $X" (or transaction count, or account age) to a counterparty — a lender, a marketplace, a payment processor — without disclosing actual revenue figures.

This is chosen deliberately over a private-transfer/DeFi app because it is the narrowest correct slice of Midnight's actual value proposition (selective disclosure), not because it is the most technically ambitious thing we could build. Scope discipline is the point.

## Who it's for
- **Provers (merchants/individuals)**: hold a private numeric attribute and want to prove eligibility without exposing the raw number to a counterparty or to the public chain.
- **Verifiers (counterparties)**: a lender, marketplace, or onboarding system that needs a yes/no eligibility signal it can trust cryptographically, without taking on custody of or liability for the prover's raw financial data.
- Not building for: auditors or regulators with legal subpoena power over raw data — that is a v2 compliance-disclosure feature, out of scope for this build.

## Problem
Existing "prove your revenue" flows require the merchant to hand raw statements or API access to the counterparty. This creates data liability for the counterparty (breach risk, storage obligations) and forces the merchant to over-disclose (a lender asking "do you make >$10k/mo" ends up seeing exact figures, plus history, plus whatever else is in the statement). Neither party wants this. Midnight's selective disclosure model is a direct structural fix: the merchant computes locally, proves a specific claim, and only the proof plus a pass/fail bit ever leave their machine.

## Core user flows

### Flow 1 — Issue a claim (Prover)
1. Merchant enters their private value (e.g. revenue figure) into the local app. This never leaves the device unencrypted.
2. Merchant selects a threshold rule to prove against (e.g. "revenue >= $5,000/mo", picked from rules a verifier has published on-chain).
3. App generates a random salt, computes a commitment to the private value, and runs the comparison circuit locally.
4. Midnight runtime produces a zero-knowledge proof that the committed value satisfies the rule, without revealing the value.
5. Proof + commitment + rule ID are submitted as a transaction. On success, an `AttestationRecord` is written to public ledger state: pass/fail boolean, commitment hash, rule ID, issued timestamp, expiry timestamp.

### Flow 2 — Verify a claim (Verifier)
1. Verifier is given the merchant's commitment hash (or attestation ID) out of band, or looks it up by the merchant's public identifier.
2. Verifier queries the public ledger for the `AttestationRecord`.
3. Verifier reads: did this commitment pass this specific threshold rule, and is it still within its validity window. That is the entire information surface — no raw value, ever.

### Flow 3 — Publish a threshold rule (Rule owner / verifier)
1. A verifier (or Threshold itself, for the demo) publishes a rule on-chain: rule ID, comparison type (gte/lte/eq), threshold value, description.
2. Rule values themselves are public (the bar you must clear is public — that is normal and expected; it is the prover's actual value that stays private).

### Flow 4 — Expiry / re-attestation
1. Attestations carry an `expiresAt`. Past expiry, verifiers must treat the record as stale.
2. Re-proving is just Flow 1 again with a fresh timestamp. No revocation registry in v1 — expiry-based staleness is the entire freshness mechanism, deliberately simple.

## What the product must actually do (functional requirements)
1. Accept a private numeric input locally, never transmit it in plaintext, never log it.
2. Support at least one published threshold rule end to end (gte comparison is sufficient for the demo; do not build a general rule engine).
3. Generate a commitment (hash + salt) to the private value so the same underlying value can be consistently referenced across multiple attestations without being revealed.
4. Compile and run a Compact circuit that proves `privateValue >= threshold` given the committed value, and rejects mismatched or invalid inputs.
5. Submit the proof as a Midnight transaction and write the resulting pass/fail record to public ledger state.
6. Provide a verifier-facing read view: given a commitment/attestation ID, show pass/fail, rule ID, and freshness — nothing else.
7. Provide a prover-facing view: local history of what they've attested to, and to which rule IDs (their own private state; not derived from chain reads of other users).
8. Handle the "fail" case honestly: if the private value does not satisfy the rule, the app must not submit a passing proof — it should tell the user locally that they don't meet the threshold, without writing anything false on-chain, and without needing to reveal why to anyone.

## What is explicitly out of scope for this build
- General-purpose rule engine (arbitrary boolean expressions). One comparison type is enough to prove the concept.
- Regulatory/compliance disclosure paths (selective reveal-to-auditor flows). Documented as a real Midnight capability, not built here.
- Revocation registry beyond timestamp expiry.
- Multi-attribute proofs (e.g. proving revenue AND account age in one circuit). Single-attribute only for v1.
- Custody, payments, or any actual lending logic. Threshold produces an eligibility signal; what a verifier does with it is their problem.
- Mainnet deployment. Testnet (Preview/Preprod) only for the hackathon.

## Success criteria for the submission
- A prover can enter a private value, get a real proof generated and verified on Midnight testnet, and see a resulting on-chain attestation record.
- A verifier can look up that attestation and see pass/fail plus metadata, and can independently confirm they cannot recover the underlying value from anything on-chain.
- The demo can show both a passing and a failing case, proving the app doesn't just always say yes.
- The chosen domain framing (merchant creditworthiness) is stated clearly enough that judges don't read this as a generic "compare two numbers" tutorial app.

## Known risks
- Compact and the Midnight SDK are new to the team; there is real risk of losing time to toolchain friction rather than product logic. Budget for this explicitly rather than assuming a smooth build.
- The demo's credibility rests on showing on-chain proof, not just UI. A version that fakes the chain interaction defeats the entire point of building on Midnight and should be treated as a failed build, not a fallback.

## Hard questions (self-critique)

### What would break
- The product story assumes a verifier can trust "this commitment passed rule X." It cannot, as specified: nothing binds a commitment to a specific prover's identity. Anyone who learns a passing commitment hash (leaked, overheard, guessed if salt is weak) can present it as their own to a verifier. This isn't a demo nitpick, it invalidates the core claim ("prove YOUR eligibility") if left unfixed.
- The demo depends on a locally-running proof server at presentation time. If that process isn't up, or the machine used for the live demo differs from the dev machine, the whole flow stalls in front of judges. This is an operational failure mode, not a code bug, and it's the single most likely thing to actually go wrong on stage.
- "Admin-only" rule publishing is stated as a requirement with no enforcement mechanism defined anywhere. As written, any prover could call `publishRule` and plant a fake, trivially-passable rule, then attest against it. If that's demoed live, an adversarial judge asking "what stops me from publishing my own rule" has no good answer yet.

### Edge cases missing
- Re-attesting to a *different* rule using the *same* commitment. The data model keys `attestations` by commitment alone, not by (commitment, ruleId). A second attestation against a different rule silently overwrites the first. Not called out anywhere until now.
- A rule's terms changing after attestations already exist against it. There's no rule versioning; `thresholdValue` could be edited post-hoc by whoever controls `publishRule`, silently invalidating or retroactively "passing" old attestations depending on how `attest` reads state.
- What "expired" actually means operationally: nothing in the product spec says whether a verifier's UI actively checks `expiresAt` or whether that's left to the verifier's own code. If it's the latter, a lazy verifier integration will treat expired attestations as valid, and the product has no way to stop that.
- The failing case (Flow 1, step 5, the "don't submit if it fails" path): the spec says the user is told locally, but doesn't say what happens to the salt/commitment they already generated. If they retry, do they get a fresh commitment or reuse the old one? Reusing it after a locally-known failure is fine privacy-wise but was never actually decided.

### What is overengineered
- Flow 4 (expiry / re-attestation) and the local attestation history in Flow 2/3 are UX polish, not core to proving the concept works. For a hackathon submission, showing one pass and one fail on testnet is the actual bar; a full re-attestation lifecycle is scope that can slip the deadline for a feature judges won't specifically probe.
- Publishing rules as a general on-chain object (Flow 3) is more infrastructure than a single-demo needs. A hardcoded rule baked into the contract at deploy time would prove the identical privacy property with less surface area to get wrong under time pressure. The generality (multiple rules, published dynamically) is a v2 concern being built as if it were v1-critical.
