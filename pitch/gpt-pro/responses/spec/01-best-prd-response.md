PRD Preconditions

Upstream GPT Pro mode: yes.

Required G2 prerequisites: present.

Selected idea / concept lock: present — S3 GrantDrop is locked, with P0 defined as one campaign, one eligibility rule, one claim, one duplicate block, and one Stellar-visible receipt. 

concept_lock

Idea tournament scoreboard / local pick: present — S1 RemitSlip, S2 Masked Bid Market, S3 GrantDrop, S4 Ghost Race Bounty, S5 FanMint, and S6 ProofTip were shortlisted; local reconciliation selected S3 GrantDrop after J1-J3 judging. 

idea_tournament

Deep research 10x10 response: present — R0 includes required construct primer, product-loop research, weak-source rejection, and research red-team. 

01-10x10-deep-research-response

Three judge responses: present — J1 sponsor/rubric, J2 product magnet, and J3 build-risk responses are present. 

01-sponsor-rubric-fit-response

 

02-product-magnet-response

 

03-build-risk-red-team-response

Current hackathon brief: present — Stellar Hacks: Real-World ZK, open innovation track, public repository and 2–3 minute demo video required, deadline 2026-06-29 12:00 PST / 2026-06-30 03:00 Asia/Shanghai. 

winner_slot

Required construct: zero-knowledge technology integrated with Stellar, where ZK changes the user’s actual product outcome and the Stellar-linked result is inspectable. 

bounty_brief

Team/deadline constraints: present — single local builder, deadline-driven cut order, preserve time for build, QA, README, demo video, and DoraHacks submission.

Implementation constraints: present — no existing app scaffold, Stellar CLI exists at .tools/stellar-cli/stellar.exe, exact ZK proof stack and Stellar contract/transaction path must be chosen in G2, no regulated remittance/KYC/custody claims, and no success state before a real proof/state/transaction inspection path exists.

Missing G2 prerequisites: none.

Output boundary: PRD only. No code, no UIUX interaction plan, no build plan. UIUX-specific questions are marked for the next UIUX cycle.

1. Project background

GrantDrop is a proof-gated grant receipt product for Stellar Hacks: Real-World ZK. The hackathon asks builders to create real-world zero-knowledge applications on Stellar, with ZK doing meaningful work rather than appearing only as a README claim; official examples include privacy pools, private payments, confidential tokens, identity/compliance proofs, provable computation, and verifiable data. 

bounty_brief

 The public DoraHacks page also describes the hackathon as wide open: “build anything you want with zero-knowledge on Stellar.” 
dorahacks.io

The selected concept is S3 GrantDrop: “Private eligibility drops public Stellar grant receipts.” The locked product thesis is a reusable proof-gated distribution engine for campaigns where private eligibility should trigger public payout, access, or receipt state. The beachhead is one microgrant campaign where a claimant proves a private eligibility condition, claims once, receives a Stellar-visible receipt, and sees a duplicate claim blocked. 

concept_lock

GrantDrop intentionally avoids the common weak shape for ZK hackathons: a verifier dashboard, proof log, benchmark page, static hash, or local-only proof bundle. The product starts with the human result — “Can I get paid without showing why I qualify?” — and keeps proof and contract inspection as evidence behind the receipt. 

winner_slot

The selected technical direction for this PRD is:

ZK proof stack: Circom + Groth16 + snarkjs for the P0 eligibility/nullifier circuit.

Stellar path: Stellar testnet Soroban contract path that verifies or gates the claim result and records accepted, rejected, or already-claimed state as an inspectable Stellar-linked receipt.

Wallet path: claimant must connect or use a client-side Stellar signer, sign the claim transaction, and receive a real transaction/contract-state reference before the product can show “paid.”

This proof-stack choice fits the contest’s accepted Circom/Groth16 path and the reference ecosystem: Stellar documentation says BN254/Poseidon host functions are building blocks, but higher-level proof systems and verifier contracts are still needed for full ZK application flows. 
Stellar Docs
 Circom/Groth16-to-Stellar examples show proof generation with snarkjs and proof submission to a Stellar verifier contract. 
JamesBachini.com

2. Problem definition

People want to claim grants, rewards, airdrops, attendance perks, fan perks, or community payments without exposing the private reason they qualify. Operators want to prevent duplicate claims and show that a campaign distributed rewards by rule, but traditional allowlists, forms, KYC-style workflows, and admin dashboards either leak too much private information or ask users to trust an opaque backend.

