Not selecting a winner. This is an I2 candidate pool only.

Grounding: the bounty requires zero-knowledge technology integrated with Stellar, with proof generation off-chain and a Stellar/Soroban contract or Stellar integration that verifies, records, gates, settles, or inspects the result; the first minute should let a judge change an input, see Stellar-linked verification or settlement, and inspect proof/transaction/contract state. 

bounty_brief

 Stellar’s docs also frame BN254 and Poseidon/Poseidon2 as ZK building blocks, not full apps by themselves, and say developers still need higher-level proof systems plus verifier smart contracts for complete workflows. 
Stellar Developers
 I also kept the first beat away from verifier dashboards, proof packets, and operator consoles, per the Hunter candidate bar. 

01-product-discovery

Score order for every candidate: clear in 10s / cool-useful / judge can play / input changes result / owned artifact / sponsor primitive matters / buildable / wallet path.

HH-ZK-01 — GrantDrop

Candidate ID: HH-ZK-01 GrantDrop

Seven-word rumor: Grants pay humans without seeing their secrets.

User: Scholarship, aid, hackathon, open-source grant, or community fund claimant.

Buyer/budget behind it: Grant programs, foundations, hackathon sponsors, DAOs, universities, NGOs; they already have distribution budgets and want fewer duplicate/fraud claims.

Judge first action <=30s: Pick a claimant card, choose “student in Japan,” “open-source maintainer,” or “duplicate claimant,” then press Claim $25 test grant.

5-second replayable clip: The duplicate card shakes red; the eligible card emits a green “proof passed” stamp and a Stellar payout receipt.

What changes when judge input changes: Eligibility, payout tier, country/program, and duplicate nullifier change whether payout is sent, blocked, or resized.

Result artifact: Redacted grant receipt: claim tier, proof ID, nullifier, Stellar tx hash, and “paid / blocked / already claimed.”

Why a non-domain judge personally cares: Everyone understands “I deserve the grant, but I do not want to upload my whole life to another form.”

Desire / power pull: Get money or access while revealing only the minimum fact.

Tuesday pull: Claimants reuse the same private credential for recurring grants, aid windows, hackathon bounties, and community funds.

Product thesis: Proof-gated distribution for funds where the payer needs eligibility and uniqueness, not raw identity.

Beachhead demo case: Hackathon sponsor distributes testnet USDC/XLM microgrants to eligible builders, one claim per person.

Three adjacent cases: Disaster-aid stipends; scholarship tranches; open-source maintainer grants.

Reusable engine: Credential issuer adapter, policy rules, nullifier registry, proof verifier, disbursement state machine, redacted receipt generator.

Expansion ladder: Beachhead: one grant claim. Month 1: campaign pages with proof policies. Month 6: reusable proof-gated disbursement API for funders.

ZK load-bearing role: Proves eligibility and uniqueness without revealing the underlying credential; nullifier prevents double claims. No proof means no payout.

Stellar load-bearing role: Soroban verifies/records proof result and triggers/blocks payout on Stellar; borrows SDP’s durable “bulk payments to recipients over Stellar” state-object pattern. 
Stellar Developers

Wallet/sign/transaction path or valid no-wallet exception: Claimant connects Freighter or test wallet, signs claim intent, receives testnet asset payout; no no-wallet exception needed.

What judges can inspect: Public inputs, nullifier, verifier contract call, campaign contract state, tx hash, payout status.

Boring clone: Grant compliance dashboard.

Mutation that keeps it human-close: The claimant front stage is “prove I qualify, get paid,” not “admin reviews risk.”

Build-risk note: Keep issuer mocked and transparent; do not claim production KYC, anti-fraud completeness, or custody. Use testnet assets and demo credentials only.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 = 16

HH-ZK-02 — RemitSlip

Candidate ID: HH-ZK-02 RemitSlip

Seven-word rumor: Cash reaches family without exposing the route.

User: Migrant worker, family sender, gig worker, or field-aid payer sending a small remittance.

