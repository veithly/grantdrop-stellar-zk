Stellar Hacks ZK R0 Research
This is an R0 evidence-only pack for Stellar Hacks: Real-World ZK. It follows the uploaded Hunter rules to keep research separate from concept selection, judging, PRD, and UIUX, and it uses the uploaded bounty brief as the contest baseline because the live DoraHacks page was rate-limited to the browser tool during retrieval. fileciteturn0file0 fileciteturn0file1 fileciteturn0file2 fileciteturn0file3
Construct and market evidence
Required Construct Primer
Official wording or closest official wording: the challenge requires “zero-knowledge technology integrated with Stellar,” with ZK doing real work and not just appearing in the README; the uploaded brief further narrows the acceptable minimum to proof verification inside a Stellar smart contract or another meaningful Stellar testnet/mainnet integration. Stellar’s own docs align with that framing: Protocol 25 introduced native BN254 and Poseidon/Poseidon2 host functions, and Stellar’s ZK docs say those primitives are only building blocks, not an end-to-end application by themselves. fileciteturn0file3 [1]
What counts: off-chain proof generation plus a Stellar-visible consequence. The strongest evidence-backed shapes are: a Soroban verifier that accepts a proof and changes contract state; a private payment/privacy-pool flow where proof validity gates transfer/withdraw behavior; a credential/compliance flow where a proof unlocks access, settlement, or eligibility on Stellar; or a verifiable off-chain computation flow where a proof result is checked on Stellar before updating application state. Stellar’s docs explicitly describe on-chain verifiers, private payments, and privacy/computation workflows this way. fileciteturn0file3 [2]
What does not count: a fake proof log, a static proof hash, a local-only verifier with no meaningful Stellar path, or a demo where the proof has no user-facing consequence. Stellar’s docs explicitly warn that BN254 and Poseidon primitives alone do not create private payments; the Hunter references separately reject proof packets, dashboards, and backstage verifier screens as the hero. [3] fileciteturn0file1 fileciteturn0file3
First-minute demo proof: a judge changes an input, a proof is generated or submitted, Stellar verifies or settles against that proof, and the room can inspect the resulting contract state, transaction, score, payout, or access outcome. That exact “judge changes input → visible state change → inspectable artifact” requirement is stated in the uploaded brief and reinforced by the Hunter requirement that the hero path be a replayable state mutation, not a proof dashboard. fileciteturn0file3 fileciteturn0file0 fileciteturn0file1
Research evidence used to define the construct:
Protocol 25 release notes: BN254 elliptic-curve operations and Poseidon/Poseidon2 host functions. [4]
Protocol 26 release notes and upgrade guide: nine additional BN254 host functions, scalar-field arithmetic, MSM, curve checks, and materially cheaper Noir verification than Wasm-side implementations. [5]
Stellar ZK docs: primitives are foundational, but developers still need higher-level proof systems and verifier contracts for full workflows. [6]
Stellar privacy docs: concrete examples already recognized by Stellar include privacy pools, confidential tokens, on-chain verifiers, and private payments with ASP/view-key style compliance hooks. [7]
Binding prompt constraint for later ideation: every candidate must make proof validity change a user-owned result on Stellar during the hero path, not merely produce a proof artifact or admin-facing verification screen. fileciteturn0file1 fileciteturn0file3
Product-Market Arena
Desire-led cool utility signals: the repeated “cool” behaviors in adjacent markets are not abstract cryptography; they are prove human without sharing identity, unlock access with selective disclosure, move money without exposing everything, show trust without doxxing history, and turn hidden computation into a public result. World ID centers on proving real-and-unique personhood without sharing personal information; Privado centers on selective disclosure and proof-based access; Zcash centers on private peer-to-peer payments; Reclaim centers on turning Web2 facts into privacy-preserving proofs; ZK Email turns a familiar email action into wallet control. [8]
Voluntary behaviors already happening:
people repeatedly prove human-ness to stop bots, duplicate accounts, and abuse in sign-up, rewards, referrals, and governance flows; [9]
people use private or privacy-preserving payments where public-chain transparency is too revealing for payroll, settlement, or everyday payments; [10]
people prove age, KYC, employment, or eligibility without uploading full documents to every service; [11]
people accept reputation/eligibility badges when those badges unlock booking, access, distributions, or anti-sybil rewards. [12]
User superpowers:
prove X without leaking Y is the core superpower across personhood, age, work eligibility, and compliance flows; [13]
move or receive funds with private context is the superpower across Zcash and Stellar privacy-pool style systems; [14]
turn an everyday action into an on-chain action is the superpower in ZK Email and x402-like payment flows; [15]
carry portable trust is the superpower across World ID, Privado, Human Passport, and zk-badge style systems. [16]
Public flex artifacts: successful systems tend to emit a replayable artifact that is understandable without a cryptography lecture: a verified human/passport status, a reputation badge, a private-but-valid booking credential, a leaderboard entry, a proof-backed payout, a wallet transaction, or a successful cash-out. Human Passport explicitly positions itself around directing funds and access to real humans; Stellar private-payment and MoneyGram flows create inspectable payment state; proof-backed games create public scoreboards. [17]
Tuesday pull: products become sticky when users return for ordinary recurring reasons rather than emergency exceptions: recurring bot-resistant sign-ins, claiming rewards, receiving payouts, cashing in/out, proving access, proving job/identity facts, or reusing credential flows across services. World ID, Human Passport, Reclaim, MoneyGram Ramps, and SDP all map to repeated operational loops rather than one-off novelty. [18]
Serious value behind cool surfaces:
Human Passport reports over 2 million passports created and more than $500 million in airdrop and grant funds protected, which is direct buyer/budget evidence for personhood gating. [19]
Anchor Platform implements SEP-6, SEP-10, SEP-12, SEP-24, SEP-31, and SEP-38 flows, which is direct evidence that real ramp/compliance/payment infrastructure buyers exist on Stellar. [20]
Stellar Disbursement Platform is explicitly for organizations making bulk payments over Stellar, which is concrete budget-backed distribution behavior. [21]
MoneyGram Ramps is an existing product for cash-in/cash-out USDC on Stellar through third-party apps, which is concrete real-world remittance/settlement adjacency. [22]
Pain/rescue traps to avoid: the weak shape is “we fix compliance/paperwork/ops pain” where the first screen is a verifier dashboard, checklist, or admin console. The Hunter rules explicitly reject proof packets and operator boards as the front stage, and the contest brief warns that proof logs and manifests are evidence surfaces, not the hero. Stellar docs also show that the cryptographic primitive is only one layer; if the visible result is just “a proof verified,” the demo reads as plumbing. fileciteturn0file1 fileciteturn0file2 fileciteturn0file3 [6]
Audience and product scope evidence
Audience Proximity Anchors
Non-domain judge personal stakes: the closest human stakes are already legible in adjacent products: stopping bots and claim farming, proving age or eligibility without oversharing, sending or receiving money privately, cashing out in the real world, privately booking or transacting with trust, and proving a score/work result is legitimate. Those are all arcs that a non-crypto judge can roleplay immediately. [23]
Familiar first-5s desire or pressure hooks:
“Prove I’m a real person, not a bot.” [9]
“Prove I’m eligible without handing over my whole identity.” [11]
“Send or receive money without exposing the full trail.” [10]
“Get a real payout/cash-out.” [24]
“Show this score/result wasn’t faked.” [25]
Public demo hooks: the strongest public hooks are judge-editable inputs that visibly mutate output: a changed credential query changes access; a changed human/passport status changes eligibility; a changed private input changes whether a trade/order/booking can proceed; a changed replay changes the leaderboard; a changed payment proof changes whether settlement occurs. The recurring pattern in the best adjacent demos is proof → immediate state change → inspectable object. [26]
Retell lines: the most retellable lines in this arena are short and human-close:
“I proved I was eligible without revealing the underlying data.” [11]
“I moved money privately, but the chain still enforced the rules.” [10]
“I proved the result was real before the contract updated.” [27]
“I got the payout because the proof passed.” [28]
Industry buyers behind human-close arenas: grants and airdrops buy personhood protection; wallets and exchanges buy bot defense and ramp integration; institutions and regulated services buy KYC/AML-compatible disclosure; organizations buy bulk payouts; marketplaces and travel/rental surfaces buy private-but-verifiable reputation; remittance/ramp operators buy settlement rails. The source base for those buyer classes is unusually explicit in Human Passport, Anchor Platform, SDP, MoneyGram, and Stellar privacy docs. [29]
Product Ambition Patterns
Beachhead vs product examples:
World ID’s beachhead is one-person-one-action anti-bot verification; the broader product is a reusable trust layer with multiple credentials. [30]
Privado’s beachhead can be an age/KYC/selective-disclosure gate; the broader product is an issuer/verifier/wallet system for on-chain and off-chain credential exchange. [31]
Reclaim’s beachhead is “verify one fact from one website”; the broader product is zkTLS-based user-data verification across services. [32]
ZK Email’s beachhead is wallet control by email; the broader product is an extension-based proof layer for many wallet commands. [33]
Stellar private payments’ beachhead is deposit/transfer/withdraw privacy; the broader product is a compliance-aware privacy pool engine. [34]
Adjacent-case expansion patterns: evidence repeatedly shows the best systems widening from one vivid case to a reusable engine:
personhood → age → document-backed access → reputation; [35]
one website proof → many websites/providers → policy-driven eligibility; [36]
one proof verifier → many proofs/circuits/versions through a routing layer or deploy-time configuration; [37]
one game/result claim → broader anti-cheat or proof-of-performance lanes; [38]
one payout flow → organization-grade disbursement and ramp stacks. [39]
Reusable engines observed: the repeated engines are not “chat with proofs”; they are credential issuance/verification stacks, Merkle/nullifier membership systems, relayer-plus-prover pipelines, verifier routers/governance wrappers, payout/disbursement state machines, and user-owned portable trust artifacts. Those engines show up across World ID, Privado, Semaphore, Human Passport, Stellar RISC Zero verifier, and Anchor/SDP. [40]
Narrowness traps:
single-circuit math demos prove integration but not audience pull; [41]
fixed-verification-key wrappers constrain flexibility and later product scope; [42]
local-only unlimited-limit environments can make a flow look feasible before target-network costs are real; [43]
proofs with no owned artifact or replayable result collapse into a “proof dashboard”; fileciteturn0file1 fileciteturn0file2
Comparative autopsies
10x10 Autopsy Pack
HACK entries
HACK — Groth16 Verifier Contract
Source/title/date: stellar/soroban-examples README; example presented at Stellar Developer Meeting on Dec. 19, 2024. URL: cited source. User/action: developer submits Circom-generated proof, verification key, and public output for a simple a*b=c circuit. State change: Soroban verifier example executes successfully if parsing and verification pass. Result artifact: proof.json, verification_key.json, public.json, plus successful test execution. ZK/Stellar or adjacent primitive: Groth16 on Soroban, Circom2 artifacts, BLS12-381-era verifier example. Packaging move: smallest-possible arithmetic demo with reproducibility artifacts included. Clone trap / later decision constrained: good plumbing proof, weak front-stage product; if the hero remains “here is a verifier,” it becomes backstage proofware. [44]
HACK — Private Payments for Stellar
Source/title/date: NethermindEth/stellar-private-payments; repo current on GitHub, marked WIP. URL: cited source. User/action: user deposits, transfers, or withdraws while proofs are generated client-side in the browser. State change: Soroban contracts permit private movement only when Groth16, ASP membership, and non-membership checks pass. Result artifact: private payment state plus proof-backed pool behavior. ZK/Stellar or adjacent primitive: Circom Groth16, ASP membership trees, browser proving, Soroban contracts. Packaging move: privacy pool plus compliance guardrails, not privacy alone. Clone trap / later decision constrained: easy to drift into an ASP/admin console or proof-log demo; the user-facing consequence must stay central. [45]
HACK — Stellar RISC Zero Verifier
Source/title/date: NethermindEth/stellar-risc0-verifier; repo current on GitHub; unaudited. URL: cited source. User/action: contract developer integrates proof verification and routes proof seals through the verifier stack. State change: verify() accepts or rejects a RISC Zero Groth16 receipt before downstream contract logic proceeds. Result artifact: seal, selector, journal hash, and routed verifier result. ZK/Stellar or adjacent primitive: RISC Zero receipts, Groth16 verifier, BN254 path, Soroban router/timelock/emergency stop. Packaging move: infrastructure-first verifier with governance and emergency controls. Clone trap / later decision constrained: adds real upgrade/governance surface; if omitted from later claims, the product will overclaim simplicity. [46]
HACK — rs-soroban-ultrahonk
Source/title/date: NethermindEth/rs-soroban-ultrahonk; repo current on GitHub; unaudited. URL: cited source. User/action: developer runs just deploy and just verify locally or on testnet for a Noir(UltraHonk) verifier wrapper. State change: on-chain verify_proof succeeds against the deployed contract. Result artifact: contract ID, proof, public inputs, and optional cost report. ZK/Stellar or adjacent primitive: Noir, Barretenberg, UltraHonk, Soroban verifier wrapper. Packaging move: one-command local/testnet pipeline. Clone trap / later decision constrained: if the whole pitch is “we can verify a proof on testnet,” the scene is too developer-internal. [47]
HACK — Noir UltraHonk Soroban Verifier Contract
Source/title/date: indextree/ultrahonk_soroban_contract; repo current on GitHub. URL: cited source. User/action: developer deploys with a verification key and later submits public_inputs and proof. State change: contract accepts or rejects the proof against the deploy-time VK. Result artifact: deploy-time VK binding plus proof-verification call. ZK/Stellar or adjacent primitive: Noir(UltraHonk) verifier wrapper for Soroban. Packaging move: minimal wrapper around a verifier rather than a full app. Clone trap / later decision constrained: fixed VK at deploy time narrows dynamic multi-circuit product stories unless the architecture is widened later. [48]
HACK — Circom Groth16 on Stellar
Source/title/date: James Bachini, “Circom Groth16 on Stellar,” posted June 10, 2026. URL: cited source. User/action: developer or judge feeds private inputs into a trivial multiplication circuit, generates a proof with snarkjs, and submits bytes to a Stellar verifier contract. State change: on-chain result returns true if the proof matches the public output. Result artifact: frontend visual plus testnet assertion that a*b=c. ZK/Stellar or adjacent primitive: Circom, Groth16, snarkjs, Soroban verifier, Stellar SDK. Packaging move: tutorial pairs backend script with a React demo so the plumbing is visible. Clone trap / later decision constrained: toy arithmetic makes verification legible, but it does not by itself prove demand or front-stage pull. [49]
HACK — Noir on Stellar
Source/title/date: James Bachini, “How To Verify Noir Ultrahonk Circuits In A Stellar Contract,” posted 2026. URL: cited source. User/action: prover demonstrates a hidden limit price is above a public market price without revealing the private value. State change: a Stellar contract verifies the UltraHonk proof rather than inspecting the hidden value. Result artifact: proof bundle plus contract-verification outcome for a confidential trading-condition demo. ZK/Stellar or adjacent primitive: Noir, Barretenberg, UltraHonk, Soroban verifier. Packaging move: uses a financial logic example instead of a pure math toy. Clone trap / later decision constrained: the author notes CPU limits are borderline before Protocol 26-era improvements, so any later concept depending on large UltraHonk proofs must benchmark the exact circuit. [50]
HACK — Building Web3 Games With Stellar & RISC Zero
Source/title/date: James Bachini, “Building Web3 Games With Stellar & RISC Zero,” posted March 9, 2026. URL: cited source. User/action: player types a challenge; replay bytes are encoded and proved. State change: leaderboard updates only after Soroban verifies the proof and validates a superior score. Result artifact: public journal with challenge ID, prompt hash, player key, score, WPM, accuracy, and duration. ZK/Stellar or adjacent primitive: RISC Zero zkVM, Groth16 verifier on Stellar, on-chain leaderboard. Packaging move: anti-cheat becomes a playable public artifact instead of a backend integrity claim. Clone trap / later decision constrained: without the replayable leaderboard or judge-editable input, the same stack would read as invisible integrity middleware. [25]
HACK — LocalPro
Source/title/date: ETHGlobal, “LocalPro,” created at ETHGlobal Lisbon. URL: cited source. User/action: local worker onboards, completes an offline task, and receives proof-backed credentials and settlement. State change: proof-of-performance and reputation logic unlock new offers and automated payout flow. Result artifact: credentialed worker state plus payout/reputation outcome. ZK/Stellar or adjacent primitive: Polygon ID credentials, account abstraction, private payment address path, off-chain evidence processing. Packaging move: workforce proof is packaged as worker growth and payment, not just compliance. Clone trap / later decision constrained: if presented as municipal/procurement workflow software first, it becomes operator-only and loses judge proximity. [51]
HACK — Decentral Couch
Source/title/date: ETHGlobal, “Decentral Couch,” created at ETHSanFrancisco 2022. URL: cited source. User/action: guest proves personhood, KYC status, sex, or past review quality to insta-book without exposing full history. State change: anonymized badges and verified conditions unlock booking and escrow behaviors. Result artifact: zk-badges plus booking/escrow state. ZK/Stellar or adjacent primitive: Polygon ID zk claims, anonymized NFT badges, smart-contract escrow, off-chain messaging. Packaging move: privacy-preserving reputation is framed through travel and booking, which a judge can understand instantly. Clone trap / later decision constrained: the team documents verifier limitations and badge workarounds, so later builds must not overclaim arbitrary proof flexibility. [52]
PROD entries
PROD — World ID
Source/title/date: World docs, “World ID,” docs current; last-updated page available in docs. URL: cited source. User/action: user proves they are real and unique, or presents document/selfie-backed credentials. State change: relying party grants one-person-one-action access, anti-bot gating, or abuse resistance without collecting raw personal data. Result artifact: proof of human or other credential-backed verification outcome. ZK/Stellar or adjacent primitive: unlinkable ZK proofs, on-device proof generation, MPC-based uniqueness checks. Packaging move: “stop bots and duplicate accounts” is the surface; privacy architecture is backstage. Clone trap / later decision constrained: if the surface becomes “identity infrastructure,” non-domain judges stop caring. [30]
PROD — Privado ID
Source/title/date: Privado ID docs; current docs page. URL: cited source. User/action: user receives credentials and later proves selected attributes for onboarding, gating, login, or age/KYC checks. State change: verifier grants access or acceptance based on selective disclosure and proof validation. Result artifact: reusable credential plus proof response, on-chain or off-chain. ZK/Stellar or adjacent primitive: zero-knowledge verifiable credentials, nullifiers, on-chain/off-chain verification, issuer/verifier/wallet stack. Packaging move: the product is framed as developer tooling for trusted relationships, not a raw proof primitive. Clone trap / later decision constrained: if later concepts rely on full-document upload instead of selective queries, they miss the point of the stack. [31]
PROD — Human Passport
Source/title/date: human.tech docs, “Human Passport,” updated June 2, 2026. URL: cited source. User/action: user creates a passport that communities, institutions, airdrops, or grant programs can use to verify they are a real human. State change: funds or access are directed to real unique humans rather than bots or intermediaries. Result artifact: verified passport state used in grant/airdrop/access decisions. ZK/Stellar or adjacent primitive: sybil resistance, identity verification, ZK identity checks. Packaging move: strong buyer proof — the docs claim more than 2 million passports created and more than $500 million in funds protected. Clone trap / later decision constrained: if the first beat becomes a passport score dashboard instead of the protected distribution outcome, the value reads as admin tooling. [19]
PROD — Semaphore
Source/title/date: Semaphore docs, “What Is Semaphore?”, current V4 documentation. URL: cited source. User/action: group member casts an anonymous message, vote, or endorsement. State change: system proves group membership and prevents double-signaling without revealing identity. Result artifact: verifiable anonymous signal tied to a nullifier rule. ZK/Stellar or adjacent primitive: Merkle groups, nullifiers, on-chain verification, off-chain proof generation. Packaging move: simple user story — anonymous membership signal — on top of reusable infrastructure. Clone trap / later decision constrained: if later products surface only the group tree and proof internals, they become primitive demos, not user scenes. [53]
PROD — Reclaim Protocol
Source/title/date: Reclaim docs, current docs page. URL: cited source. User/action: user logs into a website where a fact already exists, and Reclaim proves the required fact without collecting unnecessary extra data. State change: service can make a business decision on verified user information without document upload. Result artifact: privacy-preserving proof derived from HTTPS requests. ZK/Stellar or adjacent primitive: zkTLS, client-side verification, provider templates. Packaging move: replaces documents with “prove from the source where the truth already lives.” Clone trap / later decision constrained: if later concepts rely on unverifiable screenshots/PDF uploads instead of source-derived claims, they lose the trust upgrade. [32]
PROD — ZK Email Email Wallet
Source/title/date: ZK Email docs, “Email Wallet” overview. URL: cited source. User/action: user sends a human-readable email like “Send 1 ETH to recipient@gmail.com.” State change: relayer generates a zk proof of DKIM-signed email data, contract validates it on-chain, and the wallet executes the transaction without exposing the email identity on-chain. Result artifact: executed wallet transaction plus emailed confirmation. ZK/Stellar or adjacent primitive: zk proof of DKIM signature, relayer/prover, contract wallet, privacy-preserving parsing. Packaging move: familiar email command UI hides the cryptography beneath. Clone trap / later decision constrained: if later demos start with proving email internals rather than the wallet action, the scene becomes too backend-first. [33]
PROD — Zcash
Source/title/date: z.cash homepage, current site. URL: cited source. User/action: user makes private peer-to-peer payments with shielded ZEC. State change: funds move while transaction context is encrypted rather than fully transparent. Result artifact: shielded payment and wallet balance state. ZK/Stellar or adjacent primitive: zero-knowledge encryption for private payments, shielded transactions, unified addresses ecosystem. Packaging move: the surface is “encrypted electronic cash,” not “cryptographic plumbing.” Clone trap / later decision constrained: privacy products that cannot answer “what money movement got easier/safer?” risk becoming abstract ideology rather than utility. [54]
PROD — MoneyGram Ramps
Source/title/date: Stellar docs, “MoneyGram Ramps,” updated Apr. 7, 2026. URL: cited source. User/action: wallet or exchange user cashes in or cashes out USDC on Stellar through a third-party app. State change: fiat/USDC boundary is crossed through a real product flow rather than a crypto-native-only loop. Result artifact: cash-in or withdrawal state in a wallet/exchange experience. ZK/Stellar or adjacent primitive: Stellar USDC rails, ramp integration. Packaging move: real-world cash access makes settlement legible to non-crypto users. Clone trap / later decision constrained: if a later concept ignores cash-in/cash-out adjacency, it may stay trapped in purely onchain demos with weak real-world pull. [22]
PROD — Anchor Platform
Source/title/date: Stellar docs, “Anchor Platform,” current docs page. URL: cited source. User/action: wallet, exchange, or anchor operator implements deposits, withdrawals, authentication, KYC/AML handling, quotes, and cross-border payment processing. State change: ramp/payment lifecycle progresses through tracked SEP-based states instead of custom one-off integrations. Result artifact: standardized transaction lifecycle with status tracking and webhook callbacks. ZK/Stellar or adjacent primitive: Stellar SEP-6, SEP-10, SEP-12, SEP-24, SEP-31, SEP-38, SEP-45 interfaces. Packaging move: protocol complexity is absorbed into a reusable operations stack. Clone trap / later decision constrained: later concepts should borrow the durable state-object pattern, not the operator-console surface. [20]
PROD — Stellar Disbursement Platform
Source/title/date: Stellar docs, “Stellar Disbursement Platform,” last updated Dec. 9, 2025. URL: cited source. User/action: organization makes bulk payments to a group of recipients. State change: payout batch moves from pending operations into completed disbursements over Stellar. Result artifact: recipient payment state across an organization-run distribution flow. ZK/Stellar or adjacent primitive: Stellar payout infrastructure; adjacent to proof-gated payroll/grant/remittance use cases. Packaging move: “bulk payments” is a very clear buyer-owned durable object. Clone trap / later decision constrained: if later concepts cannot point to a durable payout/distribution object, they risk feeling like a one-shot stunt rather than a product wedge. [21]
Pattern Extraction Matrix
Judge-controlled action: the repeated strongest mechanic is a judge changing one meaningful input — eligibility, identity state, payment intent, replay/score, booking conditions, or market condition — and seeing a binary or ranked consequence. This is visible in World ID, Privado, Semaphore, ZK Email, typing-game proofs, LocalPro, and Decentral Couch. [55]
5-second replayable state change: the most replayable outputs are access granted/denied, booking unlocked/blocked, leaderboard updated/not updated, payout sent/not sent, cash-out completed, or wallet command executed. Proof verification is backstage; the replayable scene is the state mutation. [56]
Shareable or comparable artifact: successful entries emit artifacts people can compare or forward: badges, passports, scores, receipts, credential states, payouts, booking states, or payment transactions. The artifact does not need to expose secrets, but it must be concrete. [57]
Where ZK is load-bearing: ZK is load-bearing when it substitutes for a disallowed reveal or disallowed recomputation: hidden inputs in Noir/Circom examples, anonymous-but-unique signaling in Semaphore, personhood/age proof in World/Privado/Human Passport, source-derived data proof in Reclaim, DKIM proof in Email Wallet, and privacy-preserving payment validity in Zcash/private-payment systems. [58]
Where Stellar would be load-bearing: Stellar becomes load-bearing when the proof result changes a Soroban contract, payout/disbursement flow, cash-in/cash-out path, or Stellar-settled payment object. The strongest evidence is in on-chain verifiers, privacy-pool prototypes, MoneyGram Ramps, Anchor Platform, SDP, and x402-on-Stellar. [59]
Buyer or budget signal: the clearest buyer signals are grants/airdrops/fund distribution, KYC/AML-compliant ramps, bulk payout operators, cross-border payment stacks, and products protecting real money or high-value access. Human Passport, Anchor Platform, SDP, MoneyGram, and Stellar privacy docs are especially strong here. [29]
Danger of becoming a proof dashboard: the risk is highest whenever the visible artifact is “proof, verification key, selector, seal, log, benchmark, admin policy, or checklist” rather than a human-close outcome. The Hunter files explicitly warn against that shape, and many Stellar examples are deliberately tiny plumbing demos that should be treated as integration evidence, not end-user product evidence. fileciteturn0file1 fileciteturn0file2 [60]
Build-proof guardrails
Product Loop Borrowing Menu
Borrow “private proof, public consequence.” The proof should stay backstage while the user-visible outcome becomes a payout, access result, booking, score, or transfer. That structure is repeated across World ID, Human Passport, Semaphore, Email Wallet, and Stellar private payments. [61]
Borrow “portable trust artifact.” Products are stronger when the user leaves with a reusable badge, credential, passport state, score, journal, or receipt rather than a one-time verification toast. [62]
Borrow “client-side proving, on-chain verification.” Reclaim, Stellar private payments, and several Stellar tutorials center the user device or frontend for proof generation and reserve the chain for compact verification and state change. [63]
Borrow “proof-backed replay artifact.” The typing-game journal is a useful structural lesson: the artifact is not just that the proof was valid, but that it created a public object others can inspect or compare. [25]
Borrow “selective disclosure query, not identity dump.” Privado, World, and Reclaim all show that the product surface should ask for the minimum proof needed, not the full document or full identity. [64]
Borrow “compliance hooks in the back room.” Stellar privacy docs and Nethermind’s private-payments prototype show that view-key/ASP-style controls can exist without becoming the main scene. [65]
Borrow “one vivid beachhead, reusable engine underneath.” World ID, Reclaim, Email Wallet, and Anchor Platform all expose a simple first action while hiding a broader reusable engine behind it. [66]
Backstage Submission Constraints
Contest-level requirements already fixed: public source repository, clear README.md, and a 2–3 minute demo video showing what was built and what ZK does; ZK must be meaningful and the project should touch Stellar via contract verification or another real testnet/mainnet integration. The uploaded brief also records the submission deadline as 2026-06-29 12:00 PST. fileciteturn0file3
Logs, benchmarks, proofs, and manifests likely required as evidence surfaces:
proof bytes, public inputs, verification keys, and reproducibility artifacts appear in Stellar’s Groth16 example; [44]
contract IDs, selector bytes, journal hashes, and seals appear in the RISC Zero verifier flow; [67]
cost measurement and testnet verification steps appear explicitly in rs-soroban-ultrahonk; [68]
private-payments prototypes expose pool/verifier/ASP component structure and browser proof paths. [69]
Reproducibility and disclosure requirements likely to matter: mark prototype/audit status honestly, disclose when something is testnet-only or localnet-only, disclose if a setup depends on unlimited limits or simulation-only metering, and keep build/test/deploy instructions runnable. Stellar’s official and near-official repos repeatedly label examples as demo-only, WIP, or unaudited. [70]
Constraints that should not become the product name or first demo beat: proof logs, benchmarks, manifests, contract selectors, CPU limits, audit disclaimers, and verifier dashboards are necessary backstage proof but weak front-stage storytelling. That warning appears both in the uploaded Hunter rules and in the uploaded contest brief. fileciteturn0file1 fileciteturn0file2 fileciteturn0file3
Research validity checks
Weak Source Rejections
Weak source shape: pure primitive docs used as product evidence. CAPs and verifier repos are strong evidence of feasibility, but weak evidence of user pull by themselves. They should constrain technical honesty, not product demand claims. [71]
Weak source shape: toy arithmetic demos treated as product-market proof. The Groth16 multiplier and similar tutorials are excellent integration evidence but weak evidence for user desire, comparability, or buyer pull. [41]
Weak source shape: unaudited reference implementations treated as production readiness. Stellar private payments, Stellar RISC Zero verifier, rs-soroban-ultrahonk, and the Soroban Groth16 example all explicitly disclose demo/WIP/unaudited status. They should not be used to justify production-grade claims. [72]
Weak idea shape: proof dashboard / admin console / checklist hero. The uploaded Hunter references explicitly reject this, and the contest brief also warns not to make proof logs, benchmarks, or manifests the first beat. fileciteturn0file1 fileciteturn0file2 fileciteturn0file3
Weak source gap: private BUIDL/submission list. The uploaded brief notes that submissions are private on DoraHacks, so private submission lists should not constrain direction unless organizers later expose them. fileciteturn0file3
Research Red-Team
Evidence gaps: the browser tool could not directly fetch the live DoraHacks page due rate limiting, so contest framing here relies on the uploaded distilled bounty brief for the exact challenge wording, prize split, and submission requirements. Before build, the live form fields and any late edits on the organizer page should be rechecked manually. fileciteturn0file3
Likely overclaimed technical paths:
“Noir proofs are cheap now” can still be overstated; Protocol 26 makes Noir verification cheaper than Wasm-side implementations, but not magically free, and even tutorial authors note borderline CPU limits for UltraHonk before/around this transition. [73]
“Primitives = app” is false; Stellar’s own docs say BN254 and Poseidon primitives alone do not provide end-to-end private payments. [6]
“Compliance-ready privacy” can be overclaimed unless ASP/view-key, denylist, or inspection paths are actually implemented. Stellar privacy docs describe those hooks, but that does not mean any given project inherits them automatically. [65]
What must be verified with official docs or code before build:
the exact proof system/circuit combination that fits Soroban resource limits on the intended network version; [74]
whether the chosen verifier path is testnet-ready, mainnet-ready, or localnet-only in practice; [75]
the exact host-function and parameter dependencies for BN254 and Poseidon/Poseidon2; [76]
whether the proof result can be made judge-inspectable through contract state, tx hash, payout state, or another durable artifact on Stellar. fileciteturn0file3 [77]
What would make a project ineligible or boring:
ZK is present but not load-bearing; fileciteturn0file3
Stellar is mentioned but invisible in the hero path; fileciteturn0file3
the demo is local-only verification with no meaningful Stellar consequence; fileciteturn0file3 [6]
the first minute is a verifier dashboard, proof packet, benchmark screen, or setup checklist; fileciteturn0file1 fileciteturn0file2 fileciteturn0file3
claims imply production readiness even though the dependency stack is demo-only or unaudited; [78]
the strongest honest reaction is “useful plumbing” rather than “I want to try that state change myself.” fileciteturn0file1 fileciteturn0file2

