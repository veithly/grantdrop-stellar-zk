# GrantDrop Six-Month Product PRD

## 1. Project background

- Hackathon: Stellar Hacks: Real-World ZK.
- Track / bounty: single open innovation track for real-world zero-knowledge on Stellar.
- Submission deadline: 2026-06-29 12:00 PST / 2026-06-30 03:00 Asia/Shanghai.
- Project language for UI/README/narration/slides/submission: English.
- GPT Pro PRD prompt: `pitch/gpt-pro/prompts/spec/01-best-prd.md`.
- GPT Pro PRD source: `pitch/gpt-pro/responses/spec/01-best-prd-response.md`.
- GPT Pro UIUX source: `pitch/gpt-pro/responses/spec/02-best-uiux-response.md`.
- UIUX interaction plan: `pitch/uiux_interaction_plan.md`.
- Selected concept: GrantDrop, locked in `pitch/concept_lock.md`.
- Product sentence: Claim a Stellar grant receipt without exposing why you qualify.
- Technical direction: Circom + Groth16 + snarkjs for eligibility/nullifier proof; Stellar testnet transaction or Soroban state for claim result; Cloudflare D1 for receipt persistence.

## 2. Problem definition

- Core problem: claimants need to receive grants or rewards without exposing the private fact that makes them eligible, while operators need duplicate-claim prevention and public inspection.
- Current alternative 1: public allowlists and forms that reveal eligibility context.
- Current alternative 2: private backend payout decisions that users cannot inspect.
- Why current alternatives are not enough: one leaks private context, the other hides trust in an opaque workflow.
- Personal/customer scar from `pitch/judge_magnet.md`: people want the reward but do not want to publish why they qualify.
- What a judge should believe after the first screen action: changing a private input changes the receipt state, and a paid receipt only appears with proof plus Stellar evidence.

## 3. Target users

### Primary user

- Persona: eligible claimant, usually a builder, attendee, contributor, fan, or community member.
- Situation: a campaign offers a grant or reward gated by a private eligibility fact.
- Goal: claim once and leave with a public receipt.
- Constraints: do not reveal the private input; do not accept an uninspectable success toast.

### Secondary user

- Persona: campaign operator or public inspector.
- Situation: needs to confirm distribution by rule without collecting every private credential.
- Goal: inspect accepted, rejected, and already-claimed receipts.
- Constraints: P0 must not become an admin dashboard or KYC workflow.

### Anti-user

- Regulated remittance, custody, KYC, sanctions, real fiat payout, and audited privacy operators are explicitly outside P0.

## 4. User pain points

1. Claimants want the grant but not the privacy leak.
2. Operators need duplicate prevention without public identity lists.
3. Judges need visible proof that ZK and Stellar change the user outcome.
4. Pain we explicitly ignore: real grant review, compliance, mainnet custody, and production private payments.

## 5. Core requirements & priority

### P0 product guarantees

- REQ-001 Proof-gated claim: a valid private input can create an accepted receipt and an invalid private input creates a rejected state.
- REQ-002 Duplicate prevention: the same private eligibility condition cannot create a second accepted receipt for the same campaign.
- REQ-003 Stellar-visible receipt: accepted receipts must include a tx or contract-state reference before the UI can show paid/accepted.

### P1 if time remains

- REQ-004 Public receipt replay: `/receipts/[receiptId]` reopens without wallet.
- REQ-005 Inspect receipt: proof/public inputs, nullifier, policy version, and Stellar reference are visible behind the receipt.

### P2 only after P0/P1 are stable

- REQ-006 Share/export receipt card.
- REQ-007 Operator summary that filters receipt states without exposing private inputs.

### Explicitly out of scope

- Multi-campaign admin dashboard, KYC/compliance workflow, mainnet, real fiat/stablecoin distribution claims, audited security/privacy claims, and social scoring.

## 6. Solution overview

GrantDrop is a proof-gated distribution receipt product. A claimant opens one campaign, chooses a private eligibility input, connects a Stellar wallet or client-side signer, signs a claim, waits for proof and Stellar state, and receives accepted, rejected, or already-claimed receipt state.

### Six-month product contract