Buyer/budget behind it: Wallets, remittance apps, aid orgs, earned-wage providers, payroll platforms.

Judge first action <=30s: Type “send $20 to Ana in Mexico,” choose “urgent / cheapest / private,” then generate a private pickup voucher.

5-second replayable clip: A sealed envelope flies from sender to recipient; recipient reveals only a voucher proof; Stellar escrow flips from locked to redeemed.

What changes when judge input changes: Amount, corridor, voucher secret, expiry, or recipient credential changes quote, route, redemption status, or refund path.

Result artifact: Private remittance receipt: redacted route, proof ID, escrow tx, redeem/refund state.

Why a non-domain judge personally cares: Sending money to family is instantly legible, and nobody wants a public trail of personal support payments.

Desire / power pull: Move money privately but still prove the handoff was valid.

Tuesday pull: Recurring family support, field reimbursements, small aid transfers, and informal contractor payments.

Product thesis: Private intent + proof-gated redemption for remittances and cash-out-adjacent transfers.

Beachhead demo case: Sender locks testnet USDC; recipient proves voucher knowledge and one-time redemption; Stellar releases funds.

Three adjacent cases: Aid cash envelopes; private reimbursements; marketplace seller withdrawals.

Reusable engine: Escrow contract, voucher commitment, nullifier, corridor quote object, redemption proof, refund timer.

Expansion ladder: Beachhead: testnet private voucher. Month 1: wallet plugin for private claims. Month 6: anchor/ramp-adjacent transaction lifecycle.

ZK load-bearing role: Recipient proves possession of the redemption secret and optional eligibility credential without exposing the code or private context; nullifier blocks reuse.

Stellar load-bearing role: Stellar escrow/claimable contract holds and releases funds; the concept borrows MoneyGram Ramps’ real-world cash-in/cash-out adjacency and Anchor-style transaction lifecycle, without claiming production integration. MoneyGram Ramps enables third-party app users to cash-in and cash-out USDC on Stellar; Anchor Platform covers deposit, withdrawal, auth, KYC/AML data, quotes, and cross-border payment state patterns. 
Stellar Developers
 
Stellar Developers

Wallet/sign/transaction path or valid no-wallet exception: Sender signs Stellar escrow deposit; recipient signs redeem or uses demo-sponsored redeem transaction. No production cash pickup claim.

What judges can inspect: Escrow state, voucher commitment, nullifier, redeem tx hash, refund timer, public route metadata.

Boring clone: Remittance quote dashboard.

Mutation that keeps it human-close: “Send family money privately” is the hero; anchor/ramp states are backstage receipts.

Build-risk note: Avoid production KYC, custody, and real MoneyGram claims. Demo only uses testnet assets, mock corridor labels, and an inspectable escrow.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15

HH-ZK-03 — ProofTip

Candidate ID: HH-ZK-03 ProofTip

Seven-word rumor: Creators get paid after private proof wins.

User: Creator, tutor, open-source maintainer, freelancer, or challenge participant.

Buyer/budget behind it: Creator platforms, education marketplaces, sponsor bounty programs, devrel teams, microtask marketplaces.

Judge first action <=30s: Pick a challenge: “ship a patch,” “score 90%,” or “finish lesson”; drag threshold from 70 to 95; press Release tip.

5-second replayable clip: A locked tip jar pops open only when the proof-backed milestone crosses the judge’s threshold.

What changes when judge input changes: Threshold, private score, project ID, or duplicate submission changes whether the tip releases, rejects, or waits.

Result artifact: Proof-backed tip receipt with redacted score, milestone policy, creator badge, and Stellar tx hash.

Why a non-domain judge personally cares: It feels like “prove I did the work without exposing my private data or client screenshots.”

Desire / power pull: Get paid and look credible without doxxing the underlying work.

Tuesday pull: Creators repeatedly unlock tips, bonuses, certificates, and sponsor rewards.

Product thesis: Proof-of-performance settlement for creator/prosumer payouts.

