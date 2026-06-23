Grounding used: the bounty requires zero-knowledge technology integrated with Stellar, with the proof changing the user’s actual product outcome and a first-minute path where a judge changes input, submits or generates proof, sees Stellar-linked verification/settlement, and can inspect the resulting transaction or contract state. 

bounty_brief

 The Hunter bar also requires a judge-controlled first action, a replayable 5-second state change, an owned artifact, and no proof/dashboard/checklist as the first beat. 

01-product-discovery

 The R0 pattern I’m borrowing is “private proof, public consequence”: proof stays backstage while the visible result is a payout, access result, booking, score, transfer, badge, receipt, or comparable artifact. 

01-10x10-deep-research-response

No winner selected.

Candidate I1-PFS-01 — CrowdKey Drop

Candidate ID: I1-PFS-01

Seven-word rumor: Audience votes privately; money visibly moves onchain.

User: Event audience member, community voter, grant-drop participant, fan-club member.

Judge first action <=30s: Scan a QR, pick one of three causes/teams, connect a pre-funded Stellar testnet wallet, and tap “Cast private vote + claim.”

5-second replayable clip: The selected team’s pot pulses upward, the judge’s wallet receives a tiny claim token, and a “1 human, 1 vote” stamp appears without showing the judge’s identity.

What changes when judge input changes: Choosing a different team moves the pot increment to that team; trying to vote twice with the same private membership proof shows “already counted” and blocks the second claim.

Result artifact: Shareable round card: winning team, total private voters, judge’s one-time claim receipt, Stellar tx link.

Why a non-domain judge personally cares: Everyone understands “I want my vote counted once without doxxing myself,” especially in audience polls, fan drops, grants, and community rewards.

Desire / power pull: Public participation without identity exposure; status from being part of the winning crowd.

Tuesday pull: Communities repeatedly run drops, polls, raffles, grant votes, and anti-bot claims.

Product thesis: Private one-person-one-action rails for public participation events where rewards or visibility are at stake.

Beachhead demo case: Hackathon room votes on which “project mascot” gets a public XLM tip pot.

Three adjacent cases: Anti-bot airdrops; DAO/community votes; fan-club merch drops.

Reusable engine: Membership credential + nullifier + reward/vote contract + shareable claim receipt.

Expansion ladder: Room poll → community drop tool → private voting/reward layer for grants, fandoms, and campaigns.

ZK load-bearing role: Proves the voter is in the eligible set and has not used the nullifier before, without revealing which eligible person they are.

Stellar load-bearing role: Soroban verifies/records the proof result, increments the chosen pot, blocks duplicate nullifiers, and sends/mints the claim token.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects a pre-funded Stellar demo wallet and signs the vote/claim transaction; no no-wallet exception needed.

What judges can inspect: Vote/claim tx, nullifier-used state, pot balances, minted claim token, public round page.

Boring clone: Proof-of-membership verifier dashboard with nullifier logs.

Mutation that keeps it playable: Make the first screen a live audience choice with money moving, not a verifier table.

Build-risk note: Needs a tight membership/nullifier circuit and fast proving; scope demo to a small eligible set and testnet token claims.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-02 — ProofRun Arena

Candidate ID: I1-PFS-02

Seven-word rumor: Your best game score becomes a proof.

User: Player, streamer, online contest host, education platform, hiring challenge host.

Judge first action <=30s: Play a 10-second typing/reflex/memory challenge and tap “Post my verified score.”

5-second replayable clip: The judge’s score card flies onto a public leaderboard; if the proof passes, the rank updates and a small prize badge appears.

What changes when judge input changes: Faster/slower play changes score and rank; replay tampering or changing the challenge seed causes the leaderboard update to fail.

Result artifact: Public proof-backed score card with challenge seed, score, rank, wallet, Stellar tx, and replay hash.

Why a non-domain judge personally cares: Everyone understands leaderboards, cheating, and wanting a score people believe.

Desire / power pull: Competitive status: “I can prove my result was real without exposing the whole raw replay.”

Tuesday pull: Daily challenges, creator tournaments, skill contests, hiring tests, school competitions.

Product thesis: Proof-backed public competitions where results become trusted assets, not screenshots.

Beachhead demo case: 10-second typing challenge with a tiny Stellar prize for the top verified score.

Three adjacent cases: Coding challenge anti-cheat; fitness/streak proof; creator mini-games with sponsor prizes.

