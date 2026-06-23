Based on the uploaded bounty brief, the binding bar is: ZK must change the user’s actual product outcome, and Stellar must be visible through verification, settlement, gating, recording, or inspection in the hero path. The brief also says the first-minute demo should let a judge change an input, generate or submit a proof, see Stellar-linked verification or settlement, and inspect proof/transaction/contract state. 

bounty_brief

 Official Stellar docs also frame BN254 and Poseidon/Poseidon2 as foundational ZK building blocks, not complete apps by themselves, so these directions keep the proof backstage and make the visible result a payout, unlock, booking, score, receipt, or comparison artifact. 
developers.stellar.org

Scoring order for every candidate: clear in 10s / cool-useful / judge can play / input changes result / owned artifact / sponsor primitive matters / buildable / wallet path if Web3. No winner selected.

Candidate ID: I3-WOW-01 — Ghost Race Bounty

Seven-word rumor: People race ghosts, cheaters cannot cash out.

User: Online challenge hosts, creator communities, hackathons, typing/coding/skill-game players.

Weird/memorable surface: A public “ghost race” arena: the judge types or plays against a replay ghost, then watches the ghost either enter the money lane or get vaporized as invalid.

Judge first action <=30s: Pick a challenge phrase or mini-game seed, play one 10-second round, connect a funded test wallet, submit score.

5-second replayable clip: The score rocket climbs the leaderboard, pauses at “prove replay,” then either locks into a Stellar-paid podium or explodes as “tampered.”

What changes when judge input changes: A different phrase, replay, keystroke timing, or challenge seed produces a different score; a tampered replay fails and does not update the leaderboard.

Result artifact: Shareable race card with challenge seed, player alias, score, replay hash, proof status, Stellar tx, and payout/leaderboard position.

Why a non-domain judge personally cares: Everyone understands “that leaderboard score might be fake”; the demo turns anti-cheat into a game moment.

Desire / power pull: Win public skill challenges where the win is visibly legitimate.

Tuesday pull: Creators and communities can run weekly “prove-it” bounties with tiny XLM/USDC prizes.

Product thesis: Proof-backed public challenges where payouts and rankings require verified computation, not trust in a server.

Beachhead demo case: Typing-race bounty: hidden event log proves WPM/accuracy came from the judge’s actual input, then Stellar updates the leaderboard and pays the winner.

Three adjacent cases: Coding golf contests; aim-trainer/reaction-time leaderboards; proof-backed educational quizzes with prize pools.

Reusable engine: Challenge spec + replay capture + proof-backed scoring + Soroban escrow/leaderboard + shareable replay card.

Expansion ladder: Beachhead: one typing race. Month 1: challenge templates and hosted bounties. Month 6: public challenge marketplace for proof-backed tournaments.

ZK load-bearing role: Proves the score was computed from a valid replay and challenge seed without trusting the app server or exposing the full raw input stream.

Stellar load-bearing role: Soroban contract accepts verified score, updates leaderboard state, and releases/records the bounty payout.

Wallet/sign/transaction path or valid no-wallet exception: Judge connects Freighter or demo-funded Stellar wallet; signs score submission and possible prize claim. Audience can replay read-only with no wallet, but judge path uses a wallet.

What judges can inspect: Replay card, public inputs, proof pass/fail, Soroban contract state, leaderboard entry, tx hash.

Boring clone: “Verifiable leaderboard dashboard.”

Mutation that keeps it serious: Make it a live challenge arena with bounties, ghost replays, and cheating visibly blocked.

Build-risk note: RISC Zero proof latency could be the riskiest beat; keep the circuit/game tiny and use async “proving” with visible pending state.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15/16

Candidate ID: I3-WOW-02 — Masked Bid Market

Seven-word rumor: Bidders wear masks, sellers still get paid.

User: Indie sellers, event organizers, collectors, local merchants running limited-item sales.

Weird/memorable surface: A tiny auction stage where bidders are masked avatars. The judge changes one secret bid; masks shuffle; only the winning mask reveals enough to settle.

Judge first action <=30s: Enter a secret bid for a limited “hackathon trophy” item, sign deposit, press “seal bid.”

