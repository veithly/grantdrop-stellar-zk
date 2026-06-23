UIUX Preconditions

Required inputs: present.

Selected idea / concept lock: present. GrantDrop is locked as “Private eligibility drops public Stellar grant receipts,” with P0 scoped to one campaign, one eligibility rule, one claim, one duplicate block, and one Stellar-visible receipt. 

concept_lock

Saved PRD GPT Pro response: present. The PRD preconditions say required G2 prerequisites are present, missing prerequisites are none, and the selected technical direction is Circom + Groth16 + snarkjs with a Stellar testnet Soroban transaction/contract-state receipt path. 

01-best-prd-response

Team constraints: present. Single local builder, deadline-driven execution, and time must be preserved for implementation, QA, README, screenshots, demo video, and DoraHacks submission. 

01-best-prd-response

Implementation constraints: present. No scaffold exists yet; no success state may appear before real proof/state/transaction inspection; no fake proof/hash/nullifier/tx; no localStorage-only owned state; public success must be inspectable. 

01-best-prd-response

Visual/design constraints: present. First screen is product, not landing page. One dominant verb CTA. Receipt-first. Proof/Stellar inspection secondary until after the receipt. No verifier dashboard, admin table, generic shadcn card grid, AI gradient, KYC/compliance visual language, or marketing hero. 

01-best-prd-response

Proceed with UIUX. Missing G2 prerequisites: none.

1. Detailed UIUX Interaction Plan
Product interaction thesis

GrantDrop opens on a live claim booth, not a dashboard. The judge immediately sees one campaign, one private-input choice, one dominant action, and the future receipt space. The first screen must answer: “Can I claim this grant without showing why I qualify?” The visible product loop is:

private input/action -> proof + Stellar state change -> high-contrast GrantDrop receipt -> optional inspection

This follows the required interaction bar that a P0 UI must map route -> user action -> system response -> state changed -> proof shown, and every P0 screen needs default, loading, empty, error, success, keyboard/touch, accessibility, and test selectors. 

01-product-discovery

Screen map
Route	Screen	Primary user action	System response	State changed	Proof shown
/campaigns/zk-builder-microgrant	Grant claim booth	Choose or keep a private eligibility input; press Claim grant	Creates claim attempt, checks signer state, moves to wallet/sign path if needed	campaign.loaded, input.selected, claimAttempt.created	Campaign policy summary, proof policy version, one-claim rule
/campaigns/zk-builder-microgrant	Wallet / signer step	Connect Stellar wallet or choose client-side signer	Shows connected account, network, signer readiness, and claim binding	wallet.disconnected -> wallet.connected; claimAttempt.walletBound	Account address, network/testnet label, signer status
/campaigns/zk-builder-microgrant	Sign + proof + transaction pending	Approve claim signature	Generates/submits proof, submits claim transaction, polls contract/tx state	signature.requested -> approved; proof.pending; tx.pending	Timeline rows: signature, proof, transaction, receipt
/campaigns/zk-builder-microgrant	Accepted / paid receipt result	View receipt; choose Inspect receipt	Receipt flips in; Stellar badge appears only after tx/contract ref exists	claim.status = accepted/paid; receipt.created	Receipt ID, wallet, nullifier, timestamp, tx/contract ref
/campaigns/zk-builder-microgrant	Rejected result	Change input; retry claim	Shows rejected receipt-style card, no paid label, no fake tx	claim.status = rejected	Rejection status, proof rejection class, no private input shown
/campaigns/zk-builder-microgrant	Already-claimed result	Open prior receipt or change input	Shows duplicate blocked state and prior receipt reference	claim.status = already_claimed; duplicate.priorReceiptLinked	Nullifier match, prior receipt link, no raw secret
/receipts/[receiptId]	Public receipt replay	Open shared receipt link	Reopens receipt without wallet	receipt.loaded	Status, campaign, wallet/signing identity, nullifier, timestamp, tx/contract ref
/receipts/[receiptId]#inspect	Inspect receipt	Expand Inspect receipt	Shows public inputs, proof policy, nullifier, Stellar ref, README command path	inspection.expanded	Proof/public-input reference, command copy, tx/contract explorer/CLI ref
/receipts/[receiptId]	Receipt not found / degraded inspection	Retry, return to campaign, copy diagnostic	Explains missing/degraded state honestly	receipt.error or chainInspection.degraded	Redacted claim ID, tx/contract ref if available, diagnostic bundle
First-run flow
0–10s