GrantDrop solves the narrow but repeatable problem:

A claimant should be able to prove private eligibility, claim exactly once, and leave with a public Stellar-visible receipt, without publishing the private credential or relying on a fake proof dashboard.

The key product tension is that privacy alone is not enough. If the result is only “proof verified,” the product feels like cryptographic plumbing. If the result is a public payout or receipt with no real proof and Stellar inspection path, it fails the hackathon and product trust bar. GrantDrop must bind three things together:

A hidden eligibility condition.

A ZK proof/nullifier path.

A Stellar-visible claim result.

The selected concept survives because GrantDrop is the safest honest build-risk choice: one campaign, one eligibility rule, one claimant role, one duplicate block, and one receipt state, while still matching the hidden-condition-to-public-Stellar-result winner slot. 

03-build-risk-red-team-response

3. Target users

Primary user: eligible claimant.
A builder, attendee, community member, fan, contributor, or grant recipient who wants to claim a reward without exposing the underlying private credential or secret. In the beachhead demo, this is an eligible builder claiming a “ZK Builder Microgrant.”

Buyer / operator: campaign owner.
A grant program, DAO, event organizer, wallet community, creator community, open-source maintainer, or ecosystem team that wants to distribute rewards while reducing oversharing and duplicate claims. GrantDrop should eventually give these operators a campaign workspace, but P0 must not become an admin dashboard.

Inspector / verifier: public receipt viewer.
A judge, operator, claimant, teammate, or community member who opens a receipt and confirms that the status, nullifier, public inputs, and Stellar transaction/contract reference exist without seeing the private credential.

Explicitly excluded P0 users.
Regulated remittance senders, KYC/compliance teams, custodial payment operators, sanctions reviewers, fiat payout teams, and production private-payment operators are outside P0. The product must not imply production remittance, custody, KYC, audited privacy, or real fiat distribution.

4. User pain points

For claimants:

They want the reward but do not want to reveal why they qualify.

They want proof that the claim succeeded, not just a success toast.

They need a receipt they can reopen, share, or inspect later.

They need failure to be honest: invalid input, already-claimed state, wallet failure, proof failure, and pending transaction must be visible as blocked or pending states.

For campaign operators:

Public allowlists leak sensitive eligibility facts.

Private claims can invite duplicate claiming unless there is a nullifier or claim marker.

Opaque backend payouts reduce trust because users cannot inspect why claims were accepted or blocked.

A proof dashboard is not compelling to claimants; the durable object needs to be the receipt.

For judges / external reviewers:

They need to see that changing the hidden input changes the result.

They need to see ZK and Stellar doing load-bearing work in the hero path.

They need a public inspection path: proof/public inputs, nullifier, transaction or contract state, and README command. 

demo_interaction_plan

5. Core requirements & priority
P0 product guarantees — exactly 3

P0 Guarantee 1 — Proof-gated claim still matters in month 6.
A claimant can open one campaign, connect or use a Stellar signer, provide a hidden eligibility input, generate/submit a ZK proof, sign a claim transaction, and receive an accepted or rejected result without exposing the private eligibility detail. The visible state must change when the private input changes: valid pays/accepts, invalid rejects. This cannot be simulated by seeded UI state.

P0 Guarantee 2 — Duplicate-claim prevention still matters in month 6.
The same private eligibility condition cannot produce a second paid/accepted receipt for the same campaign. The product must derive or use a nullifier/claim marker, persist the already-claimed state, and link the duplicate attempt to the prior receipt or claim state without revealing the private input. Duplicate must be a blocked product state, not an error hidden behind “success.”

P0 Guarantee 3 — Stellar-visible receipt and inspection still matter in month 6.
A successful claim produces a GrantDrop receipt with campaign name, status, claimant wallet/signing identity, nullifier, timestamp, proof/public-input reference, and Stellar transaction or contract-state reference. The receipt must reopen without the builder, and the “paid/accepted” label may appear only after the app has a real proof/state/transaction inspection path. Read-only replay can be no-wallet; claiming cannot.

P1 — only if time remains

Self-serve campaign creation for one additional proof policy.

Receipt export/share card.

Operator campaign summary that lists receipt states without showing private inputs.

Second eligibility template, such as event attendance reward or fan reward.

Cleaner public campaign page copy for non-hackathon users.