Reusable engine: Challenge seed generator + local replay capture + proof-of-score + Stellar leaderboard/prize contract + share card.

Expansion ladder: Single mini-game → tournament builder → verified performance layer for creator, education, hiring, and esports micro-contests.

ZK load-bearing role: Proves the score was computed from the committed replay/challenge rules without exposing full private input stream or letting the player forge the score.

Stellar load-bearing role: Soroban accepts the verified result, updates leaderboard state, and releases/mints reward artifacts.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects a testnet wallet before posting score and signs the leaderboard/prize transaction.

What judges can inspect: Score card, leaderboard entry, challenge seed, proof receipt, Stellar tx, contract state for rank/reward.

Boring clone: Anti-cheat backend or proof log for game integrity.

Mutation that keeps it playable: The judge plays first; proof only explains why the leaderboard trusted the score.

Build-risk note: RISC Zero or similar proof-of-computation may be heavy; the demo should keep rules tiny and deterministic.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-03 — Sealed Ticket Bid

Candidate ID: I1-PFS-03

Seven-word rumor: Secret bids win tickets without revealing budgets.

User: Fan buying limited tickets, creator selling scarce merch, event organizer, marketplace seller.

Judge first action <=30s: Drag a private max bid slider for a limited “front-row pass,” then tap “Seal bid.”

5-second replayable clip: The ticket card flips from “not qualified” to “qualified and escrowed” while the exact bid stays hidden.

What changes when judge input changes: Raising the hidden max above reserve unlocks escrow/qualification; lowering it blocks the ticket; changing event tier changes which sealed badge appears.

Result artifact: Sealed bid receipt: ticket tier, reserve passed/not passed, escrow status, hidden max commitment, Stellar tx.

Why a non-domain judge personally cares: People hate revealing their full budget for tickets, collectibles, rooms, or limited inventory.

Desire / power pull: Negotiation power: bid credibly without showing your ceiling.

Tuesday pull: Limited drops, presales, private offers, seller quotes, ticket upgrades, waitlist priority.

Product thesis: Private intent rails for scarce goods where buyers prove seriousness without leaking willingness-to-pay.

Beachhead demo case: Three judges bid for one VIP ticket; each sees whether their sealed bid qualifies.

Three adjacent cases: Sealed merch drops; private rental offers; B2B quote requests.

Reusable engine: Hidden bid commitment + reserve/eligibility proof + escrow state + seller settlement receipt.

Expansion ladder: Reserve-gated ticket demo → creator drop checkout → private marketplace bidding layer.

ZK load-bearing role: Proves the hidden bid satisfies reserve/escrow constraints without revealing the exact bid.

Stellar load-bearing role: Stellar locks escrow, records sealed qualification, and later settles/refunds based on proof-backed state.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects wallet, signs escrow/commitment transaction, and receives sealed receipt.

What judges can inspect: Escrow tx, qualification state, ticket/pass token, commitment hash, final settlement/refund tx.

Boring clone: Auction dashboard with public bid table.

Mutation that keeps it playable: First screen is a ticket card and private bid slider, not an auction admin console.

Build-risk note: Full private max-bid ranking is harder; hackathon-safe version should start with reserve qualification and escrow, then optionally reveal/settle.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-04 — No-Doxx Perk Pass

Candidate ID: I1-PFS-04

Seven-word rumor: Unlock age-gated perks without showing your identity.

User: Student, traveler, concert attendee, shopper, venue guest, app user.

Judge first action <=30s: Pick a sample private credential — student, 21+, local resident, conference attendee — and tap “Unlock perk.”

5-second replayable clip: A locked coupon/pass snaps open and mints into the wallet; a different credential makes the pass stay locked.

What changes when judge input changes: Student credential unlocks student discount; age credential unlocks age-gated venue pass; wrong credential shows “private proof failed, no pass minted.”

Result artifact: Privacy-preserving perk pass with merchant name, eligibility type, redemption status, Stellar tx, no raw identity fields.

Why a non-domain judge personally cares: Everyone has been asked to overshare ID for a discount, age gate, event badge, or membership perk.

Desire / power pull: Selective disclosure: get the benefit without handing over the whole document.

Tuesday pull: Recurring access checks for discounts, events, loyalty perks, local benefits, age gates, and member-only drops.

