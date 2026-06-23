# HackathonHunter Pipeline Plan: Stellar Hacks ZK

## First Prompt Contract

- User prompt: `https://dorahacks.io/hackathon/stellar-hacks-zk/detail  完全按照 C:/Users/Ricky/Documents/Project/hackathonhunter-skill 所有流程做成一个能拿大奖的项目`
- Mode: full G0-G7
- Reasons:
  - Explicit all-flow request
  - Explicit prize-grade request
  - Contest URL provided
  - Empty workspace
  - Web3/ZK/proof-heavy contest
- Primary language for explanations: Chinese
- Code, identifiers, commands, and UI copy: English unless a gate artifact requires Chinese mirror text
- Product code blocked until G2 PRD and UIUX spec responses are saved and distilled

## Gate Tracker

| Gate | Status | Evidence | Verification |
| --- | --- | --- | --- |
| G0 Prize thesis | completed | `.hunter/track-calibration.json`, `pitch/winner_slot.md`, `pitch/killer_artifact.md` | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase prize-thesis,winner-slot` |
| G1 Concept lock | completed | `pitch/concept_lock.md`, `pitch/demo_interaction_plan.md`, `pitch/user_cases.md`, `pitch/idea_tournament.md`, J1-J3 responses | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_idea_tournament.mjs .`; `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_hero.mjs . --phase prebuild` |
| G2 Six-month PRD | in_progress | `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, `stack.lock.json`, GPT Pro PRD/UIUX spec responses | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase prd,product-slice,delivery-mode` |
| G3 Visual contract | pending | `pitch/visual-build-contract.md`, screenshots/mockup manifest, `.hunter/external-skill-usage.json` | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase ui-libs,external-skills,design-quality,clarity,motion` |
| G4 Real loop | pending | product code, runtime report, claim matrix, operations check | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase product-slice,feature-density,claims,runtime,realness` |
| G5 Public smoke | pending | public/local URL, runtime report, QA screenshots | browser smoke + Playwright smoke |
| G6 Package | pending | `README.md`, public-copy facts, submission assets if required | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase ship-real,readme,human-copy,external-skills,claims` |
| G7 Submit | pending | `SUBMISSION.md`, red-team notes | `node C:/Users/Ricky/Documents/Project/hackathonhunter-skill/scripts/audit_project.mjs . --phase ship-real,submission,judge-red-team` |

## Reference Read Log

- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/SKILL.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/00-orchestration.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`

## Current Gate

G2 Six-month PRD.

## Open Risks

- DoraHacks direct page currently shows AWS WAF human verification from CLI requests.
- Public deployment credentials and Stellar testnet wallet credentials have not been verified yet.
- G2 must validate exact ZK proof stack and Stellar wallet/transaction path before coding.