- Return user in month 1: claimant reopens a receipt; operator inspects one campaign's accepted/rejected/already-claimed states.
- Return user in month 6: communities run recurring proof-gated reward campaigns with the same receipt engine.
- Recurring trigger: campaign links that say a grant or reward can be claimed privately.
- Owned product object: wallet-bound GrantDrop receipt and campaign policy.
- Production mode: real proof path, real Stellar testnet/mainnet path, durable D1 receipt storage, and no manual paid-state edits.
- Roles / permissions: claimant signs claims; public inspector views receipts; campaign operator inspects campaign state; maintainer cannot mark claims paid manually.
- Data lifecycle: create campaign -> validate private proof -> persist public inputs/nullifier/status/tx reference -> reopen/export/share receipt -> delete off-chain display metadata when appropriate while chain references remain immutable.
- Failure and recovery behavior: wallet missing, signature rejected, proof rejected, duplicate, tx pending, tx failed, and inspection degraded are visible states.
- Reliability target: no paid receipt unless proof and Stellar reference exist.
- Observability / logs: redacted diagnostic bundle with receipt ID, claim status, proof state, tx/contract reference, and error class.
- Support path: README troubleshooting plus reproducible GitHub Issues.
- Privacy / security posture: private input and witness are never persisted; public inputs and nullifier are inspectable.
- Abuse / cost guardrails: one claim per nullifier, rate limits, testnet disclosure, and no custody.
- Public operability without builder help: public URL, public campaign, read-only receipt replay, README commands, and browser smoke.
- First 10 real users or teams: Stellar builders, open-source maintainers, event organizers, DAO grant stewards, creator/community managers, and wallet/community operators.
- Six-month maintenance owner / next integration: local builder maintains dependencies, proof disclosure, uptime, docs, and support; next integration is an external credential/proof source.
- Roadmap / cut line that preserves a usable product: keep one campaign, one proof policy, one nullifier rule, one signed claim, one Stellar-visible receipt, and one inspection path.

## 7. User flows

### Flow A: Primary user, hero path

1. Open `/campaigns/zk-builder-microgrant`.
2. Select valid, invalid, or already-used private input.
3. Connect Freighter or client-side signer.
4. Sign claim and generate proof.
5. Wait for tx/contract state.
6. Receive accepted, rejected, or already-claimed receipt.
7. Open Inspect receipt.

### Flow B: Public receipt replay

1. Open `/receipts/[receiptId]`.
2. View receipt without wallet.
3. Expand proof/Stellar inspection.
4. Copy receipt link or diagnostic bundle.

### Flow C: Failure path

1. Reject signature, use invalid input, reuse valid input, or hit tx failure.
2. UI shows blocked state and recovery action.
3. No paid receipt appears without proof/state evidence.

## 8. User Cases

### User case 1: Private microgrant claim (HERO PATH)

- User: eligible builder claiming a microgrant.
- Situation: campaign pays eligible people without collecting private credential.
- Desired outcome: one public receipt.
- Product response: proof-gated accepted receipt with Stellar reference.
- Demo-visible moment: receipt flips to paid.

### User case 2: Duplicate-claim block

- User: same claimant reusing the private input.
- Situation: campaign must not pay twice.
- Desired outcome: duplicate blocked without revealing the secret.
- Product response: nullifier creates already-claimed state and prior receipt link.

### User case 3: Campaign operator inspection

- User: operator or judge inspecting receipt evidence.
- Situation: needs proof of rule-based distribution.
- Desired outcome: inspect state without private input.
- Product response: receipt shows public inputs, nullifier, proof policy, and Stellar reference.

## 9. Demo critical path & Hero Moment

- Source: inherits `pitch/demo_interaction_plan.md`.
- 0-10s: one campaign, private input chips, claim CTA, empty receipt frame.
- 10-30s: judge selects input, connects signer, presses Claim grant.
- 30-60s: state rail shows proof, transaction, and receipt; result changes.
- Judge participation: valid input, invalid input, duplicate input.
- Visual staging: claim booth left, grant box center, receipt frame right.
- Recovery behavior: wallet missing, proof failure, duplicate, tx pending, tx failed, and inspection degraded are visible with retry or diagnostic paths.
- Hero Moment: private eligibility card enters grant box; proof seal appears; receipt flips to paid; Stellar badge appears; duplicate card shakes as already claimed.

## 10. Pages / modules plan

| Route | Surface | Primary action | State / evidence |
| `/campaigns/zk-builder-microgrant` | Claim booth | Claim grant | campaign, signer, proof, tx, receipt states |
| `/receipts/[receiptId]` | Public receipt | View receipt | D1 receipt row plus Stellar reference |
| `/receipts/[receiptId]#inspect` | Inspection panel | Inspect receipt | public inputs, nullifier, proof policy, command path |

Core modules: CampaignClaimBooth, PrivateInputSelector, SignerStrip, ClaimStateRail, ReceiptCard, InspectReceiptPanel, DiagnosticBundleButton.

## 11. Visual direction & UI principles

