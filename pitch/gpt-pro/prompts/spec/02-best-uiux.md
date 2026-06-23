# GPT Pro G2 Spec: Best UIUX For GrantDrop

Use this as the HackathonHunter UIUX cycle only. Do not generate code. Do not rewrite the PRD. Do not change the selected concept. Do not create a build plan.

## Uploaded reference files

- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/04-experience-quality.md`
- `pitch/gpt-pro/responses/spec/01-best-prd-response.md`
- `pitch/concept_lock.md`
- `pitch/demo_interaction_plan.md`
- `pitch/user_cases.md`
- `pitch/hero.md`

## Source Prompt

You are turning the selected product PRD into a detailed UIUX interaction plan, compressed into hackathon execution. Do not generate code. Do not rewrite the PRD or change the selected concept. The output is interaction design only: screens, states, proof, recovery, demo choreography, and implementation-facing UI notes.

Use the uploaded PRD response and references as binding rules. If the PRD is missing or incomplete, stop instead of inventing a replacement.

UIUX Preconditions:
- First output a `UIUX Preconditions` block before any UIUX content.
- Required inputs: selected idea/concept lock, saved PRD GPT Pro response, team constraints, implementation constraints, and any visual/design constraints.
- If `pitch/gpt-pro/responses/spec/01-best-prd-response.md` or equivalent PRD response content is missing, output `missing G2 prerequisites; do not write UIUX` followed by the missing artifact list, then stop.
- This prompt cannot generate PRD sections, code, patch files, project scaffolds, or decide that implementation should begin. It only writes the UIUX interaction plan.

## Inputs

- Selected idea / concept_lock: `pitch/concept_lock.md`, selected concept GrantDrop.
- PRD GPT Pro response: `pitch/gpt-pro/responses/spec/01-best-prd-response.md`.
- project_prd draft, if already distilled: none yet; local distillation happens after this UIUX response.
- Web3 wallet path status, if applicable: P0 claim path requires wallet connect or client-side Stellar signer, proof generation/submission, transaction/signature pending state, confirmed Stellar-visible receipt, and public inspection. Read-only receipt replay can be no-wallet.
- team/deadline constraints: single local builder, deadline 2026-06-29 PST, must preserve time for implementation, browser QA, screenshots, README, demo video, and DoraHacks submission.
- implementation constraints: no app scaffold yet; PRD chose Circom + Groth16 + snarkjs for eligibility/nullifier proof and Stellar testnet Soroban transaction/contract state for claim result. UIUX must not depend on unbuilt multi-campaign admin, production KYC, custody, mainnet, or real fiat rails.
- visual/design constraints: first screen is the product itself, not a landing page. Use one dominant verb-labeled CTA. Result artifact must be a high-contrast GrantDrop receipt. Keep proof and Stellar inspection secondary until after the receipt. Avoid verifier dashboards, admin tables, generic shadcn card grids, purple/blue AI gradients, KYC/compliance visual language, and marketing hero pages.

## Required Output

Produce only:

1. Detailed UIUX Interaction Plan:
- Screen map with route, screen, primary user action, system response, state changed, proof shown.
- First-run flow for 0-10s, 10-30s, 30-60s, 2-3min, 5min/Q&A.
- For every P0 screen: default, loading, empty, error, success, keyboard/touch behavior, accessibility note, state transition, result/shareable artifact, test selectors.
- Six-Month Product Interaction Contract: month-1/month-6 return user, recurring trigger, owned object/workspace, primary success path, roles/permissions, persistence/history, failure/recovery, reliability/support behavior, privacy/abuse/cost guardrails visible in UI, mobile public first-run, desktop return-user path, and settings/account/limits surface or explicit reason it is not needed.
- Demo choreography: judge input, live consequence, result/shareable artifact, recovery behavior, big-screen staging, mobile QR behavior.
- Web3/ZK/chain interaction contract: wallet connect, account visible, sign/approve state, transaction/proof pending state, confirmed result, failed/rejected transaction recovery, and public inspection path. If no wallet is used, name the verifier-only/read-only/server-issued exception and design the proof surface around it.
- Implementation notes: components, data/API dependencies, storage/state dependencies, external integrations, Playwright coverage.

2. Traceability:
- Map each P0 interaction to the PRD requirement it serves.
- Flag any interaction that lacks state, proof, recovery, or test evidence.

Block coding if any P0 interaction lacks state, proof, recovery, or test evidence; for Web3, also block if wallet connect/sign/transaction/proof or a valid no-wallet exception is missing. Implementation may start only after this separate UIUX response is saved and the local agent distills PRD/UIUX outputs into `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, and/or `BUILD.md` as required by the selected full path.