P2 — only after P0/P1 are stable

Wallet/community distribution API.

External credential provider integration.

Multi-campaign operator workspace.

Mainnet path after legal/security review.

Audited contract/proof path.

Organization-grade budget and rate-limit controls.

Integration with broader Stellar payout/disbursement tooling.

Non-goals and cut list

No real KYC or compliance workflow.

No regulated remittance, custody, FX, fiat payout, or production private-payment claim.

No full privacy pool.

No multi-campaign admin dashboard in P0.

No real grant review workflow.

No sanctions screening or compliance approval.

No social scoring.

No audited-security claim.

No deterministic fallback success.

No seed-only success.

No fake transaction hash, fake proof, fake nullifier, or fake contract state.

No “watch the demo” product success path.

No success state before proof/state/transaction evidence exists.

6. Solution overview

GrantDrop is a proof-gated distribution receipt product. It turns a hidden eligibility condition into a public, replayable Stellar-visible claim result.

The beachhead product is a single campaign: ZK Builder Microgrant. The claimant enters or selects a hidden eligibility input, signs a claim, and receives one of three states:

Paid / accepted: valid proof, unused nullifier, Stellar-visible claim state exists.

Rejected: invalid eligibility proof or failed proof validation.

Already claimed: valid or repeated eligibility condition maps to a nullifier already used for the campaign.

The user-facing artifact is the GrantDrop receipt, not a proof page. Proof details, public inputs, nullifier, transaction, contract state, and README command are inspection evidence behind the receipt. This follows the winner-slot rule that proof/log/benchmark evidence stays backstage until the product consequence lands. 

winner_slot

Six-month product contract

Month-1 return user.
An eligible claimant returns to reopen or share their grant receipt. A small campaign operator returns to inspect accepted/rejected/already-claimed receipts from the first campaign and run one similar proof-gated drop.

Month-6 return user.
A community, event, DAO, creator, or wallet team returns to run recurring proof-gated campaigns: attendance rewards, builder grants, community rewards, fan perks, or contribution drops. A claimant returns to reuse the same wallet/signer and receipt history across campaigns.

Recurring trigger.
A new campaign link appears: “claim this grant/reward/perk without exposing why you qualify.” The recurring event is not an emergency; it is a reward, grant, attendance, fan, or contributor drop.

Owned product object / workspace.
The durable product objects are campaign workspaces and wallet-bound receipts. Campaign owners own campaign policy, budget metadata, status, and receipt list. Claimants own receipt links tied to their wallet/signer and claim state.

Production mode.
Production mode is a public, self-operable, non-custodial proof-gated campaign product with persistent receipts, documented proof/transaction inspection, and no builder-only manual state edits. P0 production mode is acceptable as testnet/developer-preview for the hackathon, but it must still use a real proof and Stellar state/transaction path. Mainnet, real-money distribution, custody, and audited privacy are post-hackathon only after legal/security review.

Roles and permissions.
Claimant signs claims and can view their receipt. Campaign operator can create or manage campaign policy in later scope; in P0, campaign policy can be fixed but still must be inspectable. Public inspector can view receipt evidence without wallet. Maintainer can operate deployment, rotate non-secret config, and triage support, but cannot manually mark claims paid.

Data lifecycle.
A campaign is created with campaign ID, campaign name, reward metadata, proof policy version, status, and Stellar contract reference. A claimant generates proof from private input; private input is never persisted. Public inputs, proof reference, nullifier, wallet address, status, transaction/contract reference, and receipt metadata are persisted. Receipts can be reopened by ID. Export is receipt-level JSON or share link. Deletion can remove off-chain display metadata where legally/productively appropriate, but public chain state and transaction references remain immutable and must be disclosed.

Failure / recovery behavior.
Wallet missing shows “connect/sign required.” Invalid proof shows rejected and allows a changed input. Duplicate nullifier shows already claimed and links to prior receipt. Pending transaction shows pending until chain state resolves. Failed Stellar transaction shows failed and never marks paid. Proof service or verifier unavailable shows degraded/unavailable, not success. Fallback is only error/degraded mode.

Reliability target.
Public app route availability target: 99% during demo/submission window and month-1 beta. Receipt reopening target: 99% for persisted receipts. Claim completion target: best effort under testnet/provider availability, with zero false paid states. The product favors correctness over availability: never show paid without proof/state/transaction evidence.