Beachhead demo case: Sponsor escrows a testnet tip; creator proves private score or completion above threshold; Stellar releases tip.

Three adjacent cases: Learning bonuses; bug bounty milestone payments; fitness/creator challenge rewards.

Reusable engine: Private milestone proof, challenge policy, duplicate nullifier, escrow, creator receipt, public badge.

Expansion ladder: Beachhead: one sponsor tip. Month 1: challenge pages with proof policies. Month 6: marketplace-wide private proof-of-performance payout layer.

ZK load-bearing role: Proves private completion/score satisfies threshold without exposing raw score or evidence; prevents duplicate reward claims.

Stellar load-bearing role: Sponsor escrow and payout happen as visible Stellar transactions after proof verification.

Wallet/sign/transaction path or valid no-wallet exception: Sponsor signs escrow; creator signs claim; contract releases testnet payout.

What judges can inspect: Policy hash, proof verification result, public threshold, nullifier, escrow release tx.

Boring clone: Creator analytics or bounty status dashboard.

Mutation that keeps it human-close: The first screen is a tip jar that opens, not a KPI table.

Build-risk note: Keep proof circuit narrow: threshold proof + nullifier. Do not attempt arbitrary “prove any work” ingestion in the demo.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15

HH-ZK-04 — StayPass

Candidate ID: HH-ZK-04 StayPass

Seven-word rumor: Book safely without showing your whole identity.

User: Guest booking a room, desk, camera, scooter, tool, or event slot.

Buyer/budget behind it: Marketplaces, coworking spaces, short-stay hosts, equipment rental platforms, campus facilities.

Judge first action <=30s: Choose a listing, set host requirement “verified guest with 4.8+ reputation,” then try booking with two guest cards.

5-second replayable clip: One guest pass unlocks the door and escrow; the other remains blurred and blocked.

What changes when judge input changes: Reputation threshold, age/credential requirement, deposit size, or guest credential changes booking/escrow outcome.

Result artifact: Private booking pass: listing ID, proof policy, deposit tx, host-safe yes/no, redacted credential badge.

Why a non-domain judge personally cares: Renting a room or expensive item requires trust, but nobody wants to overshare identity with every stranger.

Desire / power pull: Book faster and safer while staying private.

Tuesday pull: Reusable private reputation for recurring bookings and rentals.

Product thesis: Private trust credentials for marketplaces where access and escrow depend on reputation.

Beachhead demo case: Guest proves reputation above threshold; Stellar escrow locks deposit; booking pass is minted/recorded.

Three adjacent cases: Coworking access; gear rental; event VIP or age-gated bookings.

Reusable engine: Credential proof, listing policy, escrow/deposit contract, booking pass, cancellation/settlement rule.

Expansion ladder: Beachhead: one booking. Month 1: marketplace plugin for proof-gated bookings. Month 6: portable private trust layer for rentals.

ZK load-bearing role: Proves guest meets policy without revealing full review history, identity, or exact score.

Stellar load-bearing role: Booking deposit/escrow and settlement are Stellar-visible; proof result gates deposit lock and host acceptance.

Wallet/sign/transaction path or valid no-wallet exception: Guest signs booking deposit; host or demo contract signs accept/release path.

What judges can inspect: Listing policy hash, proof result, escrow balance, booking pass state, tx hash.

Boring clone: Host risk dashboard or KYC checklist.

Mutation that keeps it human-close: It starts as “can I book this?” not “can an operator approve a profile?”

Build-risk note: Use mock issuer credentials and testnet deposits. Avoid production lodging, age, KYC, or insurance claims.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15

HH-ZK-05 — RedactPay

Candidate ID: HH-ZK-05 RedactPay

Seven-word rumor: Invoices settle while rates stay privately provable.

User: Freelancer, agency contractor, creator team, payroll-adjacent contractor, or vendor.

Buyer/budget behind it: Agencies, DAOs, procurement teams, creator houses, marketplaces, payroll/payment platforms.

