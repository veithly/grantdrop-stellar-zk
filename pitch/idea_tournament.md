# Idea Tournament: Stellar Hacks Real-World ZK

## Inputs

- R0 research: `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`
- I1 playable front stage: `pitch/gpt-pro/responses/ideation/01-playable-front-stage-response.md`
- I2 demand/money/sponsor: `pitch/gpt-pro/responses/ideation/02-demand-money-sponsor-response.md`
- I3 weird/buildable wow: `pitch/gpt-pro/responses/ideation/03-weird-buildable-wow-response.md`

## Required Construct Constraint

Every candidate must make zero-knowledge load-bearing and Stellar-visible. The proof cannot be only a backend receipt; it must change payout, access, score, claim, booking, or settlement state.

Required construct primer:

- Required construct: zero-knowledge technology integrated with Stellar.
- What counts: a hidden user condition is validated through a ZK path and changes a Stellar-visible payout, access, score, claim, booking, or settlement result.
- What does not count: proof logs, static hashes, local-only verifier demos, README-only ZK, or Stellar branding with no state consequence.
- Demo proof: in the first minute, the judge changes an input, triggers a claim/settlement/post/unlock, and can inspect the Stellar result path.
- Binding constraint: the user-visible result comes first; verification details are inspection evidence.

## Current Concept Context For Judging

- User: a person claiming, settling, unlocking, bidding, posting, or redeeming a result based on a private condition.
- Current pull: people want privacy without losing access to payouts, rewards, bookings, bids, and reputation.
- One action: change one private input and submit a wallet-backed claim or settlement.
- Before -> after: pending result becomes accepted/rejected/settled/posted based on the hidden condition.
- Result artifact: payout receipt, access pass, score card, sealed bid receipt, fan reward, or remittance slip.
- Sponsor primitive: Stellar/Soroban result state or transaction path.
- Cuts: no generic verifier dashboard; no production privacy-pool claim; no regulated partner dependency for P0.
- Mutation that makes it not boring: start with the human result and make the proof/verifier visible only as the reason the result can be trusted.

## Candidate Pool

| ID | Source | Rumor | Front-stage action | Artifact | Score | Local note |
| --- | --- | --- | --- | --- | --- | --- |
| I1-PFS-01 | I1 | Audience votes privately; money visibly moves onchain. | private vote + claim | round/pot receipt | 15/16 | Strong demo, risks looking like anonymous voting. |
| I1-PFS-02 | I1 | Your best game score becomes a proof. | play 10-second challenge | proof-backed score card | 15/16 | Very playable, but less real-world money unless bounty payout is central. |
| I1-PFS-03 | I1 | Secret bids win tickets without revealing budgets. | submit sealed bid | winning bid receipt | 15/16 | Strong buyer/seller scene, build risk around fair settlement. |
| I1-PFS-04 | I1 | Unlock age-gated perks without showing identity. | prove eligibility | minted pass/coupon | 15/16 | Clear, but common eligibility lane. |
| I1-PFS-05 | I1 | Private travel reputation opens doors, not profiles. | request booking | booking/escrow receipt | 15/16 | Human-close, partner assumptions if overclaimed. |
| I1-PFS-06 | I1 | Family remittances prove arrival without exposing amounts. | send/redeem remittance receipt | amount-band receipt | 15/16 | Strong Stellar real-money fit; needs tight P0 cut. |
| I1-PFS-07 | I1 | Tip pools prove fairness without exposing wages. | split payout | fair split receipt | 15/16 | Good payment scene, payroll claims must stay demo-scope. |
| HH-ZK-01 GrantDrop | I2 | Grants pay humans without seeing their secrets. | claim grant | proof-backed payout receipt | 16/16 | Best demand score; risk is becoming grant compliance dashboard. |
| HH-ZK-02 RemitSlip | I2 | Cash reaches family without exposing the route. | send/redeem private voucher | private remittance slip | 15/16 | Best sponsor-native real-world payment lane. |
| HH-ZK-03 ProofTip | I2 | Creators get paid after private proof wins. | release tip after proof | creator tip receipt | 15/16 | Strong creator/money pull; proof source must be concrete. |
| HH-ZK-04 StayPass | I2 | Book safely without showing your whole identity. | request booking | stay pass/escrow | 15/16 | Good user empathy; regulated identity risk. |
| HH-ZK-05 RedactPay | I2 | Invoices settle while rates stay privately provable. | settle invoice | redacted invoice receipt | 15/16 | B2B useful, may be less judge-playable. |
| HH-ZK-06 SealSponsor | I2 | Sponsors fund winners without revealing losing bids. | bid/fund campaign | sealed winner receipt | 15/16 | Strong auction mechanics; setup complexity. |
| HH-ZK-07 FanMint | I2 | Real fans unlock rewards without doxxing themselves. | claim fan reward | fan reward pass | 16/16 | Highly accessible, but must avoid generic loyalty. |
| I3-WOW-01 Ghost Race Bounty | I3 | People race ghosts, cheaters cannot cash out. | play challenge | race bounty score card | 15/16 | Best replay clip, weaker real-world ZK theme. |
| I3-WOW-02 Masked Bid Market | I3 | Bidders wear masks, sellers still get paid. | masked bid | settlement receipt | 16/16 | Strong wow and money path, buildable if narrowed. |
| I3-WOW-03 Whisper Coupon Booth | I3 | Coupons whisper prices without exposing your wallet. | claim private offer | coupon receipt | 15/16 | Consumer-friendly, lighter Stellar depth. |
| I3-WOW-04 Secret Split Pot | I3 | Friends split bills without revealing private budgets. | split bill | split settlement receipt | 15/16 | Familiar, but not as Stellar-specific. |
| I3-WOW-05 Masked Applause Payout | I3 | Crowds cheer anonymously, winners still receive money. | clap/tip privately | payout round card | 16/16 | Memorable public demo, risk of anonymous-vote clone. |
| I3-WOW-06 Redacted Door Booking | I3 | Doors unlock trust without copying your passport. | book with proof | booking pass | 15/16 | Clear, but identity/KYC scope risk. |

