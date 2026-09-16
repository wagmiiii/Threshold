# Threshold

Private eligibility attestations on [Midnight](https://docs.midnight.network/). Prove you clear a threshold — revenue, transaction count, any numeric or categorical rule — without revealing the underlying value.

Built for the [Midnight Buildathon on AKINDO](https://app.akindo.io/wave-hacks/jaMZjqPOBsLXvjdG).

**Status: hackathon build, testnet only, not audited. Do not use with real financial data or in production.**

## What this is

A merchant proves "my revenue clears $X/month" to a lender, marketplace, or onboarding system — and the counterparty gets a cryptographically verifiable pass/fail, never the actual number. The chain records a commitment, a rule ID, a pass/fail bit, and timestamps. It never sees the raw value.

This is a deliberately narrow slice of what Midnight's selective disclosure model can do, not a general privacy-DeFi platform. See `PRD.md` for the full reasoning behind that scope choice.

## How it works

1. **Prove**: enter a private value locally → app generates a salted commitment and a zero-knowledge proof that the value clears a published rule → proof + commitment + pass/fail get submitted on-chain. The raw value never leaves the device.
2. **Verify**: anyone with the resulting commitment can look up the on-chain record and see pass/fail, which rule, and whether it's still fresh — nothing else.

Full flow detail in `PRD.md`. Technical design, data model, and the privacy boundaries that must hold in `ARCHITECTURE.md` (condensed version for quick reference: `ARCHITECTURE_ESSENTIALS.md`).

## Repo structure

```
contract/     Compact source (ledger, circuits, witnesses) + generated compiler output + tests
frontend/     React/TS app — prover flow and verifier flow
AGENTS.md     Instructions for coding agents working in this repo
CLAUDE.md     Claude Code entry point (mirrors AGENTS.md)
PRD.md / ARCHITECTURE.md / ARCHITECTURE_ESSENTIALS.md / ROADMAP.md
```

## Tech stack

- **Contract**: [Compact](https://docs.midnight.network/compact) — Midnight's TypeScript-like DSL, compiles to ZK circuits
- **Frontend**: React + TypeScript, consumes the Compact compiler's generated TS bindings
- **Wallet**: Midnight Lace connector
- **Proof generation**: local proof server (real inputs never leave the client)
- **Network**: Midnight testnet (Preview/Preprod) — no mainnet deployment

## Getting started

Prerequisites, exact versions, and setup steps are tracked in `ROADMAP.md` Phase 0 as they get pinned down — this section will fill in as that phase completes rather than guessing versions here that may already be stale by the time you read this.

```bash
# contract
cd contract && npm install && npm run compile && npm test

# frontend
cd frontend && npm install && npm run dev
```

You'll need a Midnight Lace wallet funded via testnet faucet, and the local proof server running, before the prover flow will work end to end.

## Project status

This project ships in phases; current status, what's done, what's in progress, and what's explicitly deferred past this build all live in `ROADMAP.md`. That file is the single source of truth for "where are we" — check it before assuming a feature exists or is missing.

## Contributing

**Every contribution — contract, frontend, or docs — must update `ROADMAP.md` in the same change.** Move the relevant item to its new status and add a dated Change log line. This applies whether the contribution comes from a human or a coding agent; see `AGENTS.md` for the full rule and the rest of the working conventions for this repo.

Known open technical decisions that should not be resolved silently by a contribution — see `AGENTS.md` for the current list (comparison primitive choice, salt regeneration behavior) — flag these for discussion rather than picking an answer inside a PR.

## Security notes

- No private value (revenue figure, salt, etc.) should ever appear in a ledger field or a circuit's exported return value. If code requires a `disclose()` call to compile, that's a sign the circuit is designed wrong — see `ARCHITECTURE.md`.
- Commitments are salted; a bare hash of a private value is not used anywhere in this design.
- This has not been audited. Treat it as a demonstration of the mechanism, not a production eligibility system.

## License

See `LICENSE`.
