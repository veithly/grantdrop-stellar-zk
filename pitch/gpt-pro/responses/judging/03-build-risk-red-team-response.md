J3 build-risk score table

Scored 0–5 per criterion, total out of 40. I’m treating “honest buildable” as stricter than “cool”: ZK must change the user outcome, Stellar state/tx/contract output must be inspectable, and a local-only verifier or fake hash does not pass. 

bounty_brief

 The shortlist itself requires a wallet/sign/transaction path or an explicitly scoped demo signer path, and every candidate must keep the human result first while proof details stay backstage. 

idea_tournament

| ID | Candidate | P0 narrow | Proof feasible | Stellar feasible | No regulated dependency | Wallet path clear | Failure honesty | Evidence path | Scope-risk safe | Total | One-sentence risk rationale |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| S1 | RemitSlip | 3 | 4 | 4 | 2 | 3 | 4 | 4 | 3 | 27/40 | Strong real-world Stellar fit, but “remittance” is the most likely to overclaim regulated money movement unless cut to a testnet voucher/receipt only. |
| S2 | Masked Bid Market | 4 | 3 | 4 | 5 | 4 | 4 | 4 | 4 | 32/40 | Good non-regulated money scene, but fair sealed-bid settlement is easy to fake unless the P0 is brutally narrowed. |
| S3 | GrantDrop | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 39/40 | Safest honest loop: private eligibility/nullifier proof triggers a visible Stellar payout receipt, with low regulatory dependency and clear fail states. |
| S4 | Ghost Race Bounty | 4 | 3 | 3 | 5 | 4 | 4 | 4 | 3 | 30/40 | Best replay clip, but weaker “real-world Stellar” fit and anti-cheat proof can collapse into a toy/local verifier. |
| S5 | FanMint | 5 | 5 | 4 | 5 | 4 | 4 | 4 | 4 | 35/40 | Very buildable reward/access loop, but it risks reading as generic loyalty unless the hidden fan condition is genuinely private and ZK-load-bearing. |
| S6 | ProofTip | 3 | 3 | 4 | 5 | 4 | 4 | 3 | 3 | 29/40 | Creator payout is attractive, but “proof wins” is underspecified and may fake the proof source unless narrowed to one concrete private condition. |

Top pick and backup pick

Top pick: S3 GrantDrop. It is the strongest build-risk choice because it can be cut to one complete loop: define one grant/airdrop campaign, prove one private eligibility condition, prevent double-claim with a nullifier, and write the accepted/rejected/paid state to Stellar. This matches the winner-slot thesis of a hidden condition unlocking a public Stellar payout/access/receipt and avoids the rejected traps of verifier dashboards, production privacy pools, and regulated partner dependencies. 

winner_slot

Backup pick: S5 FanMint. It is almost as buildable as GrantDrop and likely easier for a cold judge to understand, but it has weaker prize-fit unless the ZK condition is more than “allowlist mint.” The backup should only survive if it produces a real fan reward pass/receipt on Stellar and avoids becoming generic loyalty. 

idea_tournament

Hardest implementation risk for the top pick

For GrantDrop, the hardest risk is making the proof-to-payout path genuinely load-bearing rather than decorative. The demo must show that changing the private eligibility input changes claim success/failure, that the same eligibility cannot claim twice, and that the accepted result is visible through Stellar tx/contract state rather than only inside the browser. The bounty explicitly disqualifies README-only ZK, fake hashes, static proof logs, and local-only proof bundles with no Stellar consequence. 

bounty_brief

Required P0 cuts for GrantDrop

Cut to one campaign, one eligibility rule, one asset/payout path, one claimant role, and one receipt state.

Do not include real grant administration, KYC, sanctions/compliance review, multi-round grants, real fiat/stablecoin distribution claims, admin dashboards, social scoring, partner integrations, privacy-pool language, or production private payments. The concept should stay a demo grant/airdrop claim with a private eligibility proof, a nullifier/double-claim block, and a Stellar-visible accepted/rejected/paid receipt. This respects the tournament cuts: no generic verifier dashboard, no production privacy-pool claim, and no regulated partner dependency for P0. 

idea_tournament

Minimum verification evidence before submission

Before submission, GrantDrop needs evidence that a fresh user can perform the hero action and that success is not faked:

Evidence gate	Minimum proof
Fresh-user hero action	A new wallet/demo signer can attempt a claim without builder-only manual state edits.
ZK load-bearing	Valid private input succeeds; invalid private input fails; proof/public inputs are inspectable.
Double-claim protection	Same private identity/secret cannot claim twice because the nullifier or claim marker blocks it.
Stellar-visible result	Successful claim creates inspectable tx, contract state, payout state, mint state, or receipt state.
Failure-state honesty	Invalid proof, already-claimed, pending tx, rejected claim, and wallet/sign failure are visible as blocked states, not hidden behind “success.”
README/replay evidence	Commands for proof generation/verification, contract/testnet inspection, screenshots, tx/contract ID, and explicit limitations.
Demo video evidence	2–3 minute working demo showing what ZK does and how Stellar is touched, matching the bounty submission requirements. 

bounty_brief


Disclosure evidence	Clear statement of testnet/localnet/demo signer usage, unaudited cryptography, and non-production grant/payment scope. The winner slot already says proof logs, public inputs, verifier path, Stellar tx/contract ID, screenshots, and demo video are expected inspection materials. 

winner_slot

Local concept lock decision

Proceed to local concept lock: yes — S3 GrantDrop.

This is not a no-lock pool. Every candidate has a possible honest path, but GrantDrop has the cleanest combination of narrow P0, simple proof condition, Stellar-visible payout/receipt state, low regulated dependency, clear wallet/demo-signer path, and strong evidence trail before the 2026-06-29 deadline.