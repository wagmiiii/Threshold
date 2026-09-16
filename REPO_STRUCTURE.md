# Threshold — Repository Structure

Docs (`PRD.md`, `ARCHITECTURE.md`, `ARCHITECTURE_ESSENTIALS.md`, `ROADMAP.md`) sit at repo root rather than nested in `/docs`, because `AGENTS.md` and `CLAUDE.md` reference them by bare filename. If this ever changes, update those two files' references in the same change.

`contract/managed/` layout (the Compact compiler's generated output) is modeled on the Bulletin Board tutorial example and is unverified against current tooling — confirm the actual directory name/shape before wiring CI or `.gitignore` rules around it.

```
threshold/
├── .github/
│   └── workflows/
│       └── ci.yml                 # lint + contract compile + test on push
├── contract/
│   ├── src/
│   │   └── threshold.compact      # ledger + circuits + witnesses (source of truth)
│   ├── test/
│   │   └── threshold.test.ts      # pass / fail / nonexistent-rule / duplicate-rule cases
│   ├── managed/                   # compiler output — gitignored except compiler/ metadata JSON
│   │   ├── contract/              # generated TS API + JS impl, imported by frontend
│   │   ├── keys/                  # proving/verification keys
│   │   ├── zkir/                  # intermediate circuit representations
│   │   └── compiler/              # circuit/type metadata, versioning
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── prover/                # private-value entry, commitment + proof submission
│   │   ├── verifier/              # lookup-by-commitment read view
│   │   ├── lib/
│   │   │   └── midnight-client.ts # wallet + proof server + contract call wrappers
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── AGENTS.md
├── CLAUDE.md
├── PRD.md
├── ARCHITECTURE.md
├── ARCHITECTURE_ESSENTIALS.md
├── ROADMAP.md
├── README.md
├── LICENSE
├── .env.example                   # no real secrets, ever
└── .gitignore                     # must exclude managed/keys, .env, wallet seed files
```
