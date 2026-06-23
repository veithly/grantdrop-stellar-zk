# GrantDrop UIUX Interaction Plan

## Screen Map

| Route | Screen | Primary user action | System response | State changed | Proof shown |
| --- | --- | --- | --- | --- | --- |
| `/campaigns/zk-builder-microgrant` | Grant claim booth | Choose private input and Claim grant | creates claim attempt and signer/proof/tx rail | campaign ready -> claim pending | campaign policy and proof version |
| `/campaigns/zk-builder-microgrant` | Sign/proof/tx rail | Sign claim | generates proof and submits Stellar transaction/state | proof pending -> tx pending | proof state and tx state |
| `/campaigns/zk-builder-microgrant` | Receipt result | Inspect receipt | opens proof/Stellar evidence | accepted/rejected/already claimed | receipt, nullifier, Stellar ref |
| `/receipts/[receiptId]` | Public receipt replay | View receipt | loads receipt without wallet | receipt loading -> found | public evidence summary |
| `/receipts/[receiptId]#inspect` | Inspect receipt | Expand evidence | shows public inputs, nullifier, command | inspection collapsed -> ready | proof policy and tx/contract ref |

## First-Run Flow

- 0-10s: show campaign, input chips, signer strip, empty receipt frame, and `Claim grant` as the only dominant CTA.
- 10-30s: judge selects valid/invalid/reuse input, connects signer, and starts claim.
- 30-60s: proof, transaction, and receipt rail advances; result flips accepted, rejected, or already claimed.
- 2-3min: inspect receipt, copy command/path, replay duplicate.
- 5min/Q&A: show wallet rejection, invalid proof, pending tx, failed tx, duplicate, and no-wallet receipt replay.

## Interaction Details

### Campaign claim booth

- Default state: campaign title, one-claim rule, proof policy version, input chips, signer strip, receipt preview.
- Loading state: skeleton preserves booth layout with "Opening campaign policy..."
- Empty state: campaign unavailable with Retry and Open saved receipt if a receipt link exists.
- Error state: claim unavailable; no receipt can be marked paid.
- Success state: claim attempt created and passed to signer/proof/tx rail.
- Keyboard/touch behavior: tab order reaches input chips, masked input, signer, CTA, state rail, receipt; touch targets >=44px.
- Accessibility note: aria-live status region and text-first status labels.
- State transition: campaign.loading -> campaign.ready -> input.selected -> claimAttempt.created.
- Result/shareable artifact: future receipt frame, not yet paid.
- Test selectors: `data-hero-text`, `data-campaign-id`, `data-input-chip-valid`, `data-input-chip-invalid`, `data-input-chip-reuse`, `data-cta-primary`.

### Wallet / client signer

- Default state: signer required for claim; receipt replay is public.
- Loading state: connecting signer.
- Empty state: no wallet/provider; show client-side testnet signer fallback if implemented.
- Error state: rejected connection, wrong network, or unfunded account.
- Success state: truncated account and Stellar testnet label visible.
- State transition: wallet.disconnected -> wallet.connected -> claimAttempt.walletBound.
- Test selectors: `data-wallet-state`, `data-connect-signer`, `data-wallet-address`, `data-network-label`.

### Sign, proof, transaction pending

- Default state: `Sign claim`.
- Loading state: signature approved -> proof generating -> transaction pending -> receipt waiting.
- Empty state: missing input or wallet points back to missing step.
- Error state: signature rejected, proof unavailable, tx failed, RPC timeout.
- Success state: terminal accepted/rejected/already-claimed result.
- State transition: signature.requested -> proof.generating -> tx.pending -> claim.status.
- Test selectors: `data-signature-state`, `data-proof-state`, `data-tx-state`, `data-claim-status`.

### Receipt result

- Default state: high-contrast receipt with campaign, status, wallet, receipt ID, timestamp, nullifier, proof policy, Stellar badge.
- Loading state: pending receipt remains pending until Stellar confirmation.
- Empty state: no receipt exists; return to campaign.
- Error state: missing tx/contract reference creates failed/degraded state, not paid.
- Success state: receipt is reopenable by URL.
- State transition: tx.confirmed -> receipt.created -> receipt.reopenable.
- Test selectors: `data-receipt-card`, `data-receipt-status`, `data-receipt-id`, `data-stellar-ref`, `data-next-step-cta`.

### Rejected and already-claimed states

- Default state: rejected says "This proof did not satisfy the campaign rule"; already-claimed links prior receipt.
- Loading state: duplicate check pending after proof accepted.
- Error state: duplicate lookup unavailable blocks paid state.
- Success state: rejected or already-claimed receipt-style card is visible.
- State transition: proof.rejected -> rejected; proof.accepted -> duplicateCheck.pending -> already_claimed.
- Test selectors: `data-receipt-status`, `data-rejection-reason`, `data-prior-receipt-link`, `data-nullifier`.