Observability / logs.
Log route load, claim attempt ID, campaign ID, wallet public address, proof generation duration, verifier status, transaction submission status, ledger/contract reference, duplicate/nullifier status, and error class. Do not log private eligibility input, witness, raw secret, or private credential.

Support path.
P0 support is public README troubleshooting, in-app “copy diagnostic bundle” with redacted claim ID and tx/contract reference, and GitHub Issues for reproducible failures. Month-1 support adds a short operator setup guide. Month-6 support adds campaign owner runbooks and incident status notes.

Privacy / security posture.
GrantDrop minimizes private data by never storing raw private eligibility input. It stores public inputs, nullifier, wallet, status, and receipt references. The app must clearly state that it is unaudited, prototype-grade, and not a KYC, compliance, custody, or production private-payment system. Any demo signer uses throwaway/testnet funds only.

Abuse / cost guardrails.
One claim per campaign/nullifier. Rate-limit proof generation and claim submission per wallet/IP/session. Cap proof input size and campaign budget metadata. Disable unlimited public proof generation if it creates cost or denial-of-service risk. Never expose server secrets or mainnet private keys. Funded demo signer, if used for no-install flow, must be limited, testnet-only, and still require a user-visible sign/claim action.

Public operability without the builder.
A fresh public user can open the campaign, use the provided test inputs or their own configured claim input, connect/use a Stellar signer, submit a claim, see valid/rejected/already-claimed states, reopen the receipt, and inspect proof/Stellar references using README instructions. No manual database edit, private chat with the builder, hidden seed toggle, or prerecorded video is allowed as the success path.

First 10 real users or teams.
The first 10 targets are: three Stellar/Soroban hackathon builders, two open-source project maintainers running contributor rewards, two community/event organizers running attendance perks, one DAO or community grant steward, one creator/community manager running fan perks, and one wallet/community operator exploring proof-gated rewards.

Six-month maintenance owner.
The single local builder owns maintenance for six months: dependency updates, contract/proof disclosure, uptime, support triage, bug fixes, abuse guardrails, and documentation. If another owner is added later, permissions must be explicit and wallet/admin actions must be auditable.

Next integration.
The next integration should be an external credential/proof source for real eligibility, followed by a Stellar-native distribution integration only after legal/security review. The first integration should strengthen eligibility truth without turning the product into KYC.

Roadmap / cut line preserving usable product.
The product remains usable if it has one campaign, one private proof policy, one nullifier rule, one wallet-signed claim, one Stellar-visible receipt, and one inspection path. Everything else cuts before these: campaign editor, multiple proof templates, dashboard, export polish, analytics, mainnet, API, and integrations.

7. User flows
Flow A — Private microgrant claim

A claimant opens the campaign link, reviews the campaign promise, connects or uses a Stellar signer, provides a hidden eligibility input, submits a claim, signs the transaction, and receives a receipt state. The private input is not shown on the receipt. The receipt shows status, campaign, wallet, nullifier, timestamp, proof/public-input reference, and Stellar tx/contract reference.

UIUX question for next cycle: exact field treatment for “hidden eligibility input” so the judge understands the input is private without turning the first screen into a proof explanation.

Flow B — Invalid claim rejection

A claimant provides an invalid hidden input. The proof path fails or validates as not eligible. The claim remains unpaid/rejected. The UI can allow changing the input, but it cannot show a paid receipt or fake tx.

UIUX question for next cycle: rejection copy should be understandable without leaking whether the user was close to a valid secret.

Flow C — Duplicate-claim block

A claimant submits a hidden input that maps to a nullifier already used in the campaign. The app shows already claimed and links to the original receipt/claim state. The duplicate attempt must be inspectable and must not expose the private input.

UIUX question for next cycle: exact “already claimed” receipt treatment and how to show prior reference without making duplicate state feel like a crash.

Flow D — Receipt inspection

A public viewer opens a receipt without a wallet. They can inspect status, nullifier, public inputs, proof policy version, transaction or contract reference, and README command path. This is a read-only replay; no wallet is required because no new claim is being owned, signed, or created.

UIUX question for next cycle: information hierarchy for receipt inspection so proof details remain secondary but easy to verify.

Flow E — Campaign operator inspection

An operator opens campaign-level receipt state to confirm accepted, rejected, and already-claimed results. P0 can expose this through receipt links and fixed campaign metadata; P1 may add operator summary. P0 must not become a compliance dashboard.