Product thesis: Private eligibility checkout for merchants and communities that need yes/no trust, not full identity collection.

Beachhead demo case: Unlock a “student coffee discount” or “21+ afterparty pass” without revealing birthday/name.

Three adjacent cases: Employee benefit claims; local resident discounts; private allowlist minting.

Reusable engine: Credential issuer/import + selective proof query + pass mint + redemption state.

Expansion ladder: One merchant perk → reusable coupon/pass network → privacy-preserving access layer for venues, apps, and commerce.

ZK load-bearing role: Proves a credential satisfies the eligibility predicate while hiding unnecessary fields.

Stellar load-bearing role: Soroban gates pass mint/redemption on proof validity and records spend/redeem state.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects testnet wallet and signs the pass mint/redeem transaction.

What judges can inspect: Mint tx, redeemed/unredeemed pass state, public eligibility predicate, proof acceptance event.

Boring clone: KYC/eligibility verification portal.

Mutation that keeps it playable: The first beat is “unlock this perk,” not “upload ID” or “view verification status.”

Build-risk note: Needs credible demo credentials; keep issuer simple and use two or three predicates.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-05 — Ghost Reputation Booking

Candidate ID: I1-PFS-05

Seven-word rumor: Private travel reputation opens doors, not profiles.

User: Traveler, host, marketplace guest, freelancer, local guide, private community member.

Judge first action <=30s: Choose a demo reputation wallet — “3 great stays,” “new guest,” or “flagged dispute” — and tap “Request booking.”

5-second replayable clip: The host’s door/booking card opens, asks for higher deposit, or blocks the booking based on private proof.

What changes when judge input changes: Strong reputation unlocks instant booking; weak reputation requires larger Stellar escrow; flagged state blocks the request.

Result artifact: Private booking card: accepted/escrowed/blocked, hidden reputation proof, escrow tx, host-safe receipt.

Why a non-domain judge personally cares: People understand wanting to prove they are trustworthy without exposing travel history, address, full profile, or identity.

Desire / power pull: Portable trust without public exposure.

Tuesday pull: Repeated bookings, rentals, community entry, coworking access, local services, private marketplaces.

Product thesis: Private reputation gates for marketplaces where trust matters but profile exposure is costly.

Beachhead demo case: Book a couch, desk, or local tour with “3 good stays, no disputes” proof.

Three adjacent cases: Freelancer hiring; private community entry; high-value peer-to-peer rentals.

Reusable engine: Reputation credential set + risk policy + escrow/deposit rules + booking state receipt.

Expansion ladder: One booking scene → marketplace plugin → private reputation network for services and rentals.

ZK load-bearing role: Proves reputation thresholds and no-dispute status without revealing where/when the user stayed or worked.

Stellar load-bearing role: Soroban gates booking, locks escrow/deposit, and records accepted/blocked booking state.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects wallet and signs booking/escrow transaction.

What judges can inspect: Booking state, escrow tx, accepted/blocked event, deposit amount, redacted reputation pass.

Boring clone: Host risk dashboard or reputation verifier screen.

Mutation that keeps it playable: Make the first beat a familiar booking card that opens or locks, not an operator risk console.

Build-risk note: Reputation source realism is the main risk; demo can use issued credentials and one transparent policy.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-06 — Arrival Receipt

Candidate ID: I1-PFS-06

Seven-word rumor: Family remittances prove arrival without exposing amounts.

User: Sender, recipient, wallet user, remittance app, mutual-aid organizer.

Judge first action <=30s: Pick “send $25 / $50 / $100 test USDC,” choose privacy band, and tap “Send private arrival receipt.”

5-second replayable clip: A suitcase/receipt animation travels from sender to recipient; recipient card lights up “arrived: enough for rent band” without revealing exact amount.

What changes when judge input changes: Changing amount changes whether the receipt proves “enough for rent,” “gift only,” or “below threshold”; changing recipient changes the minted receipt destination.

Result artifact: Arrival receipt: payment settled, amount band proven, exact amount/sender memo hidden, Stellar tx link.

Why a non-domain judge personally cares: Sending money to family is emotionally obvious; people may want proof it arrived without exposing the whole financial trail.

Desire / power pull: Private money confidence: prove support landed without turning family finances into public data.

Tuesday pull: Recurring remittances, mutual aid, family support, creator payouts, small business supplier payments.