5-second replayable clip: Three masked bidders drop sealed envelopes; the reserve line moves; one mask lights up; losing deposits boomerang back.

What changes when judge input changes: Change bid amount or reserve price and winner/refunds change without exposing losing bids.

Result artifact: Auction receipt: item, winning proof, settlement tx, refund txs, concealed losing bids, and a replayable bid-room animation.

Why a non-domain judge personally cares: Everyone has seen auctions, ticket drops, apartment bidding, or limited merch feel unfair.

Desire / power pull: Get the best price or win scarce access without showing your hand.

Tuesday pull: Sellers can run weekly drops where buyers trust the result without doxxing budgets.

Product thesis: Sealed-bid commerce for scarce goods where the chain enforces settlement but participants keep private limits private.

Beachhead demo case: One limited item, three demo bidders, sealed bid proof, Stellar escrow settlement to seller and refunds to losers.

Three adjacent cases: Event ticket drops; freelancer project bids; private sponsorship offers.

Reusable engine: Sealed commitment, bid proof, reserve/winner rule, escrow state, refund settlement, replay receipt.

Expansion ladder: Beachhead: one sealed auction. Month 1: merchant-hosted private drops. Month 6: private-bid marketplace for tickets, collectibles, and service quotes.

ZK load-bearing role: Proves bid validity and winner rule without revealing losing bids or exact buyer budgets.

Stellar load-bearing role: Stellar escrow holds deposits, records auction state, pays seller, refunds losers, and makes settlement inspectable.

Wallet/sign/transaction path or valid no-wallet exception: Each bidder signs a bid/deposit tx; seller signs item listing. Demo can use pre-funded wallets for speed.

What judges can inspect: Auction contract state, commitment list, winning proof result, settlement/refund txs, item receipt.

Boring clone: “Private auction proof verifier.”

Mutation that keeps it serious: Turn proof verification into a masked auction room with immediate money movement.

Build-risk note: Winner selection must be narrow: fixed small bidder count and simple greater-than/reserve proof for hackathon scope.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 = 16/16

Candidate ID: I3-WOW-03 — Whisper Coupon Booth

Seven-word rumor: Coupons whisper prices without exposing your wallet.

User: Local merchants, creator shops, event organizers, student/community buyers.

Weird/memorable surface: A neon “coupon confession booth.” The buyer proves a private condition and the booth prints a spendable coupon without revealing why they qualified.

Judge first action <=30s: Pick a buyer persona credential, choose a merchant offer, press “prove I qualify,” then claim a Stellar coupon.

5-second replayable clip: The booth curtain closes, a masked proof stamp lands, and a coupon ticket shoots out with a Stellar claim tx.

What changes when judge input changes: Change eligibility, discount rule, or merchant budget; the coupon amount, denial, or claim limit changes.

Result artifact: Spendable coupon receipt with merchant, discount band, one-use nullifier, expiration, Stellar tx, and “why hidden” explanation.

Why a non-domain judge personally cares: Everyone understands wanting a student/local/low-income/loyalty discount without uploading private documents everywhere.

Desire / power pull: Get better deals without oversharing personal data.

Tuesday pull: Merchants can run recurring private offers and buyers can collect reusable proof-backed coupons.

Product thesis: Private eligibility offers where merchants can target discounts and buyers prove qualification with minimum disclosure.

Beachhead demo case: Student/community discount coupon: user proves membership from a demo credential and mints a one-use Stellar coupon.

Three adjacent cases: Loyalty discounts; event access codes; income-band or neighborhood mutual-aid vouchers.

Reusable engine: Credential claim, offer rule, nullifier, coupon mint/claim, merchant budget, spend receipt.

Expansion ladder: Beachhead: one private coupon. Month 1: merchant offer pages. Month 6: privacy-preserving coupon network for local commerce and creator shops.

ZK load-bearing role: Proves eligibility and prevents duplicate claims without revealing the underlying credential or exact private attribute.

Stellar load-bearing role: Stellar records the coupon claim, enforces one-use redemption, and moves the merchant-funded discount/payment.