UIUX question for next cycle: whether operator inspection is a separate page or a receipt-filtered view, without adding admin-dashboard weight.

8. User Cases

User case 1 — Private microgrant claim.
An eligible builder claims a community microgrant. The campaign needs to pay or recognize eligible people without collecting or publishing the private credential. The claimant wants the grant but does not want to expose why they qualify. The product validates the hidden condition, blocks duplicate claims with a nullifier, records the accepted result on Stellar, and shows a receipt. 

user_cases

Acceptance criteria:

Valid private input produces accepted/paid state only after proof and Stellar reference exist.

Receipt hides the raw eligibility secret.

Receipt can be reopened by link.

Claim status can be inspected by a public viewer.

User case 2 — Duplicate-claim block.
The same claimant, or someone reusing the same private eligibility secret, attempts to claim again. The campaign must avoid paying the same private credential twice while avoiding public allowlists. The nullifier matches the prior claim, the app shows already claimed, and the receipt links to the first claim state. 

user_cases

Acceptance criteria:

Duplicate attempt cannot create a second paid receipt.

Duplicate state is visible and deliberate.

Prior receipt/claim reference is inspectable.

Raw private credential remains hidden.

User case 3 — Campaign operator inspection.
A grant program or community operator wants to prove funds/rewards were distributed by rule without seeing every private credential. The operator opens a receipt after a claim round and inspects state, nullifier, public inputs, and Stellar reference while private inputs remain hidden. 

user_cases

Acceptance criteria:

Operator can verify accepted/rejected/already-claimed state.

Receipt evidence is sufficient to reproduce proof or Stellar inspection from README.

No KYC/compliance claim is implied.

No private credential is shown to the operator.

9. Demo critical path & Hero Moment

The demo critical path is:

Open one campaign: ZK Builder Microgrant.

Claimant chooses or enters a hidden eligibility input: valid, invalid, or already used.

Claimant connects or uses a configured Stellar signer.

Claimant clicks claim and signs the claim transaction.

App generates/submits proof and sends the claim transaction.

Valid input produces a paid/accepted receipt after Stellar state exists.

Invalid input produces rejected state.

Reused input produces already-claimed state and prior receipt reference.

Claimant or judge opens Inspect Receipt to see nullifier, public inputs, claim state, tx or contract reference, and README command path.

The hero moment is the visible state flip: the private eligibility card enters the grant box, a proof seal appears behind it, the receipt flips to paid, a Stellar tx/contract badge appears, and a duplicate card later blocks as already claimed. 

demo_interaction_plan

The demo must prove three changes:

Input mutation: valid, invalid, and duplicate inputs produce different states.

ZK load-bearing: success depends on proof validity, not only browser state.

Stellar-visible consequence: paid/accepted state has an inspectable transaction or contract-state reference.

No verifier, contract selector, admin table, proof log, or setup checklist should appear as the first product beat. The result comes first; proof and Stellar inspection come after. 

bounty_brief

10. Pages / modules plan

This is a product surface plan, not a UIUX interaction plan.

Campaign claim route — /campaigns/[campaignId].
Purpose: let a claimant claim one proof-gated grant.
Required states: unavailable, wallet required, ready, proof generating, transaction pending, accepted/paid, rejected, already claimed, failed/degraded.
Owned object: claim attempt and final receipt.

Receipt route — /receipts/[receiptId].
Purpose: reopen/share/inspect a claim result.
Required states: receipt found, receipt not found, chain reference pending, chain reference failed, inspectable.
Owned object: durable receipt with public evidence.

Receipt inspection module.
Purpose: show proof/public inputs, nullifier, policy version, Stellar tx/contract reference, and README command path.
Constraint: inspection is evidence, not the hero.

Wallet/signer module.
Purpose: connect or provide a client signer, bind claim to wallet, request signature, and submit transaction.
Constraint: no successful claim without user-visible sign/transaction path.

Proof module.
Purpose: generate/verify proof for private eligibility and nullifier.
Constraint: raw private input/witness is not persisted or logged.

Stellar claim module.
Purpose: submit claim transaction and record accepted/rejected/already-claimed state on Stellar or via Stellar-visible contract state.
Constraint: no fake tx/hash; no paid state before chain/state reference.

Campaign policy module.
Purpose: define one P0 campaign policy and proof policy version.
Constraint: P0 may be fixed; self-serve editing is P1.