The first screen opens directly on ZK Builder Microgrant. Largest text: Claim a Stellar grant receipt without exposing why you qualify with data-hero-text. The central object is a claim booth: left side private eligibility card, center grant box, right side empty receipt frame. The judge sees three sample inputs: Valid demo input, Invalid demo input, and Reuse current valid input after first claim. The dominant CTA is Claim grant with data-cta-primary.

No verifier selector, contract picker, proof log, admin table, setup checklist, or “learn more” hero appears before the product action. This matches the demo plan’s 0–10s requirement: one campaign, private input options, no verifier/admin first screen. 

demo_interaction_plan

10–30s

The judge keeps or changes the input and presses Claim grant. If no signer is connected, the claim booth folds down into a signer strip instead of navigating away. The CTA becomes Connect signer only while signer connection is the blocking step. Once connected, the visible account appears as truncated address plus “Stellar testnet.” The CTA returns to Claim grant or advances to Sign claim. The claim attempt now has one campaign, one wallet, one selected private-input mode, and a visible pending timeline.

30–60s

After signature approval, the UI shows a compact three-step state rail: Proof, Stellar transaction, Receipt.

Valid input: private eligibility card drops into the grant box, proof seal appears, receipt flips to PAID / ACCEPTED, and the Stellar tx/contract badge appears after the chain/state reference is present.

Invalid input: card stays locked, receipt frame becomes REJECTED, and the UI says “This proof did not satisfy the campaign rule. Change the private input and try again.”

Duplicate input: after a valid claim, the judge presses Claim again with same input. The receipt frame shakes once and settles into ALREADY CLAIMED, with a prior receipt link. This is a deliberate blocked result, not a crash. The PRD requires valid, invalid, and duplicate inputs to visibly produce different states. 

01-best-prd-response

2–3min

The judge opens Inspect receipt from the receipt. The product reveals public inputs, nullifier, proof policy version, Stellar tx/contract reference, and README command path. The inspection panel is secondary and appears only after the receipt exists. The presenter can then replay the duplicate state and open the prior receipt link.

5min / Q&A

Q&A surfaces are already in the UI: wallet rejection, proof unavailable, tx pending, tx failed, duplicate blocked, read-only receipt replay, and diagnostic copy. The presenter can explain that the only no-wallet exception is receipt replay/inspection; a successful claim requires wallet/client signer, signature, proof submission, and transaction/contract state. 

01-best-prd-response

P0 screen contracts
P0 Screen A — Campaign claim booth

Route: /campaigns/zk-builder-microgrant

Purpose: let a claimant operate one proof-gated grant campaign.

Default state:
The campaign loads with a fixed campaign name, reward label, one proof policy version, a visible “one claim per private eligibility” rule, a signer status strip, and one dominant CTA. Default selected sample is Valid demo input so the first action is playable; invalid and duplicate paths remain one click away. Private input is represented as a masked passphrase field plus demo chips, never as “upload identity document” or “paste KYC data.”

Loading state:
Skeleton must preserve layout: campaign title, private-input area, CTA placeholder, receipt frame placeholder. Loading text: “Opening campaign policy…” No spinner-only screen.

Empty state:
If campaign metadata is missing: “This campaign is unavailable.” Next action: Open saved receipt if a receipt link exists, or Retry campaign. Do not show blank cards.

Error state:
Campaign unavailable, storage unavailable, or proof policy mismatch blocks claiming. Copy: “Claiming is unavailable; no receipt can be marked paid while campaign state is missing.” Actions: Retry, Copy diagnostic, Open sample receipt only if clearly labeled read-only.

Success state:
Claim attempt created and passed to signer/proof/tx flow. The campaign screen remains visible; no redirect before the result unless a receipt ID already exists.

Keyboard/touch:
Tab order: input chips → masked input → signer strip → primary CTA → status rail → receipt/inspect. Arrow keys move between input chips. Enter triggers primary CTA only when focus is on the CTA. Touch targets minimum 44–48px.