Judge first action <=30s: Edit hidden hours/rate, then press Settle invoice; try one invoice within PO and one over budget.

5-second replayable clip: The public receipt shows “under PO, paid” while the private rate stays blurred; over-budget invoice bounces.

What changes when judge input changes: Rate, hours, PO limit, vendor credential, or invoice ID changes pay/reject/needs-approval status.

Result artifact: Redacted invoice settlement receipt: paid amount bucket, PO policy, proof ID, nullifier, Stellar payment tx.

Why a non-domain judge personally cares: People want to get paid without broadcasting salary/rates to the whole internet.

Desire / power pull: Settle money with provable fairness and private commercial terms.

Tuesday pull: Recurring invoice cycles, milestone payments, payroll-adjacent contractor payouts.

Product thesis: Confidential commercial settlement where counterparties prove terms satisfy policy without publicizing rates.

Beachhead demo case: Contractor proves invoice total is within approved PO and vendor is eligible; Stellar sends payment.

Three adjacent cases: Confidential payroll bands; vendor rebates; creator revenue splits.

Reusable engine: Invoice commitment, PO policy verifier, vendor credential, settlement contract, redacted receipt.

Expansion ladder: Beachhead: one invoice. Month 1: recurring contractor settlement. Month 6: confidential payment policy engine for marketplaces and teams.

ZK load-bearing role: Proves private rate/hours satisfy public policy without revealing exact terms; invoice nullifier prevents duplicate settlement.

Stellar load-bearing role: Stellar payment is the settlement object; Anchor-style quotes/payment lifecycle can be borrowed later for real payment rails. Anchor Platform explicitly supports deposit/withdrawal, auth, KYC/AML data handling, transaction lifecycle, quotes, and cross-border payment processing patterns. 
Stellar Developers

Wallet/sign/transaction path or valid no-wallet exception: Payer signs escrow or payment approval; contractor signs settlement claim; Soroban releases testnet asset.

What judges can inspect: Public PO limit, commitment, nullifier, verifier result, payment tx, redacted invoice receipt.

Boring clone: AP approval dashboard.

Mutation that keeps it human-close: “My invoice got paid without exposing my rate” replaces “finance team reviews a queue.”

Build-risk note: Keep invoice math simple: total <= PO, eligible vendor, invoice not previously claimed. Do not claim tax, payroll, KYC, or production compliance.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15

HH-ZK-06 — SealSponsor

Candidate ID: HH-ZK-06 SealSponsor

Seven-word rumor: Sponsors fund winners without revealing losing bids.

User: Conference sponsor, creator sponsor, hackathon organizer, vendor, or grant committee.

Buyer/budget behind it: Event organizers, sponsor marketplaces, procurement teams, creator deal platforms, advertising marketplaces.

Judge first action <=30s: Slide sponsor budget from $500 to $900; submit three sealed creator/vendor bids; press Reveal winners.

5-second replayable clip: Winner cards flip open and settle; losing bids remain sealed and refund automatically.

What changes when judge input changes: Budget, bid commitments, reserve price, or winner count changes winners, refunds, and settlement txs.

Result artifact: Sealed sponsorship settlement card: winners, proof ID, refund txs, paid txs, unopened loser commitments.

Why a non-domain judge personally cares: Auctions and sponsorships feel familiar; nobody likes exposing losing bids or negotiation position.

Desire / power pull: Win deals and settle money without leaking strategy.

Tuesday pull: Repeated sponsorship placements, creator campaigns, vendor slots, grant matching rounds.

Product thesis: Private competitive allocation with public settlement and verifiable fairness.

Beachhead demo case: Three creators bid for one sponsored slot; ZK proves winner selection satisfies rules; Stellar settles winner and refunds losers.

Three adjacent cases: Sealed vendor quotes; creator sponsorship slots; private grant matching.

Reusable engine: Bid commitment, eligibility proof, winner proof, escrow/refund contract, settlement receipt.