Persistence module.
Purpose: store campaign metadata, receipt metadata, claim attempt status, nullifier, public inputs, proof reference, and chain reference.
Constraint: no localStorage-only database for owned/shared product state.

UIUX questions for next cycle:

Exact route naming, empty states, loading behavior, keyboard/touch paths, and accessibility treatment.

Whether receipt inspection is inline, drawer, modal, or separate section.

How to represent “private input” without encouraging users to paste real sensitive documents.

How to communicate testnet/demo scope without weakening the hero.

11. Visual direction & UI principles

GrantDrop should look like a grant claim booth, not a dashboard.

Core principles:

Receipt-first. The hero object is the GrantDrop receipt, not the proof, circuit, verifier, or transaction log.

Private facts backstage. The interface should tell the claimant that the product proves eligibility without revealing why they qualify, but it should not expose raw private inputs.

Human result before cryptography. Copy should say “Claim a Stellar grant receipt without exposing why you qualify,” not “Generate a Groth16 proof.”

Inspectable without becoming a proof dashboard. Proof/public inputs, nullifier, and tx/contract state must be one click away after the result lands.

Clear state language. Paid/accepted, rejected, already claimed, pending, failed, and degraded must be unmistakable.

No compliance aesthetic. Avoid admin tables, KYC cues, audit packet framing, and legal-review workflow cues in P0.

Trust through restraint. Use explicit labels for testnet, unaudited, no custody, no KYC, and no production payment claims.

Accessible by default. Status must not rely on color alone; receipt status, proof status, and transaction state need text labels and screen-reader-safe structure.

UIUX questions for next cycle:

Exact visual metaphor for “grant box” and “receipt flip.”

Motion timing and reduced-motion alternative.

Mobile-first receipt hierarchy.

Copy system for rejected vs already-claimed states.

Locator strategy, focus order, keyboard path, and touch target sizing.

12. Technical constraints
Branch and primitive

GrantDrop is Web3/ZK, not AI. The chain/protocol state changes the user outcome, so Web3 is load-bearing. The selected primitives are:

ZK proof: Circom + Groth16 proof over a private eligibility condition and nullifier.

Stellar primitive: Soroban contract state / transaction reference for claim result.

Wallet primitive: user-visible connect/sign/submit path for claim ownership.

Exact P0 proof stack

Circuit language: Circom.

Proof scheme: Groth16.

Proof tooling: snarkjs for witness/proof/public signal generation.

Circuit statement: claimant knows a private eligibility secret or credential preimage that satisfies the campaign policy and produces a public nullifier for campaign-level duplicate prevention.

Public inputs: campaign ID or campaign root, nullifier, claimant wallet/signing address binding, policy version, and any public eligibility commitment needed by the circuit.

Private inputs: eligibility secret/preimage and any witness data required to satisfy the campaign policy.

Persistence rule: private inputs/witnesses are never persisted; public inputs/proof references/nullifier/tx state can be persisted.

The Circom/Groth16 choice is grounded in active Stellar-adjacent examples where snarkjs generates proofs and public outputs that can be submitted to a Stellar Groth16 verifier contract. 
JamesBachini.com
 Stellar privacy-pool prototyping also uses Circom and Groth16, with nullifier-output patterns and Soroban verifier tooling, while noting conversion constraints and curve compatibility. 
stellar.org

Exact P0 Stellar path

Network: Stellar testnet for hackathon P0 unless localnet is explicitly labeled as degraded/reproducibility mode.

Contract role: campaign/claim contract records campaign ID, nullifier, claimant wallet, proof policy version, claim status, and receipt reference after proof acceptance or claim evaluation.

Required accepted state: a successful claim must have a Stellar transaction hash or contract-state reference.

Required rejected state: invalid proof/input must not emit paid/accepted state.

Required duplicate state: duplicate nullifier must be blocked by contract state or durable state that is tied to Stellar-visible claim state.

Inspection path: app receipt → proof/public inputs → tx/contract reference → README command using Stellar CLI.

Wallet Playability Contract

P0 claim path must include:

Wallet connect or client-side Stellar signer selection.

Claimant-visible signature request.

Proof generation/submission tied to the claim.

Claim transaction submission.

Stellar transaction or contract-state result.

User-visible state change in the app.

Public receipt inspection path.

