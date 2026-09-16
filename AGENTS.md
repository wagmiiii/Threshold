# AGENTS.md — instructions for coding agents working in this repo

This file governs how any coding agent (Claude Code, or otherwise) operates in the Threshold project. `CLAUDE.md` mirrors this file for Claude Code specifically and should never contradict it.

## Read this first, in this order
1. `ARCHITECTURE_ESSENTIALS.md` — the condensed, load-bearing decisions. Read this before touching any code.
2. `ROADMAP.md` — current status, what's done, what's next, what's explicitly deferred.
3. `PRD.md` and `ARCHITECTURE.md` — full detail, read on demand when the essentials file isn't enough, not by default on every task.

Do not start implementation work without reading ARCHITECTURE_ESSENTIALS.md and the current ROADMAP.md status. Do not rely on this repo's own prose for exact Compact syntax — verify against live Midnight docs at build time, since language version and stdlib signatures shift between releases. If this repo's docs conflict with what the current Midnight docs say, the live docs win, and the repo's docs should be corrected.

## The one rule that overrides convenience: update ROADMAP.md every time
**Every contribution that changes contract code, frontend code, or documentation must update `ROADMAP.md` in the same contribution.** Move the relevant item(s) between Not started / In progress / Done, add any newly discovered work items, and add a dated line to the Change log section at the bottom. A change that isn't reflected in ROADMAP.md is incomplete, regardless of whether the code itself is correct. This applies to agents and humans equally. Do not defer this to a follow-up commit.

## Non-negotiable structural rules (Midnight-specific)
- Three execution contexts, never blur them: **public ledger** (on-chain, visible to everyone), **circuits** (proof-verified, compiled from Compact), **witnesses** (local-only, cannot write ledger state directly).
- The prover's private value must never reach the ledger. `disclose()` is the correct, intended mechanism for legitimately public data crossing into ledger state (like rule terms, admin actions, or commitments/hashes), but it must NEVER be used to leak the prover's private attribute.
- Commitments to private values must be salted (`transientCommit`-style value+salt pattern). Never hash a raw private value without a salt.
- Use `persistentHash` for anything stored in ledger state or used for authentication. Do not introduce `transientHash` usage unless there's a specific, stated ephemeral-check need — v1 scope has none.
- Any ledger field that should be immutable post-construction should be marked `sealed`, not left implicitly constant.

## Scope discipline
This project deliberately ships a narrow slice. Before adding anything not already in `ROADMAP.md`'s active phases, check the "Explicitly deferred" list in `ROADMAP.md`. If a task looks like it belongs there, do not implement it — flag it to the user and update `PRD.md` first if the scope genuinely needs to change. Do not silently expand scope (a general rule engine, multi-attribute proofs, a revocation registry, etc.) because it seemed like a natural extension while implementing something else.

## Known open decisions — do not resolve unilaterally
These are flagged as unresolved in `ARCHITECTURE.md` and `ARCHITECTURE_ESSENTIALS.md`. Surface them to the user rather than picking an answer silently:
- Exact Compact primitive/type for a sound `>=` comparison (raw `Field` comparison is not automatically safe/sound — confirm against current docs).
- Salt regeneration behavior on retry-after-fail.

## Testing expectations
Any change to `attest`, `publishRule`, or `verify` circuit logic requires: a passing-case test, a failing-case test (confirming it correctly rejects, not just that it runs), and a boundary/misuse test (nonexistent rule ID, duplicate rule publish, wrong caller on an owner-gated circuit). Do not mark a circuit task done in `ROADMAP.md` without these.

## Commit hygiene
- Keep contract changes and frontend changes in separate commits where practical.
- Never commit real private keys, wallet seed phrases, or `.env` files with live credentials.
- Reference the relevant ROADMAP.md item in the commit message where one exists.

## What not to do
- Do not fabricate Compact syntax from memory or from this repo's own docs when writing contract code — verify against current Midnight docs.
- Do not deploy to mainnet. Testnet (Preview/Preprod) only, per PRD.md.
- Do not add features from the "Explicitly deferred" list without the user updating PRD.md first.
- Do not remove or weaken the ROADMAP.md update rule in this file, in CLAUDE.md, or in any future instruction file added to this repo.
