# Concept Lock: GrantDrop

## Local Reconciliation

- Selected concept: S3 GrantDrop.
- Why selected over J1 RemitSlip: RemitSlip has the strongest real-world payment fit, but it carries remittance, custody, FX, and compliance overclaim risk for the deadline.
- Why selected over J2 Masked Bid Market: Masked Bid has the strongest first-10-second theater, but fair sealed-bid settlement is easier to overclaim or overscope than one proof-gated claim.
- Why selected after J3: GrantDrop scored highest on honest buildability while still matching the G0 slot: hidden condition, public Stellar result.
- Backup concept: S2 Masked Bid Market if G2 finds GrantDrop cannot avoid the eligibility/compliance surface.
- Do not reopen ideation unless: GrantDrop cannot show valid/invalid/duplicate claim differences through a Stellar-visible result.

## Concept

- Seven-word rumor: Private eligibility drops public Stellar grant receipts.
- Required construct primer: zero-knowledge technology integrated with Stellar.
  - What counts: a hidden user condition is validated through a ZK path and changes a Stellar-visible claim, payout, or receipt result.
  - What does not count: static hashes, local-only verifier screens, README-only ZK, or Stellar branding with no claim-state consequence.
  - Demo proof: in the first minute, the judge changes valid, invalid, or duplicate input and sees the Stellar-linked receipt state change.
- Current pull: people want rewards, grants, airdrops, and access without revealing the private facts that make them eligible.
- Desire / power pull: claim money or status while keeping the underlying credential private.
- Cool utility: a claimant gets a public paid receipt without exposing why they qualified.
- Tuesday pull: recurring campaigns, community grants, attendance rewards, fan perks, and one-time claims need private eligibility plus double-claim prevention.
- Public flex artifact: a GrantDrop receipt showing accepted, blocked, or already-claimed state with a Stellar tx/contract reference.
- Product thesis: GrantDrop is a reusable proof-gated distribution engine for campaigns where private eligibility should trigger public payout, access, or receipt state.
- Beachhead demo case: one microgrant campaign where a judge enters a private eligibility secret, claims once, sees the claim paid, then sees a duplicate attempt blocked.
- Three adjacent cases same engine can handle: conference attendance rewards, DAO or community grants, fan reward drops.
- Reusable agent/product engine: campaign policy, private eligibility proof, nullifier, Stellar claim state, receipt generator, replayable inspection path.
- Expansion ladder: one microgrant claim -> self-serve proof-gated campaign pages -> wallet/community distribution API.
- Why a non-domain judge personally cares: everyone understands wanting the reward without showing the private reason.
- Familiar desire/pressure hook in first 5 seconds: "Can I get paid without showing why I qualify?"
- Judge roleplay action: choose valid, invalid, or already-used eligibility input and submit a wallet-backed claim.
- Non-domain retell line: "It pays eligible people without showing why they qualify."
- Public demo hook: the same claim card flips to paid, rejected, or already claimed when the judge changes the hidden input.
- First-screen product sentence: Claim a Stellar grant receipt without exposing why you qualify.
- Why this is cool/useful: it turns privacy from a proof page into a visible payout receipt.
- Industry buyer behind it: grant programs, DAOs, event organizers, wallets, communities, and creators that distribute rewards.
- User: a claimant eligible for a grant or reward through a private credential or secret.
- 15-60s action: connect a Stellar wallet, enter the hidden eligibility input, submit the claim, and inspect the receipt.
- Judge first action <=30s: pick the valid or invalid private input and press Claim.
- Before: campaign has an unclaimed grant slot and the claimant's private condition is not public.
- After: Stellar-visible claim state records paid, rejected, or already claimed, while the private eligibility detail stays hidden.
- Inspectable/shareable result: GrantDrop receipt with claim state, nullifier, tx or contract reference, timestamp, and campaign name.
- 5-second replayable clip: the claim card drops into the grant box, flashes paid with a Stellar receipt, then a duplicate card shakes red as already claimed.
- What changes when judge changes input: valid input pays, invalid input rejects, reused input blocks as already claimed.
- Why now: Stellar's ZK-friendly primitives and Soroban state make proof-gated receipts credible inside a product flow instead of a standalone verifier.
- Required sponsor/domain primitive: Stellar/Soroban transaction or contract state records the claim result after the ZK path accepts the hidden condition.
- Web3/wallet play path if applicable: hero success requires a Stellar wallet or client signer that signs the claim transaction; read-only replay can be viewed without a wallet.
- No-wallet exception if applicable: only for read-only replay and inspection; claiming a user-owned result requires signing.
- Boring clone avoided: grant eligibility dashboard or verifier log.
- Mutation that makes it not boring: open on the grant claim and paid receipt, then put proof and contract inspection behind the receipt.
- Riskiest moment checked: J3 judged GrantDrop highest on build-risk safety; G2 must still validate exact proof and Stellar implementation choices before coding.
- Three cuts: no real KYC or compliance workflow; no multi-campaign admin dashboard; no production payment, custody, or audited privacy claim.

## Concept Lock Decision

Proceed with GrantDrop into G2 PRD/UIUX spec. The locked P0 is one campaign, one eligibility rule, one claim, one duplicate block, one Stellar-visible receipt.