A no-wallet path is valid only for read-only receipt replay and inspection. It is not valid for successful claiming because the user receives a Stellar-visible grant receipt and therefore must sign or use a client-side signer. The concept lock explicitly requires wallet/client signer for hero success, with no-wallet limited to replay/inspection. 

concept_lock

Storage and state constraints

Must persist campaign metadata and receipt state outside localStorage.

Must persist claim status transitions: created, proof pending, proof rejected, transaction pending, accepted/paid, already claimed, failed/degraded.

Must persist or derive receipt ID so public users can reopen the receipt.

Must never store private eligibility input or raw witness.

Must disclose immutable chain data and deletion limits.

Current repo / tooling constraints

Current repo has gate artifacts but no app scaffold.

Stellar CLI prebuilt exists at .tools/stellar-cli/stellar.exe.

Exact ZK proof and Stellar contract path is chosen here; coding cannot begin until separate UIUX output is saved and local artifacts are distilled.

Public success cannot rely on local-only state unless explicitly labeled degraded.

Contract/test/proof inspection must be documented in README and demo video.

Hard technical blocks

Fake digest/hash as proof.

Static proof log pretending to be runtime.

Local-only verifier with no meaningful Stellar consequence.

Wallet dashboard with no claim transaction.

Paid state before transaction/contract-state reference.

Mainnet private key.

Seeded success path.

LocalStorage-only owned state.

Public claim that cannot be reopened or inspected.

13. Success metrics
Product clarity metrics

A cold judge can explain GrantDrop in one sentence: “It pays eligible people without showing why they qualify.”

First action is clear within 30 seconds: choose/enter private input, connect/sign, claim.

Valid, invalid, and duplicate inputs visibly produce different results.

The receipt can be shared or reopened without builder assistance.

P0 correctness metrics

100% of paid/accepted receipts have proof/public-input reference and Stellar tx/contract reference.

0 paid/accepted receipts are shown before transaction or contract-state evidence exists.

100% of duplicate claims for the same campaign/nullifier are blocked.

100% of invalid proof attempts are rejected or degraded, not converted to success.

0 private eligibility inputs are persisted in logs or receipt metadata.

Hackathon evidence metrics

Public repo exists.

README explains what was built, what ZK does, what Stellar state/transaction proves, and what limitations exist.

2–3 minute demo video shows working claim, input mutation, duplicate block, and inspection path, matching the submission requirement. 

bounty_brief

Fresh public user can reproduce at least one claim path or inspect a saved receipt without builder-only manual edits.

Desktop and mobile screenshots exist after real success state.

Month-1 metrics

At least 10 claim attempts by real external users or teams.

At least 3 non-builder users reopen a receipt after the original claim session.

At least 2 campaign-style use cases tested beyond the demo language, even if still using the same P0 proof policy.

No unresolved bug allows paid state without chain reference.

Month-6 metrics

At least 5 real community/operator teams have run or tested a proof-gated campaign.

At least 50 receipts created or replayed across campaigns/test campaigns.

At least 90% of successful receipts remain reopenable.

At least one external eligibility/proof source integration is evaluated or prototyped without turning the product into KYC.

Maintenance owner has documented limitations, support route, and incident recovery process.

14. Risks & cut list
Primary risks and mitigations

Risk: ZK becomes decorative.
Mitigation: P0 requires valid, invalid, and duplicate inputs to produce different states, and the accepted result must be visible through Stellar tx/contract state. J3 identified this as GrantDrop’s hardest implementation risk. 

03-build-risk-red-team-response

Risk: Stellar becomes a badge only.
Mitigation: no paid/accepted receipt without transaction or contract-state reference. Removing Stellar must break the core outcome; otherwise the product is just a browser credential. 

winner_slot

Risk: Product collapses into grant compliance dashboard.
Mitigation: first screen remains claimant action and receipt; campaign admin is P1/P2. J1 called this a fatal blocker for GrantDrop if it becomes a grant admin/compliance dashboard instead of a proof-gated payout receipt. 

01-sponsor-rubric-fit-response

Risk: Fairness/privacy overclaim.
Mitigation: disclose testnet, unaudited, non-production, no KYC, no custody, no regulated payment. Do not claim audited privacy or production-grade compliance.

Risk: Proof verifier path fails late.
Mitigation: cut scope to the smallest circuit and one policy. If verifier or contract path is unavailable, show degraded/unavailable and do not mark paid. Do not replace with a deterministic success fallback.