Accessibility:
The claim booth has an aria-live="polite" status region for claim status changes. Status is text-first, not color-only. Masked input has helper text: “Private input is used locally for proof generation and is not stored.”

State transition:
campaign.loading -> campaign.ready -> input.selected -> claimAttempt.created

Result/shareable artifact:
Not created yet. The receipt frame previews the future artifact but must be labeled “Receipt will appear after proof + Stellar confirmation.”

Test selectors:
data-hero-text, data-campaign-id, data-campaign-title, data-proof-policy-version, data-private-input-group, data-input-chip-valid, data-input-chip-invalid, data-input-chip-reuse, data-private-input-field, data-cta-primary, data-receipt-preview, data-error-banner, data-copy-diagnostic.

P0 Screen B — Wallet / client signer step

Route: same route, inline state within /campaigns/zk-builder-microgrant

Purpose: bind the claim to a Stellar wallet/client signer before proof and transaction.

Default state:
Signer strip shows Signer required to claim, with secondary copy: “Receipt replay is public; claiming requires a signer.” CTA state is Connect signer only when signer is the active blocker.

Loading state:
“Connecting signer…” with account placeholder. The claim booth remains visible behind it. No full-screen wallet dashboard.

Empty state:
No wallet/provider detected: show Use client-side testnet signer if implemented, or Read receipt without wallet if receipt exists. Do not imply success without signer.

Error state:
Wallet unavailable, wrong network, rejected connection, or account not funded. Recovery actions: Try again, Use client signer, Open read-only receipt, Copy diagnostic. Claim remains unsubmitted.

Success state:
Account visible: G...ABCD, Stellar testnet label, signer ready. Claim CTA advances to Sign claim.

Keyboard/touch:
Escape closes optional signer drawer but does not clear selected input. Focus returns to Connect signer. Touch signer options are large single rows, not tiny wallet icons.

Accessibility:
Signer status has role="status". Full address is available through a copy button and screen-reader label, while visual text is truncated.

State transition:
wallet.disconnected -> wallet.connecting -> wallet.connected; claimAttempt.created -> claimAttempt.walletBound

Result/shareable artifact:
No receipt yet. Visible proof is account binding.

Test selectors:
data-wallet-state, data-connect-signer, data-client-signer-option, data-wallet-address, data-network-label, data-wallet-error, data-copy-wallet, data-cta-primary.

P0 Screen C — Sign, proof, transaction pending

Route: same route, inline result state within /campaigns/zk-builder-microgrant

Purpose: make the load-bearing ZK/Web3 path visible without turning it into the hero.

Default state:
After signer is connected, CTA is Sign claim. The state rail lists:

Signature

Private proof

Stellar transaction

Receipt

Loading state:
After signature approval:

Signature row: approved.

Proof row: “Generating proof…”

Transaction row: waiting.

Receipt row: waiting.

After proof:

Proof row: accepted or rejected.

Transaction row: “Submitting to Stellar testnet…”

While polling:

Transaction row: pending with tx hash/operation ID if already known.

Receipt row: “Receipt unlocks after confirmation.”

Empty state:
No selected input or no wallet: state rail points back to the missing step with a focused action. No disabled dead state.

Error state:
Signature rejected: “Signature rejected; no claim was submitted.”
Proof unavailable: “Proof unavailable; no paid receipt can be created.”
Tx failed: “Stellar transaction failed; receipt remains unpaid.”
RPC timeout: “Transaction pending; keep this receipt pending until chain state resolves.”

Success state:
Valid proof + confirmed tx/contract state creates receipt. Invalid proof creates rejected receipt. Duplicate nullifier creates already-claimed receipt.

Keyboard/touch:
The pending rail is readable without hover. Retry buttons are focusable. Repeated pressing of CTA after submission does not double-submit; it changes to Claim pending.

Accessibility:
Use aria-live="assertive" only for terminal states: accepted, rejected, already claimed, failed. Pending updates remain polite.

State transition:
signature.requested -> signature.approved/rejected; proof.notStarted -> proof.generating -> proof.accepted/rejected/unavailable; tx.notSubmitted -> tx.pending -> tx.confirmed/failed; claim.status -> accepted/rejected/already_claimed/failed.