Product thesis: Private settlement receipts for real-world payments where confirmation matters but full financial disclosure is harmful.

Beachhead demo case: Send testnet USDC to a family recipient and mint a proof-backed “arrived above threshold” receipt.

Three adjacent cases: Rent support receipts; supplier payment confirmation; donor/mutual-aid payout proofs.

Reusable engine: Payment condition proof + amount-band receipt + recipient acknowledgment + Stellar settlement object.

Expansion ladder: One remittance receipt → wallet receipt plugin → private confirmation layer for remittance, aid, and supplier payments.

ZK load-bearing role: Proves the payment met a condition — e.g., amount band, recipient match, memo policy — without revealing exact amount or sensitive memo.

Stellar load-bearing role: Stellar settles the payment and records/mints the receipt after proof verification.

Wallet/sign/transaction path or valid no-wallet exception: Sender connects wallet and signs payment/receipt transaction; recipient can inspect receipt in wallet.

What judges can inspect: Payment tx, receipt mint tx, amount-band public output, recipient wallet receipt, contract state.

Boring clone: Payment status dashboard or remittance tracker.

Mutation that keeps it playable: First screen is “send and see receipt arrive,” not compliance/ramp operations.

Build-risk note: Real cash-out/ramp integration is too large for the first beat; demo should use Stellar testnet asset movement and make limitations explicit.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Candidate I1-PFS-07 — FairSplit Tips

Candidate ID: I1-PFS-07

Seven-word rumor: Tip pools prove fairness without exposing wages.

User: Restaurant worker, creator collective, gig crew, payroll admin, small business owner.

Judge first action <=30s: Drag a tip jar from $30 to $120, choose “equal split” or “hours-weighted,” and tap “Pay crew privately.”

5-second replayable clip: Three worker envelopes flip to “paid fairly” with private amounts hidden; the total pool visibly drops to zero.

What changes when judge input changes: Changing pool amount or split rule changes which envelopes qualify, whether minimum payout passes, and the Stellar payout tx totals.

Result artifact: Fair split receipt: total tips, rule used, proof that private worker payouts match policy, payout txs/commitments.

Why a non-domain judge personally cares: Everyone understands tips, fairness, and not wanting individual wages exposed.

Desire / power pull: Money trust without workplace gossip.

Tuesday pull: Restaurants, salons, creator teams, delivery crews, event staff, and agencies split pooled money repeatedly.

Product thesis: Confidential payout receipts for teams that need provable fairness without exposing individual compensation.

Beachhead demo case: Split a cafe tip jar among three workers based on private hours.

Three adjacent cases: Confidential payroll bands; creator revenue splits; grant/team milestone payouts.

Reusable engine: Private allocation inputs + policy proof + payout/disbursement state + team receipt.

Expansion ladder: Tip jar demo → small-team payout tool → confidential disbursement layer for organizations.

ZK load-bearing role: Proves each private payout follows the declared rule and totals match the pool without revealing worker hours or individual amounts.

Stellar load-bearing role: Stellar executes or records payouts and stores the proof-backed fair-split receipt.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects wallet as payer, signs the payout batch, and workers receive testnet tokens/receipts.

What judges can inspect: Total pool, policy, proof acceptance event, payout commitments, worker receipt tokens, Stellar txs.

Boring clone: Payroll compliance dashboard.

Mutation that keeps it playable: Start with a tactile tip jar and envelopes, not payroll logs.

Build-risk note: Private multi-recipient payout proofs can grow; demo should use three workers and one simple split rule.

Scores 0-2 each: clear in 10s 2; cool/useful 2; judge can play 2; input changes result 2; owned artifact 2; sponsor primitive matters 2; buildable 1; wallet path if Web3 2. Total: 15/16.

Pool coverage check

Consumer/audience-playable: CrowdKey Drop, ProofRun Arena, Sealed Ticket Bid, No-Doxx Perk Pass.

Shareable/comparable public artifact: ProofRun score card, CrowdKey round card, Sealed Ticket receipt, FairSplit receipt.

ZK load-bearing: Every candidate uses proof validity to change access, payout, booking, leaderboard, escrow, or receipt outcome.

Stellar-visible: Every candidate includes Stellar wallet signing and an inspectable tx/contract-state artifact in the hero path.

First beat avoided: No candidate starts with proof status, logs, charts, compliance checklists, contract calls, admin consoles, or verifier screens.