Risk: Wallet friction blocks judges.
Mitigation: allow a no-install client signer/demo signer path only if the judge still initiates a visible signing/claim action. Read-only replay can skip wallet; successful claim cannot.

Risk: Testnet or RPC instability.
Mitigation: show pending or failed transaction states, preserve retry, and include CLI inspection. Never convert pending into paid without chain evidence.

Risk: Private input leakage.
Mitigation: never persist raw private input, never log witness, and keep receipt evidence to public inputs/nullifier/tx references.

Recovery and degraded-mode plan

Wallet unavailable → show “wallet/signature required to claim”; allow read-only receipt replay.

Proof generation unavailable → show “proof unavailable”; no paid state.

Invalid proof → rejected; allow changed input.

Duplicate nullifier → already claimed; link prior receipt.

Stellar transaction pending → pending; no paid state until confirmed.

Stellar transaction failed → failed; no paid state.

Contract inspection unavailable → receipt can show degraded inspection, but accepted state must still have stored tx/contract reference.

Storage unavailable → claim disabled or receipt unavailable; do not rely on local-only success.

Cut list that preserves a usable product

Cut first:

Campaign editor.

Multi-campaign workspace.

Operator analytics.

Receipt export polish.

Multiple proof templates.

External credential integrations.

Mainnet.

API.

Advanced animations.

Benchmarks beyond minimum disclosure.

Admin dashboards.

Never cut:

Proof-gated claim.

Duplicate/nullifier block.

Wallet/sign/transaction path for successful claim.

Stellar-visible receipt.

Public inspection path.

Honest failure states.

P0 traceability matrix
P0 guarantee	Route evidence	API / contract evidence	Data evidence	State evidence	Test evidence	Deploy / public evidence
P0-1 Proof-gated claim	/campaigns/[campaignId] loads one campaign and accepts a hidden eligibility input	Proof generation endpoint/module; claim submission endpoint; Soroban claim method	Campaign ID, wallet, proof policy version, public inputs, proof reference	ready → proof pending → tx pending → accepted or rejected	Valid input succeeds; invalid input rejects; changed input changes result	Public app URL; README claim reproduction; demo video shows valid/invalid mutation
P0-2 Duplicate prevention	Same campaign route allows repeated claim attempt	Contract/state check rejects reused nullifier	Nullifier, campaign ID, first receipt reference	accepted → duplicate attempt → already claimed	Same private eligibility input cannot create second paid receipt	Public receipt shows already-claimed state and prior reference
P0-3 Stellar-visible receipt	/receipts/[receiptId] reopens result	Stellar tx/contract inspection command; receipt lookup endpoint	Receipt ID, campaign, status, nullifier, tx/contract reference, timestamp	pending/accepted/rejected/already claimed/failed	Receipt reopens; no paid state without tx/contract reference	README includes tx/contract ID, CLI command, screenshots, and explicit limitations
Web3 / ZK traceability matrix
Wallet / ZK requirement	Product requirement	Route/API/state evidence	Test evidence	Valid no-wallet exception
Wallet connect / client signer	Claimant must own/sign successful claim	Campaign route exposes signer state; claim attempt stores wallet public address	Claim cannot submit without signer	Read-only receipt replay only
Signature	Claim transaction must be user-visible	Claim state includes signature requested/submitted	User-visible signing step captured in demo/video	None for successful claim
Proof generation	Private eligibility changes outcome	Proof module emits proof/public inputs; invalid input rejects	Valid/invalid proof tests	None for successful claim
Transaction / contract state	Receipt cannot be paid without Stellar reference	Receipt stores tx hash or contract ID/state reference	Paid state assertion requires tx/contract reference	Read-only inspection can view existing reference
Public inspection	Anyone can verify receipt evidence	Receipt route shows public inputs/nullifier/tx/command	Fresh public viewer can open receipt	This is the only no-wallet mode
UIUX cycle gate

Selected concept traceability: present. P0 requirements: present. Production mode: present. Six-month product contract: present.

Next UIUX cycle is not blocked by this PRD, but implementation remains blocked until a separate UIUX GPT Pro response is saved and the local agent distills PRD/UIUX outputs into the required project artifacts. This follows the full-mode rule that PRD and UIUX are separate cycles and implementation cannot substitute a local plan for the missing UIUX spec. 

01d-gpt-pro-research