## Diversity Matrix

winner slot fit: all shortlisted candidates are evaluated against the G0 phrase "hidden condition, public Stellar result."

Candidate Diversity Matrix: this table intentionally covers playable, demand, wow, money, and sponsor-native lanes.

| Lane | Candidate IDs |
| --- | --- |
| Playable front stage | I1-PFS-02, I3-WOW-01, I3-WOW-05 |
| Demand but not boring | HH-ZK-01, HH-ZK-02, HH-ZK-03, HH-ZK-07 |
| Weird/buildable wow | I3-WOW-02, I3-WOW-05, I1-PFS-03 |
| Money/value upside | HH-ZK-01, HH-ZK-02, HH-ZK-03, I3-WOW-02 |
| Sponsor-native/wallet-native | HH-ZK-02, I1-PFS-06, I3-WOW-02, HH-ZK-01 |

## Local Rejections Before Judging

- Reject pure eligibility/pass candidates unless judges say otherwise: they are clear but crowded.
- Reject B2B invoice/payroll surfaces as primary if first action becomes an approval dashboard.
- Reject full shielded-wallet or production privacy-pool ambition for P0; too much audited-security surface for this timeline.
- Reject any candidate whose P0 requires real regulated partners, real KYC, custody, or production private payments.

## Shortlist For J1-J3

| Short ID | Candidate | Why it survives |
| --- | --- | --- |
| S1 | HH-ZK-02 / I1-PFS-06 RemitSlip | Strongest Stellar real-world money fit: private remittance voucher, amount-band receipt, sender/recipient roleplay. |
| S2 | I3-WOW-02 / I1-PFS-03 Masked Bid Market | Strongest private terms + public settlement artifact, clear judge input mutation. |
| S3 | HH-ZK-01 GrantDrop | Best buyer/budget signal: grant/airdrop payout protected by private eligibility proof. |
| S4 | I3-WOW-01 / I1-PFS-02 Ghost Race Bounty | Best replayable clip and anti-cheat proof, strongest judge playability. |
| S5 | HH-ZK-07 FanMint | Best consumer reward/access lane, easy first-screen hook. |
| S6 | HH-ZK-03 ProofTip | Strong creator/economy angle with proof-gated payout. |

## Judge Magnet Precheck

- Judge first action <=30s: all shortlisted candidates have one.
- 5-second replayable clip: all shortlisted candidates have one.
- Input mutation: all shortlisted candidates change result when proof input, threshold, bid, score, or claim changes.
- Share/replay artifact: all shortlisted candidates emit a receipt, score card, pass, or payout record.
- Boring clone named: all shortlisted candidates name a dashboard/proof-log clone to avoid.
- Anti-boring mutation: all shortlisted candidates must move the result to the first screen and put proof details backstage.
- Required mutation: all shortlisted candidates must move the result to the first screen and put proof details backstage.
- Wallet path: all shortlisted candidates require wallet/sign/transaction or an explicitly scoped demo signer path.

## Local Concerns To Ask Judges

- Which candidate best fits "real-world ZK on Stellar" rather than general ZK?
- Which P0 can be implemented honestly with current tooling and deadline?
- Which candidate has the strongest first 10 seconds for a non-domain judge?
- Which candidate is least likely to collapse into proof dashboard or local-only verifier?

## Next Step

J1-J3 judging completed:

- J1 sponsor/rubric lens picked S1 RemitSlip, with S2 as backup.
- J2 product-magnet lens picked S2 Masked Bid Market, with S4 as backup.
- J3 build-risk lens picked S3 GrantDrop, with S5 as backup.

Local reconciliation selected S3 GrantDrop because it is the safest honest build while preserving the hidden-condition-to-public-Stellar-result winner slot. The lock is recorded in `pitch/concept_lock.md`, with `pitch/demo_interaction_plan.md` and `pitch/user_cases.md` defining the first-screen action, 5-second clip, wallet path, and failure states.
