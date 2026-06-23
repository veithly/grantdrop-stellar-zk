# GPT Pro J3 Judging: Build Risk Red Team

This is HackathonHunter J3 judging only. Judge the shortlisted concepts for honest buildability, fake-success risk, and demo proof before the 2026-06-29 deadline.

## Uploaded reference files

- `pitch/bounty_brief.md`
- `pitch/winner_slot.md`
- `pitch/idea_tournament.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`

## Boundary

Do not invent new product concepts. Do not write PRD, UIUX, architecture, implementation plan, code, deck, README, or submission copy. You may name build risks and necessary cuts only. Your output is judging evidence only.

## Build-Risk Lens

The final product must not fake success. A fresh user should be able to perform the hero action; the app should create or read real state; and a Web3/ZK user-owned result needs a wallet/sign/transaction path or clearly valid demo-signer exception. A local-only proof that does not affect a Stellar-visible result is not enough.

## Shortlist To Judge

Use only the `Shortlist For J1-J3` candidates in `pitch/idea_tournament.md`:

- S1 RemitSlip
- S2 Masked Bid Market
- S3 GrantDrop
- S4 Ghost Race Bounty
- S5 FanMint
- S6 ProofTip

## Scoring

Score each shortlisted candidate from 0-5 on:

- P0 narrowness: can be cut to one complete loop without losing the concept.
- Proof feasibility: circuit/proof can be scoped to a simple private condition, threshold, nullifier, or commitment.
- Stellar feasibility: tx, contract state, escrow, payout, mint, or receipt path is plausible with current tooling.
- No regulated dependency: demo does not require real KYC, custody, remittance licenses, or production private payments.
- Wallet path clarity: signer path can be real, or demo signer exception is honest and inspectable.
- Failure-state honesty: fail/blocked/pending states would be visible instead of pretending success.
- Evidence path: README can prove the result with commands, tx/state, screenshots, and limitations.
- Scope-risk: lowest chance of collapsing into a static verifier/dashboard by deadline.

## Required Output

Return:

1. A score table with total score and one-sentence risk rationale for every S1-S6 candidate.
2. Top pick and backup pick for this build-risk lens.
3. Hardest implementation risk for the top pick.
4. Required P0 cuts for the top pick.
5. Minimum verification evidence needed before submission.
6. Whether the top pick should proceed to local concept lock: yes/no.

If every candidate is too risky to build honestly, say `no-lock` and explain why. Do not propose replacement concepts.