Result/shareable artifact:
Terminal states create or resolve to a receipt object. Pending state may create a pending receipt only if clearly labeled pending and never paid.

Test selectors:
data-signature-state, data-proof-state, data-proof-duration, data-tx-state, data-tx-reference, data-claim-status, data-retry-claim, data-cancel-or-back, data-copy-diagnostic.

P0 Screen D — Accepted / paid receipt

Route: /campaigns/zk-builder-microgrant result panel and /receipts/[receiptId]

Purpose: deliver the hero artifact.

Default state:
High-contrast receipt dominates the screen. Status line: PAID / ACCEPTED. It includes campaign name, reward label, claimant wallet, receipt ID, timestamp, nullifier short form, proof policy version, and Stellar tx/contract badge. The primary next-step CTA is Inspect receipt with data-next-step-cta; Copy receipt link is secondary.

Loading state:
If receipt metadata is saved but chain inspection is still resolving: status remains PENDING, not paid. Copy: “Waiting for Stellar confirmation.”

Empty state:
No receipt ID: “No receipt exists for this claim.” Action: Return to campaign.

Error state:
Receipt metadata saved but tx/contract reference missing: receipt status is FAILED or DEGRADED, not paid. Action: Copy diagnostic and Retry claim only if safe.

Success state:
Receipt is reopenable by URL. It shows the result before proof details. Proof and Stellar inspection are available but visually secondary.

Keyboard/touch:
Receipt actions appear after the receipt content in tab order: Inspect receipt, Copy link, Claim again with same input for duplicate demo. Touch receipt is vertically stacked on mobile.

Accessibility:
Receipt has a labeled region: GrantDrop receipt, status paid accepted. Status uses text, icon shape, and layout, not color alone.

State transition:
tx.confirmed -> receipt.created -> receipt.reopenable

Result/shareable artifact:
GrantDrop receipt URL and optional receipt card/screenshot.

Test selectors:
data-receipt-card, data-receipt-status, data-receipt-id, data-receipt-campaign, data-receipt-wallet, data-receipt-nullifier, data-receipt-timestamp, data-stellar-ref, data-next-step-cta, data-copy-receipt-link.

P0 Screen E — Rejected receipt state

Route: /campaigns/zk-builder-microgrant result panel and /receipts/[receiptId] if persisted

Purpose: show invalid input honestly without leaking private input.

Default state:
Receipt-style card says REJECTED. Copy: “This proof did not satisfy the campaign rule.” It does not reveal whether the user was close, what the valid secret is, or any private witness data.

Loading state:
Same pending rail as Screen C until proof rejection resolves.

Empty state:
If rejection has no persisted receipt, show inline rejected claim state and keep Change input available. Persisting rejected receipts is preferable for inspection, but rejection must never masquerade as paid.

Error state:
If proof service fails rather than rejects, copy says Proof unavailable, not Rejected. Recovery: retry later or copy diagnostic.

Success state:
Rejected state is inspectable enough to prove it was rejected by the path, but there is no tx/paid badge unless the contract records rejected state. If no chain record for rejected attempts exists, label inspection as “local proof rejection; no paid transaction.”

Keyboard/touch:
Focus moves to the rejected status and then to Change input. Touch target for Change input is primary recovery action.

Accessibility:
Rejected status is announced. The explanation avoids color-only red language.

State transition:
proof.generating -> proof.rejected -> claim.status.rejected

Result/shareable artifact:
Rejected receipt or rejected claim state. Share is optional; inspect is available if persisted.

Test selectors:
data-receipt-status="rejected", data-rejection-reason, data-change-input, data-proof-state, data-inspect-receipt.

P0 Screen F — Already-claimed receipt state

Route: /campaigns/zk-builder-microgrant result panel and /receipts/[receiptId]

Purpose: prove duplicate prevention.

Default state:
Receipt-style card says ALREADY CLAIMED. It shows “This private eligibility already claimed this campaign” and a prior receipt reference. It does not display the raw secret. The card can animate a single shake on entry, then settle for readability.

Loading state:
After reusing the same valid input: proof may succeed but duplicate/nullifier check is pending. State rail shows proof accepted, duplicate check pending, receipt pending.