### Public receipt replay and inspection

- Default state: receipt loads without wallet; Inspect receipt disclosure is secondary.
- Loading state: skeleton receipt and independent proof/Stellar rows.
- Empty state: receipt not found.
- Error state: live inspection unavailable shows stored ref and command path.
- Success state: public inputs, nullifier, proof policy, Stellar ref, README command are visible.
- State transition: receipt.loading -> receipt.found -> inspection.ready.
- Test selectors: `data-readonly-receipt`, `data-inspect-receipt`, `data-public-inputs`, `data-readme-command`.

## Six-Month Product Interaction Contract

- Month-1 return user: claimant reopens and shares a receipt; operator inspects first campaign states.
- Month-6 return user: communities run recurring proof-gated drops with receipt history.
- Recurring trigger: campaign link for private grant/reward claim.
- Owned object/workspace: wallet-bound receipt and campaign policy.
- Primary success path: open campaign -> choose input -> connect signer -> sign -> proof -> tx -> receipt -> inspect.
- Roles/permissions: claimant, public inspector, campaign operator, maintainer.
- Persistence/history: receipts reopen by ID; private input and witness are never stored.
- Failure/recovery: wallet/proof/duplicate/tx/storage errors are visible with retry or diagnostic copy.
- Reliability/support behavior: correctness before speed; diagnostic bundle and README troubleshooting.
- Privacy/abuse/cost guardrails visible in UI: one-claim rule, testnet label, no custody, no KYC, private input not stored.
- Mobile public first-run: claim booth and CTA above fold; receipt status above proof details.
- Desktop return-user path: action and receipt remain visible together.
- Settings/account/limits surface: no P0 settings; limits are inline because identity is wallet plus receipt URL.

## Demo Choreography

- Judge input: valid private input, invalid private input, repeated valid input.
- Live consequence: accepted, rejected, or already-claimed receipt appears based on input.
- Proof artifact: receipt inspection reveals proof/public inputs and nullifier after the result.
- Result/shareable artifact: GrantDrop receipt URL and QR/link.
- Fallback: missing wallet, rejected signature, proof unavailable, tx pending, tx failed, duplicate, and degraded inspection never show paid success.
- Big-screen staging: private input left, grant box center, receipt frame right.
- Mobile QR behavior: QR appears only after receipt exists and opens read-only `/receipts/[receiptId]`.

## Web3/ZK/Chain Interaction Contract

- Wallet connect: Freighter or client-side signer required for claim.
- Account visible: truncated Stellar address and network label.
- Sign/approve state: signature request is visible; rejection creates no claim success.
- Transaction/proof pending state: proof generating and transaction pending are separate rows.
- Confirmed result: accepted receipt only after tx/contract reference exists.
- Failed/rejected recovery: retry, change input, open prior receipt, or copy diagnostic.
- Public inspection path: receipt -> inspect -> nullifier/public inputs/proof policy -> Stellar ref -> README command.
- No-wallet exception: read-only receipt replay and inspection only.

## Implementation Notes

- Components: CampaignClaimBooth, PrivateInputSelector, SignerStrip, ClaimStateRail, ReceiptCard, InspectReceiptPanel, DiagnosticBundleButton, MobileReceiptQR.
- Data/API dependencies: campaign lookup, claim attempt create, proof generation/submission, claim transaction submission, status polling, receipt lookup, inspection metadata, diagnostic bundle.
- Storage/state dependencies: campaigns, claim_attempts, receipts in D1; walletAddress, receiptId, campaignId, nullifier, status, proofRef, txRef.
- External integrations: Stellar testnet signer/RPC, Soroban or Stellar transaction state, snarkjs proof artifacts.
- Playwright coverage: campaign load, valid/invalid/duplicate paths, no-wallet replay, signature rejection, tx pending/failed, receipt reopen, inspection fields, mobile receipt route, keyboard order, reduced motion.

## Traceability

| P0 interaction | PRD requirement | State evidence | Proof evidence | Recovery evidence | Test evidence |
| --- | --- | --- | --- | --- | --- |
| Open campaign | REQ-001 | campaign.ready | proof policy visible | campaign unavailable | smoke test |
| Claim with valid input | REQ-001/REQ-003 | accepted receipt | proof/public inputs + Stellar ref | tx pending/failed | valid succeeds |
| Claim with invalid input | REQ-001 | rejected receipt | proof rejection class | change input | invalid rejects |
| Repeat valid input | REQ-002 | already claimed | nullifier match | open prior receipt | duplicate blocks |
| Reopen receipt | REQ-004 | receipt loaded | D1 row + Stellar ref | not found/degraded | second-context replay |
| Inspect receipt | REQ-005 | inspection ready | public inputs/nullifier/ref | command copy | field assertions |

No P0 interaction lacks state, proof, recovery, or test evidence. Coding remains blocked only until these distilled G2 artifacts and audits pass.