[1] [3] [6] ZK Proofs on Stellar | Stellar Docs
https://developers.stellar.org/docs/build/apps/zk
[2] [7] [59] [65] [77] Privacy on Stellar | Stellar Docs
https://developers.stellar.org/docs/build/apps/privacy
[4] [5] Software Versions | Stellar Docs
https://developers.stellar.org/docs/networks/software-versions
[8] [9] [13] [16] [18] [23] [30] [35] [40] [55] [61] [66] World Developer Docs
https://docs.world.org/world-id
[10] [14] [54] Zcash: Privacy-protecting digital currency
https://z.cash/
[11] [31] [62] [64] Privado ID Documentation
https://docs.privado.id/
[12] [52] Decentral Couch | ETHGlobal
https://ethglobal.com/showcase/decentral-couch-g1xtk
[15] [26] [33] Overview | Email Wallet | ZK Email
https://docs.zk.email/email-wallet
[17] [19] [29] [57] Human Passport - human.tech docs
https://docs.human.tech/passport
[20] [39] The Anchor Platform: Build and Manage On/Off-Ramps on the Stellar Network | Stellar Docs
https://developers.stellar.org/docs/platforms/anchor-platform
[21] [28] Stellar Disbursement Platform Introduction | Stellar Docs
https://developers.stellar.org/docs/platforms/stellar-disbursement-platform
[22] [24] MoneyGram Ramps | Stellar Docs
https://developers.stellar.org/docs/tools/ramps/moneygram
[25] [27] [38] [56] Building Web3 Games With Stellar & RISC Zero – JamesBachini.com
https://jamesbachini.com/stellar-risc-zero-games/
[32] [36] [63] Reclaim Protocol Docs
https://docs.reclaimprotocol.org/
[34] [45] [69] [72] [78] GitHub - NethermindEth/stellar-private-payments: Nethermind Privacy Engineering team&#39;s implementation of private payments for the Stellar network · GitHub
https://github.com/NethermindEth/stellar-private-payments
[37] [46] GitHub - NethermindEth/stellar-risc0-verifier: Implementation of the Risc0 verifier for Stellar blockchain · GitHub
https://github.com/NethermindEth/stellar-risc0-verifier
[41] [44] [60] [70] soroban-examples/groth16_verifier at main · stellar/soroban-examples · GitHub
https://github.com/stellar/soroban-examples/tree/main/groth16_verifier
[42] [48] GitHub - indextree/ultrahonk_soroban_contract: Soroban contract for Ultrahonk Verifier · GitHub
https://github.com/indextree/ultrahonk_soroban_contract
[43] [50] [58] How To Verify Noir Ultrahonk Circuits In A Stellar Contract – JamesBachini.com
https://jamesbachini.com/noir-on-stellar/
[47] [68] [75] GitHub - NethermindEth/rs-soroban-ultrahonk · GitHub
https://github.com/yugocabrio/rs-soroban-ultrahonk
[49] Circom Groth16 on Stellar – JamesBachini.com
https://jamesbachini.com/circom-on-stellar/
[51] LocalPro | ETHGlobal
https://ethglobal.com/showcase/localpro-xckra
[53] What Is Semaphore? | Semaphore
https://docs.semaphore.pse.dev/
[67] Stellar | Verifying RISC Zero Execution In A Stellar Smart Contract
https://stellar.org/blog/developers/risc-zero-verifier
[71] [76] stellar-protocol/core/cap-0080.md at master · stellar/stellar-protocol · GitHub
https://github.com/stellar/stellar-protocol/blob/master/core/cap-0080.md
[73] [74] Stellar | Stellar Yardstick, Protocol 26 Upgrade Guide
https://stellar.org/blog/foundation-news/stellar-yardstick-protocol-26-upgrade-guide