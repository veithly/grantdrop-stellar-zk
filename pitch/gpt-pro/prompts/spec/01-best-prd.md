# GPT Pro G2 Spec: Best PRD For GrantDrop

Use this as the HackathonHunter PRD cycle only. Do not generate code. Do not write the UIUX interaction plan. Do not create a build plan.

## Uploaded reference files

- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`
- `pitch/bounty_brief.md`
- `pitch/winner_slot.md`
- `pitch/concept_lock.md`
- `pitch/demo_interaction_plan.md`
- `pitch/user_cases.md`
- `pitch/idea_tournament.md`
- `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`
- `pitch/gpt-pro/responses/judging/01-sponsor-rubric-fit-response.md`
- `pitch/gpt-pro/responses/judging/02-product-magnet-response.md`
- `pitch/gpt-pro/responses/judging/03-build-risk-red-team-response.md`

## Source Prompt

You are turning the selected hackathon idea into a six-month production product PRD, compressed into hackathon execution. Do not generate code. Do not write the UIUX interaction plan. Think like a product that must keep serving real users for six months; the hackathon deadline only affects cut order, not product ambition. The demo is only one route through the product. Do not frame the work as a 24-hour/48-hour MVP, proof-of-concept, or disposable demo.

Use the uploaded files as binding rules. Do not invent a PRD shape, stack story, or scope cut that conflicts with them.

Spec Preconditions:
- First output a `PRD Preconditions` block before any PRD content.
- `Upstream GPT Pro mode` must be marked `yes` or `no` by the caller.
- If `Upstream GPT Pro mode: yes`, these inputs are required: selected idea/concept lock, idea_tournament scoreboard or local pick, deep_research_10x10 response, and three judge responses. If any are missing, output `missing G2 prerequisites; do not write PRD` followed by the missing artifact list, then stop.
- If `Upstream GPT Pro mode: no`, still verify the selected idea, current hackathon brief, team/deadline constraints, and implementation constraints are present before writing the PRD.
- This prompt cannot generate UIUX, code, patch files, project scaffolds, or decide that implementation should begin. It only writes the product PRD.

## Inputs

- Upstream GPT Pro mode: yes
- Current hackathon brief: Stellar Hacks: Real-World ZK, single open innovation track, public repo and 2-3 minute demo video required, deadline 2026-06-29 12:00 PST / 2026-06-30 03:00 Asia/Shanghai.
- Selected idea / concept_lock: `pitch/concept_lock.md`, selected concept S3 GrantDrop.
- idea_tournament scoreboard: `pitch/idea_tournament.md`; shortlist was S1 RemitSlip, S2 Masked Bid Market, S3 GrantDrop, S4 Ghost Race Bounty, S5 FanMint, S6 ProofTip.
- 3 judge responses: `pitch/gpt-pro/responses/judging/01-sponsor-rubric-fit-response.md`, `pitch/gpt-pro/responses/judging/02-product-magnet-response.md`, `pitch/gpt-pro/responses/judging/03-build-risk-red-team-response.md`.
- judge_magnet: locked in `pitch/concept_lock.md`, `pitch/demo_interaction_plan.md`, and `pitch/hero.md`.
- Web3 wallet path status, if applicable: wallet/sign/transaction path is required for the hero claim because the user receives a Stellar-visible grant receipt. Read-only replay can be no-wallet; successful claim cannot.
- deep_research_10x10: `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`.
- winner_research: not separate; winner-slot evidence is in `pitch/winner_slot.md`, `pitch/prize_thesis.md`, `pitch/gallery-saturation-audit.md`, and the R0 response.
- team/deadline constraints: single local builder, contest deadline 2026-06-29 PST, must preserve time for build, browser QA, README, 2-3 minute demo video, and DoraHacks submission.
- implementation constraints: current repo has gate artifacts but no app scaffold; Stellar CLI prebuilt exists at `.tools/stellar-cli/stellar.exe`; exact ZK proof stack and Stellar contract/tx path must be chosen in G2 before coding; no regulated remittance/KYC/custody claims; no success state before a real proof/state/tx inspection path exists.

## Required Output

Produce only:

1. Detailed PRD using these 14 sections:
Project background; Problem definition; Target users; User pain points; Core requirements & priority; Solution overview; User flows; User Cases; Demo critical path & Hero Moment; Pages / modules plan; Visual direction & UI principles; Technical constraints; Success metrics; Risks & cut list.

The PRD must include a Six-month product contract covering: month-1 return user, month-6 return user, recurring trigger, owned product object/workspace, production mode, roles and permissions, data lifecycle, failure/recovery behavior, reliability target, observability/logs, support path, privacy/security posture, abuse/cost guardrails, public operability without the builder, first 10 real users or teams, six-month maintenance owner, next integration, and the roadmap/cut line that preserves a usable product. Fallback is only an error/degraded mode; do not define deterministic fallback output, seed-only success, or "watch the demo" as the product success path.

For Web3/ZK/chain products, include a Wallet Playability Contract. If the user owns, claims, mints, pays, swaps, trades, attests, proves, or signs the result, P0 must include wallet connect -> sign -> transaction/proof, the user-visible state change, and the public inspection path. A no-wallet PRD is valid only for verifier-only/read-only/server-issued results and must name that exception.

2. Scope discipline:
- Exactly 2-3 P0 product guarantees that still matter in month 6.
- P1/P2 only if time remains.
- Explicit non-goals and cut list.
- Risk mitigation and recovery/degraded-mode plan; no fake success output.

3. Traceability:
- Map each P0 requirement to route/API/data/state/test/deploy evidence.
- For Web3 P0, map wallet connect/sign/transaction/proof to route/API/state/test evidence or record the valid no-wallet exception.
- Mark any UIUX question that must be answered by the next UIUX cycle.

Block the next UIUX cycle if the PRD lacks selected concept traceability, P0 requirements, production mode, or six-month product contract. Implementation may start only after a separate UIUX GPT Pro response is saved and the local agent distills the PRD/UIUX outputs into the required project artifacts.