Empty state:
If no prior receipt can be found for a duplicate nullifier, show Already claimed — prior receipt unavailable and copy diagnostic. Do not create a second paid receipt.

Error state:
Duplicate lookup unavailable: show Duplicate check unavailable; claim not paid. Do not allow success without duplicate check.

Success state:
Duplicate blocked and prior receipt link available. This is a terminal success for P0 duplicate prevention.

Keyboard/touch:
Focus moves to Open prior receipt after status. Change input remains available. No hover-only prior link.

Accessibility:
Shake motion disabled for reduced motion; use text announcement: “Already claimed. Prior receipt link available.”

State transition:
proof.accepted -> duplicateCheck.pending -> claim.status.already_claimed -> priorReceipt.linked

Result/shareable artifact:
Already-claimed receipt with prior receipt link.

Test selectors:
data-receipt-status="already_claimed", data-duplicate-state, data-prior-receipt-link, data-nullifier, data-change-input.

P0 Screen G — Public receipt replay

Route: /receipts/[receiptId]

Purpose: let anyone reopen a receipt without wallet.

Default state:
Receipt loads with public evidence summary. Wallet strip is absent or says “Read-only receipt; no signer required.” The receipt is the page hero.

Loading state:
Skeleton receipt with status placeholder and “Loading receipt evidence…”

Empty state:
Receipt not found: “Receipt not found or removed from off-chain display.” Next action: Return to campaign. Mention immutable chain refs only if a tx/contract ref is supplied.

Error state:
Receipt store unavailable: “Receipt temporarily unavailable.” Actions: Retry, Copy diagnostic if claim ID exists. No fake receipt.

Success state:
Receipt found. It can be inspected without wallet. This is the only valid no-wallet exception.

Keyboard/touch:
On mobile, receipt appears before details. QR-opened receipt must show status, campaign, and Stellar reference above the fold.

Accessibility:
Receipt route starts with h1 status and campaign. Copy link button announces copied state.

State transition:
receipt.loading -> receipt.found/notFound/degraded

Result/shareable artifact:
Public receipt URL.

Test selectors:
data-receipt-page, data-readonly-receipt, data-receipt-status, data-wallet-not-required, data-copy-receipt-link, data-receipt-not-found.

P0 Screen H — Inspect receipt

Route: /receipts/[receiptId]#inspect or inline disclosure on receipt route

Purpose: expose proof/Stellar evidence after the receipt.

Default state:
Collapsed section under the receipt: Inspect receipt. It previews three proof points: nullifier, proof policy, Stellar reference.

Loading state:
When expanded, chain details may load separately. Show independent rows: proof metadata loaded, public inputs loaded, Stellar reference loading.

Empty state:
If a proof reference or public input is absent on a non-paid receipt, say exactly what is absent. For paid receipts, absence of proof/tx reference is a blocking error.

Error state:
Contract inspection unavailable: show stored tx/contract reference, “Live inspection unavailable,” README command, and copy diagnostic. Accepted status can remain only if stored tx/contract ref exists.

Success state:
The inspector sees:

receipt ID

status

campaign ID

proof policy version

public inputs

nullifier

claimant wallet/signing identity

tx hash or contract-state reference

README command path

Keyboard/touch:
Disclosure opens with Enter/Space. Copy command button is focusable and large enough for touch. Long hashes wrap, not overflow.

Accessibility:
Use definition-list semantics for proof fields. Copy buttons have unique labels: “Copy nullifier,” “Copy Stellar reference,” “Copy inspection command.”

State transition:
inspection.collapsed -> inspection.loading -> inspection.ready/degraded

Result/shareable artifact:
Inspection state is not the hero artifact; it supports the receipt.

Test selectors:
data-inspect-receipt, data-inspection-panel, data-public-inputs, data-proof-policy-version, data-nullifier, data-stellar-ref, data-readme-command, data-copy-command, data-inspection-error.

Six-Month Product Interaction Contract

Month-1 return user:
A claimant returns to reopen or share a receipt. A small campaign operator returns to inspect accepted, rejected, and already-claimed states from the first campaign and run one similar proof-gated drop. 

01-best-prd-response