Expansion ladder: Beachhead: one sealed slot auction. Month 1: sponsor campaign rounds. Month 6: private allocation engine for grants, creators, and procurement.

ZK load-bearing role: Proves the selected winners satisfy bid/ranking rules without revealing losing bids or exact private inputs.

Stellar load-bearing role: Bid deposits, winner payout, and loser refunds settle visibly on Stellar.

Wallet/sign/transaction path or valid no-wallet exception: Each bidder signs deposit; sponsor signs campaign escrow; contract settles/refunds.

What judges can inspect: Bid commitments, public rules, proof result, winner payout tx, refund txs.

Boring clone: Procurement bidding dashboard.

Mutation that keeps it human-close: It plays like a sealed envelope game with real settlement, not a sourcing portal.

Build-risk note: Sealed-bid proof complexity can grow quickly; demo should use a tiny fixed N and simple max/min rule.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15

HH-ZK-07 — FanMint

Candidate ID: HH-ZK-07 FanMint

Seven-word rumor: Real fans unlock rewards without doxxing themselves.

User: Fan, event attendee, course participant, community member, or buyer claiming a reward.

Buyer/budget behind it: Brands, conferences, artists, game communities, education programs, loyalty platforms.

Judge first action <=30s: Scan a demo event QR, choose “attended keynote + bought merch,” then claim a sponsor reward.

5-second replayable clip: The reward vending machine dispenses a coupon only once; second claim gets blocked by the nullifier.

What changes when judge input changes: Attendance proof, purchase tier, reward pool, or duplicate claim changes reward tier or denial reason.

Result artifact: Private fan reward pass: reward tier, claim nullifier, sponsor coupon/token tx, redacted proof badge.

Why a non-domain judge personally cares: Everyone understands “I was there, give me the perk, but do not track me everywhere.”

Desire / power pull: Unlock rewards, status, and perks without turning loyalty into surveillance.

Tuesday pull: Fans repeatedly claim drops, coupons, access, and community badges.

Product thesis: Proof-gated distribution for loyalty and community rewards.

Beachhead demo case: Event attendee proves attendance and one purchase tier; Stellar issues a testnet coupon/token or reward claim.

Three adjacent cases: Course completion rewards; game tournament drops; conference sponsor coupons.

Reusable engine: Attendance credential, purchase/participation proof, reward policy, nullifier, coupon/token minter, claim receipt.

Expansion ladder: Beachhead: one sponsor reward. Month 1: event reward campaigns. Month 6: private loyalty distribution network.

ZK load-bearing role: Proves membership/attendance/purchase tier without revealing identity or exact purchase; nullifier prevents double-claiming.

Stellar load-bearing role: Reward token/coupon distribution is minted or transferred on Stellar after proof verification.

Wallet/sign/transaction path or valid no-wallet exception: User signs claim; reward contract mints/transfers testnet token or claimable balance.

What judges can inspect: Reward policy, nullifier, proof result, token/coupon tx, claim state.

Boring clone: Loyalty analytics dashboard.

Mutation that keeps it human-close: A reward vending machine replaces an admin loyalty console.

Build-risk note: Keep rewards as testnet coupons/tokens. Do not claim real merchant redemption or production identity privacy.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 = 16

Pool check

This pool satisfies the hard constraints: HH-ZK-01, 02, 03, 04, 05, and 06 involve payout, escrow, settlement, remittance, booking deposit, or proof-gated distribution stakes; HH-ZK-01 borrows from Stellar Disbursement Platform, HH-ZK-02 from MoneyGram Ramps and Anchor Platform, and HH-ZK-05 from Anchor-style payment lifecycle patterns. The R0 research direction also says Stellar becomes load-bearing when a proof result changes a Soroban contract, payout/disbursement flow, cash-in/cash-out path, or Stellar-settled payment object, and it identifies grants, fund distribution, ramps, bulk payouts, cross-border payments, and high-value access as stronger buyer/budget signals. 

01-10x10-deep-research-response