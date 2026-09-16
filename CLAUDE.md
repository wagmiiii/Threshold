# CLAUDE.md — instructions for Claude Code in this repo

This file is Claude Code's entry point for the Threshold project. It does not duplicate `AGENTS.md` — it points to it and adds Claude-specific notes. If anything here ever conflicts with `AGENTS.md`, `AGENTS.md` is the source of truth and this file is wrong and should be fixed.

## Start here
Read, in order: `ARCHITECTURE_ESSENTIALS.md`, then `ROADMAP.md`, then `AGENTS.md` in full. `AGENTS.md` contains the complete working rules (structural Midnight rules, scope discipline, testing expectations, commit hygiene). Everything in it applies to you exactly as written.

## The rule that matters most
**Update `ROADMAP.md` as part of every contribution you make** — code, contract, or docs. Move items between Not started / In progress / Done, add newly discovered work, add a dated Change log entry. Do this in the same turn/commit as the change itself, not as a follow-up. If you finish a task and realize you didn't touch ROADMAP.md, go back and do it before considering the task done.

## Claude-specific working notes
- When asked to implement a Compact circuit or contract change, check `ARCHITECTURE.md`'s "Hard questions" and "Open technical risks" sections first — several load-bearing decisions (identity binding, map keying, comparison-type correctness) were identified as gaps in the original design and are tracked as fixes in `ROADMAP.md` Phase 1. Don't reintroduce a gap that's already been identified and scheduled to be fixed.
- When you don't have verified, current Compact syntax for something (a stdlib function signature, a pragma version, a type), say so explicitly rather than generating plausible-looking Compact code from general TypeScript intuition. Compact is TypeScript-like but is not TypeScript, and confident-looking wrong syntax is worse than a flagged gap.
- Don't expand scope past what `ROADMAP.md`'s active phase covers, even if a nearby improvement is obvious mid-task. Note it as a new line item in ROADMAP.md instead of building it.
- If a task requires resolving one of the "Known open decisions" listed in `AGENTS.md` (comparison primitive choice, salt regeneration behavior), stop and ask rather than picking silently — these affect correctness and privacy guarantees, not just style.