Month-6 return user:
A community, DAO, event organizer, creator, wallet team, or grant program returns to run recurring proof-gated reward campaigns. Claimants return to reuse a wallet/signer and receipt history across campaigns. 

01-best-prd-response

Recurring trigger:
A campaign link says: “Claim this grant/reward/perk without exposing why you qualify.” This should feel like a reward access moment, not a compliance chore.

Owned object/workspace:
P0 owned object is the wallet-bound receipt plus fixed campaign policy. Month-6 owned workspace becomes a campaign workspace with policy, budget metadata, status, and receipt list. P0 must not expose this as an admin dashboard.

Primary success path:
Open campaign → choose private input → connect signer → sign claim → generate proof → submit transaction → receive receipt → inspect proof/Stellar reference.

Roles/permissions:
Claimant signs and views their receipt. Public inspector views receipt evidence without wallet. Campaign operator inspects receipts and campaign metadata, but P0 does not include campaign editing. Maintainer can support deployment but cannot manually mark claims paid. 

01-best-prd-response

Persistence/history:
Persist campaign metadata, claim attempt state, receipt ID, status, public inputs, proof reference, nullifier, wallet address, timestamp, and tx/contract reference. Never persist raw private input, witness, or eligibility secret. Receipts reopen by ID. 

01-best-prd-response

Failure/recovery:
Wallet missing shows signer required. Invalid proof shows rejected and lets the user change input. Duplicate nullifier shows already claimed and links prior receipt. Pending transaction stays pending until resolved. Failed transaction never becomes paid. Proof/verifier unavailable shows degraded/unavailable. 

01-best-prd-response

Reliability/support behavior:
Receipt replay must favor correctness over availability. The UI exposes Copy diagnostic with redacted claim ID, wallet public address, status, proof state, and tx/contract reference when available. Support path is README troubleshooting and reproducible GitHub Issue, not private builder intervention.

Privacy/abuse/cost guardrails visible in UI:
Campaign rule card states: “One claim per private eligibility.” Footer badges: Testnet, Unaudited prototype, No custody, No KYC, Private input not stored. Proof input size capped in field helper text. Rate-limit errors say when retry is allowed. Demo signer, if present, is labeled testnet-only and still requires visible signing.

Mobile public first-run:
Mobile opens on the campaign claim booth with hero text, sample input chips, and Claim grant above the fold. Receipt view has status, campaign, and Stellar badge above proof details. QR receipt opens directly to /receipts/[receiptId] in read-only mode.

Desktop return-user path:
Desktop uses a two-column composition: campaign/action left, receipt/evidence right. Returning users with a receipt link land directly on the receipt, with Inspect receipt and Copy link visible without scrolling.

Settings/account/limits surface:
No P0 account/settings page. Reason: P0 identity is wallet/signer plus receipt URL; campaign is fixed; adding settings would create an admin/product surface that the PRD explicitly cuts. Limits are surfaced inline on the campaign and receipt: one-claim rule, testnet scope, unaudited prototype, rate limits, and no-custody/no-KYC disclaimers.

Demo choreography

Judge input:
The judge controls the private input. Three demo actions are shown:

Valid input → accepted/paid receipt.

Same valid input again → already claimed with prior receipt link.

Invalid input → rejected.

Live consequence:
Each input changes visible state. Valid flips receipt to paid only after Stellar reference exists. Duplicate blocks with prior receipt. Invalid rejects and keeps recovery action available. This matches the demo spine: proof-gated microgrant claim, claimant role, dominant Claim grant action, GrantDrop receipt artifact, and inspection path. 

demo_interaction_plan

Result/shareable artifact:
The big-screen success frame is a high-contrast receipt with:

campaign name

status

wallet

receipt ID

nullifier

timestamp

Stellar tx/contract reference

Inspect receipt next-step CTA

Recovery behavior:
Wallet missing: signer required.
Signature rejected: no claim submitted.
Proof failure: rejected or proof unavailable; no paid state.
Duplicate: already claimed; prior receipt link.
Tx pending: pending receipt only.
Tx failed: failed receipt; no paid state.
Inspection degraded: stored tx/contract ref remains visible with command path if available.