Wallet/sign/transaction path or valid no-wallet exception: Buyer signs coupon claim; merchant signs offer funding. Demo wallets can be pre-funded.

What judges can inspect: Coupon contract state, nullifier used/not used, claim tx, redemption tx, hidden attribute not exposed.

Boring clone: “Eligibility verification form.”

Mutation that keeps it serious: Make the output a spendable coupon ticket, not an eligibility report.

Build-risk note: Real credential issuers are out of scope; use demo-issued credentials and disclose that production issuers are future integration.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15/16

Candidate ID: I3-WOW-04 — Secret Split Pot

Seven-word rumor: Friends split bills without revealing private budgets.

User: Group travelers, roommates, clubs, creator collectives, mutual-aid groups.

Weird/memorable surface: A dinner table where each person drops a covered coin into a shared pot. The pot only opens when the hidden contributions satisfy the public bill rule.

Judge first action <=30s: Choose a bill amount and private “comfort budget,” then contribute secretly and watch the pot release or stay locked.

5-second replayable clip: Covered coins fly into the pot; the bill meter hits green; Stellar releases the payment while individual budgets remain masked.

What changes when judge input changes: Change bill total, contribution rule, or private budget; the pot either releases, asks for more, or refunds.

Result artifact: Group split receipt showing total paid, fairness rule satisfied, individual contributions hidden, Stellar payment/refund txs.

Why a non-domain judge personally cares: Group costs are awkward; people want fairness without exposing income or personal budget.

Desire / power pull: Pay together while keeping dignity and privacy.

Tuesday pull: Recurring dinners, trips, clubs, and shared subscriptions.

Product thesis: Privacy-preserving group payments where public obligations are settled without exposing private ability-to-pay data.

Beachhead demo case: Group dinner split: each participant proves their contribution meets a chosen private tier; Stellar releases total to host/merchant.

Three adjacent cases: Club dues; group travel deposits; mutual-aid matching pools.

Reusable engine: Public obligation, private contribution proof, sum/release condition, nullifiers, refund/payment receipt.

Expansion ladder: Beachhead: one group bill. Month 1: recurring group pots. Month 6: private contribution engine for clubs, trips, mutual aid, and collectives.

ZK load-bearing role: Proves each hidden contribution is valid and the public total condition is satisfied without revealing each person’s private budget.

Stellar load-bearing role: Stellar escrow receives contributions, releases the pot, refunds failures, and records the group receipt.

Wallet/sign/transaction path or valid no-wallet exception: Participants sign contribution txs; host signs bill request; judge demo can use two pre-funded simulated participants plus one live judge wallet.

What judges can inspect: Pot state, total released, contribution proof status, tx hashes, hidden individual amounts not visible.

Boring clone: “Expense-splitting app with privacy notes.”

Mutation that keeps it serious: The pot physically opens only when a proof-backed payment condition is satisfied.

Build-risk note: Private sum circuits and UX can sprawl; keep beachhead to 3 participants, one bill, one release rule.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15/16

Candidate ID: I3-WOW-05 — Masked Applause Payout

Seven-word rumor: Crowds cheer anonymously, winners still receive money.

User: Streamers, event hosts, online classrooms, hackathons, creator communities.

Weird/memorable surface: An applause meter where anonymous masks clap. Duplicate claps turn into smoke; real unique claps fill a payout jar.

Judge first action <=30s: Join as an audience member, choose a performer/project, clap or tip once, and watch payout/tally update.

5-second replayable clip: A duplicate clap tries to enter, gets rejected, then a valid masked clap pushes the creator’s Stellar jar over the payout line.

What changes when judge input changes: Change chosen performer, audience credential, duplicate attempt, or tip amount; tally and payout route change.

Result artifact: Public applause receipt: creator, tally, payout tx, unique-signal proof, duplicate-block status, shareable event result.

Why a non-domain judge personally cares: Everyone understands popularity contests, bot votes, and unfair audience voting.

Desire / power pull: Support or rank creators fairly without exposing every voter’s identity.

Tuesday pull: Weekly streams, school showcases, hackathon demos, creator contests.

Product thesis: Anonymous-but-unique audience participation where proof-backed votes or tips trigger public payouts.