- Visual style lane: minimal-product with kinetic receipt booth and restrained honey/ink palette.
- Physical scene: a grant claim counter at a public civic desk, where a stamped receipt flips into a clear tray.
- Color strategy: restrained product UI; pure white background, ink text, honey primary from impeccable seed-055, deep teal accent for inspection.
- Primary UI library: shadcn/ui with Radix primitives.
- Supporting UI library: Motion for React for receipt flip, state rail transitions, and reduced-motion alternatives.
- Official docs checked: shadcn/ui docs, Motion for React docs, Stellar developer docs, Freighter API docs, snarkjs README, and Cloudflare Pages/D1 docs before implementation.
- Install commands: `npm create vite@latest . -- --template react-ts`; `npm install @vitejs/plugin-react tailwindcss @tailwindcss/vite motion @phosphor-icons/react @stellar/stellar-sdk @stellar/freighter-api snarkjs`; `npx shadcn@latest init`.
- Tailwind/shadcn rejection note: Tailwind is plumbing and shadcn provides accessible primitives; the visual identity is the claim booth, receipt flip, state rail, and custom OKLCH tokens, not default shadcn cards.
- design-taste-frontend workflow: loaded `C:/Users/Ricky/.skills-manager/skills/design-taste-frontend/SKILL.md`; design read is product UI for hackathon judges and claimants, not a landing page.
- impeccable setup: loaded `C:/Users/Ricky/.skills-manager/skills/impeccable/SKILL.md`, created `PRODUCT.md`, read product register, and used seed-055 palette guidance.
- Logo source: logo-generator planned for G3 wordmark/icon before public packaging.
- Avatar source: no people avatars in P0; use receipt/status glyphs from Phosphor icons.
- Generated image/cutout assets: no generated cutout assets planned for P0; product output is real receipt UI.
- Non-Tailwind visual signature: stamped GrantDrop receipt, grant box drop motion, and proof/Stellar state rail.
- Hero composition: split workbench with private input left, grant box center, receipt frame right.
- Visual differentiation note: looks like a civic claim counter and receipt machine, not a Web3 terminal.
- Forbidden lookalikes: verifier dashboard, KYC portal, generic shadcn grid, AI-purple gradient, proof log page.
- QR mobile access plan: receipt success frame exposes QR/link to `/receipts/[receiptId]` for no-wallet mobile replay.
- Mobile primary flow: campaign promise, input chips, signer state, claim CTA, receipt status, then inspection.
- Desktop parity plan: desktop keeps action and receipt visible together; every mobile state has matching desktop state.

## 12. Technical constraints

- Product backbone: identity/session is wallet address plus receipt URL; storage schema is D1 campaigns, claim_attempts, and receipts; ownership fields are walletAddress, receiptId, campaignId, nullifier; multi-user read paths use public receipt IDs.
- ZK proof: Circom + Groth16 + snarkjs for a private eligibility condition and nullifier.
- Stellar primitive: Stellar testnet transaction or Soroban contract state records accepted, rejected, or already-claimed claim result.
- Wallet Playability Contract: wallet connect/client signer -> sign claim -> proof pending -> transaction pending -> confirmed receipt.
- No-wallet exception: read-only receipt replay and inspection only.
- Deployment target: Cloudflare Pages with Functions and D1.
- Private input and witness are never persisted.
- Paid/accepted UI is blocked until tx/contract reference exists.

## 13. Success metrics

- REQ-001: valid input creates accepted receipt; invalid input rejects.
- REQ-002: same valid input cannot create second accepted receipt.
- REQ-003: 100% of accepted receipts include tx/contract reference.
- REQ-004: receipt reopens after refresh and in a second browser context.
- REQ-005: inspect panel exposes public inputs, nullifier, proof policy, Stellar reference, and command path.
- Judge success metric: first action under 30 seconds and state-changing result under 60 seconds.

## 14. Risks & cut list

- Risk: proof stack too slow. Mitigation: keep circuit to one eligibility rule and one nullifier.
- Risk: Stellar becomes a badge. Mitigation: no accepted receipt without tx/contract reference.
- Risk: product drifts into compliance dashboard. Mitigation: receipt-first UI and no admin dashboard in P0.
- Risk: wallet friction blocks judge. Mitigation: client-side testnet signer fallback, while preserving wallet/sign/transaction path.
- Cut now: campaign editor, analytics, multiple proof templates, mainnet, production distribution, KYC, social scoring.
- Cut last: receipt replay, duplicate block, Stellar inspection, valid/invalid input mutation, browser smoke.

## PRD coverage matrix

| Requirement | Route | API route / contract | Real data source | State evidence | Playwright test | Deployment evidence |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 | `/campaigns/zk-builder-microgrant` | `/api/claims` + proof module | snarkjs proof/public signals | proof pending -> accepted/rejected | valid/invalid mutation | Cloudflare Pages URL |
| REQ-002 | `/campaigns/zk-builder-microgrant` | duplicate/nullifier check | D1 receipt row + nullifier | accepted -> already claimed | duplicate cannot pay twice | D1 binding |
| REQ-003 | `/receipts/[receiptId]` | Stellar tx/contract inspection | Stellar testnet tx/contract ref | accepted only with ref | paid assertion requires ref | README command |
| REQ-004 | `/receipts/[receiptId]` | `/api/receipts/[id]` | D1 receipt row | receipt loaded after refresh | second context replay | public URL |
| REQ-005 | `/receipts/[receiptId]#inspect` | `/api/receipts/[id]/inspect` | public inputs/nullifier/proof policy | inspection expanded | fields visible | screenshot |
| REQ-006 | `/receipts/[receiptId]` | browser share/copy | receipt URL | copied link | share/copy action | demo video |