Big-screen staging:
Use a claim-booth layout, not a dashboard. Left: private input and signer. Center: grant box. Right: receipt frame. The five-second replay clip is: private eligibility card enters grant box → proof seal appears → receipt flips to paid → Stellar badge appears → duplicate card shakes and settles as already claimed.

Mobile QR behavior:
Demo screen shows a QR code only after the receipt exists. QR opens /receipts/[receiptId] in no-wallet read-only mode. The mobile receipt must show status, campaign, and Stellar reference before proof details. If the receipt is pending, QR opens pending, not paid.

Web3 / ZK / chain interaction contract

Wallet connect:
Claiming requires Stellar wallet or client-side signer. The signer strip shows disconnected, connecting, connected, wrong network, rejected, or unavailable. Read-only receipt replay does not require wallet.

Account visible:
Connected account appears before signing as truncated public address plus copy button. The network label says Stellar testnet or explicit degraded/local mode if applicable.

Sign/approve state:
The user sees a signature request state before proof/transaction submission. If signature is rejected, no proof/transaction success is implied.

Proof pending state:
After signing, proof state shows:
not started -> generating witness/proof -> submitted/verified -> accepted/rejected/unavailable.

Transaction pending state:
After proof acceptance, transaction state shows:
not submitted -> submitted -> pending -> confirmed/failed.
No paid receipt appears before confirmed tx or contract-state reference exists.

Confirmed result:
Confirmed valid claim produces receipt status PAID / ACCEPTED with tx/contract reference. Invalid proof produces REJECTED. Reused nullifier produces ALREADY CLAIMED with prior receipt link.

Failed/rejected transaction recovery:
Rejected signature: reconnect/retry sign.
Proof unavailable: retry proof, copy diagnostic.
Tx failed: retry claim if safe, or copy diagnostic.
Pending timeout: keep pending; never convert to paid.
Duplicate: open prior receipt or change input.

Public inspection path:
Receipt → Inspect receipt → nullifier/public inputs/proof policy → Stellar tx or contract-state reference → README command. The PRD defines this path as the public inspection path. 

01-best-prd-response

No-wallet exception:
Valid only for read-only receipt replay and public inspection. Claiming is not verifier-only, not read-only, and not server-issued; therefore successful claim requires wallet/client signer, signature, proof, transaction/contract state, and public receipt. 

01-best-prd-response

Implementation-facing UI notes

Components:
CampaignClaimBooth, PrivateInputSelector, MaskedEligibilityInput, SignerStrip, ClaimStateRail, ProofStateRow, TransactionStateRow, ReceiptCard, ReceiptStatusBadge, StellarReferenceBadge, NullifierField, InspectReceiptPanel, CommandCopyBlock, RecoveryBanner, DiagnosticBundleButton, MobileReceiptQR, ReducedMotionReceiptFlip.

Data/API dependencies:
Campaign lookup, campaign proof policy lookup, claim attempt create, signer account binding, proof generation/submission, claim transaction submission, status polling, duplicate/nullifier lookup, receipt create/update, receipt lookup, inspection metadata lookup, diagnostic bundle generation.

Storage/state dependencies:
Persist campaign metadata, claim attempt ID, claim status, wallet address, proof policy version, public inputs, proof reference, nullifier, tx/contract reference, receipt ID, timestamp, prior receipt reference for duplicates, and diagnostic error class. Do not persist private input, witness, or raw eligibility secret.

External integrations:
Stellar testnet signer/client signer, Soroban campaign/claim contract, Stellar tx/contract-state inspection path, Circom/Groth16/snarkjs proof artifacts, README command path. Public proof surface must be visible in app/video/README; fake tx/hash/proof is blocked by the Web3 build rules. 

02-stack-and-build

Playwright coverage:

campaign loads with data-hero-text and one data-cta-primary

valid input creates accepted receipt only after tx/contract ref

invalid input creates rejected state and no paid label

repeated valid input creates already-claimed state and prior receipt link

no wallet blocks claim but allows read-only receipt

signature rejection creates no claim success

tx pending does not show paid

tx failed shows failed and copy diagnostic

receipt reopens without wallet

inspection panel exposes nullifier, public inputs, proof policy, Stellar ref, command