Beachhead demo case: Live demo room votes for one of three projects; unique proof prevents double voting; Stellar pays the top jar.

Three adjacent cases: Anonymous grant voting; community tip matching; private classroom participation rewards.

Reusable engine: Membership set, anonymous signal, nullifier, tally, payout jar, event receipt.

Expansion ladder: Beachhead: one applause contest. Month 1: hosted events with private unique voting. Month 6: creator/community payout rails with anonymous participation and public settlement.

ZK load-bearing role: Proves a voter is eligible and has not already voted/tipped without revealing which identity they are.

Stellar load-bearing role: Stellar records tally/payout state and settles tips or matching funds to creators.

Wallet/sign/transaction path or valid no-wallet exception: Voters sign clap/tip tx; event host funds payout jar. For non-paying claps, a relayer can sponsor fees, but Stellar still records the event state.

What judges can inspect: Tally contract, nullifier list, rejected duplicate attempt, payout tx, creator receipt.

Boring clone: “Anonymous voting dashboard.”

Mutation that keeps it serious: Make it a live applause meter with money jars and duplicate claps visibly blocked.

Build-risk note: Membership setup must be simple: pre-issue demo event passes, avoid real identity/provider claims.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 = 16/16

Candidate ID: I3-WOW-06 — Redacted Door Booking

Seven-word rumor: Doors unlock trust without copying your passport.

User: Peer-to-peer rentals, event venues, creator meetups, coworking rooms, equipment lending groups.

Weird/memorable surface: A door with three locks: age, deposit, reputation. The judge changes a private credential and watches locks click open or stay shut.

Judge first action <=30s: Pick a guest credential, choose a room/item, press “unlock privately,” then sign the deposit escrow.

5-second replayable clip: The passport image gets redacted, three locks click open, and a Stellar escrow receipt slides under the door.

What changes when judge input changes: Change age/reputation/deposit credential or listing requirement; booking unlocks, blocks, or changes deposit.

Result artifact: Private booking pass with listing, satisfied conditions, redacted credential view, escrow tx, and unlock receipt.

Why a non-domain judge personally cares: Travelers and renters know the discomfort of sending IDs, screenshots, and private history to strangers.

Desire / power pull: Get trusted access without surrendering a full identity trail.

Tuesday pull: Reusable private trust checks for rooms, equipment, meetups, memberships, and rentals.

Product thesis: Private trust gates for marketplaces where users prove enough to book and escrow without exposing full documents.

Beachhead demo case: Book a demo crash-pad room by proving “over 18 + verified guest + deposit funded,” then Stellar locks deposit escrow.

Three adjacent cases: Equipment rental; venue access; paid community meetups.

Reusable engine: Listing requirements, credential proof, booking gate, escrow deposit, host receipt, guest pass.

Expansion ladder: Beachhead: one room booking. Month 1: reusable private booking passes. Month 6: marketplace trust layer for rentals, events, and equipment lending.

ZK load-bearing role: Proves required attributes and reputation thresholds without revealing full passport, exact birthdate, or raw review history.

Stellar load-bearing role: Stellar escrow locks deposit, records booking state, and releases/refunds based on booking outcome.

Wallet/sign/transaction path or valid no-wallet exception: Guest signs deposit escrow; host signs listing acceptance. Demo can use pre-funded guest/host wallets.

What judges can inspect: Booking contract state, escrow tx, proof pass/fail, revealed conditions, unrevealed credential fields.

Boring clone: “KYC booking form.”

Mutation that keeps it serious: The hero is a door unlocking with escrow, not a compliance checklist.

Build-risk note: Real-world hosts and KYC providers are out of scope; use demo credentials and frame production as issuer integration.

Score 0-2 each: 2 / 2 / 2 / 2 / 2 / 2 / 1 / 2 = 15/16

Pool sanity checks: I3-WOW-01 has the clearest public comparison/challenge/replay and proof-backed anti-cheat mechanic. None of these require production shielded stablecoins, audited private payment security, or live regulated partners; each can run with demo credentials, testnet Stellar transactions, and narrow proof rules while still making ZK load-bearing and Stellar visible.