mobile receipt QR route opens receipt first, proof second

keyboard tab order reaches input, signer, CTA, receipt, inspect

reduced-motion disables receipt flip/shake but keeps status text

2. Traceability
P0 interaction traceability matrix
P0 interaction	PRD requirement served	State evidence	Proof evidence	Recovery evidence	Test evidence	Flag
Open campaign claim booth	P0-1 proof-gated claim; public first-run path	campaign.loaded, campaign.ready	Campaign ID, policy version	Campaign unavailable state	Campaign smoke test	PASS
Select private input	Input mutation: valid/invalid/duplicate change result	input.selected	Private input never persisted; public nullifier later	Change input after rejection/duplicate	Valid/invalid/duplicate selector tests	PASS
Connect wallet/client signer	Wallet playability contract	wallet.connected, claimAttempt.walletBound	Public wallet address shown	Wallet unavailable/rejected/wrong network	Cannot submit without signer	PASS
Sign claim	Successful claim requires visible signature	signature.requested/approved/rejected	Signature state shown in rail	Rejected signature returns to signer step	Signature rejection test	PASS
Generate proof	ZK must be load-bearing	proof.generating/accepted/rejected/unavailable	Proof/public inputs/proof policy after receipt	Proof unavailable/rejected states	Valid proof succeeds; invalid rejects	PASS
Submit Stellar transaction	Stellar consequence required	tx.pending/confirmed/failed	tx/contract ref	Pending/failed never paid	Paid assertion requires tx ref	PASS
Accepted receipt	P0-3 Stellar-visible receipt	receipt.created, claim.status=accepted	nullifier, wallet, proof ref, tx/contract ref	Degraded if inspection unavailable	Receipt has required fields	PASS
Rejected result	Invalid claim rejection	claim.status=rejected	proof rejection class; no paid tx	Change input, retry	Invalid input rejects	PASS
Duplicate claim block	P0-2 duplicate prevention	claim.status=already_claimed, priorReceipt.linked	nullifier match, prior receipt	Open prior receipt/change input	Same input cannot create second paid receipt	PASS
Public receipt replay	P0-3 reopen/share/inspect	receipt.found/notFound/degraded	receipt evidence visible	not found/degraded states	Receipt reopens without wallet	PASS
Inspect receipt	Public proof/Stellar inspection path	inspection.expanded/ready/degraded	public inputs, nullifier, policy, tx/ref, command	live inspection degraded with stored ref	Inspect fields + command copy test	PASS
Copy diagnostic	Honest support/recovery	diagnostic.created	redacted claim ID + tx/ref if available	supports wallet/proof/tx/storage errors	Diagnostic content redaction test	PASS
PRD P0 guarantee mapping

P0-1 Proof-gated claim:
Served by campaign claim booth, private input selector, signer step, sign claim, proof generation, rejected state, accepted receipt. The PRD requires one campaign, signer, hidden eligibility input, ZK proof, claim transaction, accepted/rejected result, and visible mutation when input changes. 

01-best-prd-response

P0-2 Duplicate-claim prevention:
Served by repeated valid-input flow, nullifier duplicate check, already-claimed receipt, and prior receipt link. The PRD requires duplicate nullifier state to be blocked, persisted, and linked without revealing private input. 

01-best-prd-response

P0-3 Stellar-visible receipt and inspection:
Served by accepted receipt, public receipt replay, inspect receipt, Stellar reference badge, command copy, and no-wallet read-only replay. The PRD requires receipt ID, campaign, status, nullifier, tx/contract reference, timestamp, reopenability, and no paid label before proof/state/transaction evidence. 

01-best-prd-response

Missing evidence flags

No P0 interaction in this UIUX plan lacks state, proof, recovery, or test evidence.

Web3 gate: wallet connect/client signer, account visibility, signature request, proof pending, transaction pending, confirmed result, failed/rejected recovery, duplicate block, and public inspection path are present.

No-wallet exception: present and limited to read-only receipt replay/inspection.

Coding gate: do not start implementation until this UIUX response is saved as the separate UIUX spec and the local agent distills the PRD/UIUX outputs into pitch/project_prd.md, pitch/uiux_interaction_plan.md, and/or BUILD.md as required by the selected full path.