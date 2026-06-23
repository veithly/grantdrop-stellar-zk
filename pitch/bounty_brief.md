# Bounty Brief: Stellar Hacks: Real-World ZK

> Distilled from the DoraHacks hackathon detail page on 2026-06-21 using the real browser page text.

## URL

https://dorahacks.io/hackathon/stellar-hacks-zk/detail

## Deadline

Submission deadline: 2026-06-29 12:00 PST.

The DoraHacks page also renders this in the local browser timeline as `2026/06/30 03:00`, matching Asia/Shanghai time.

## Theme / Track

Single open innovation track for projects that use zero-knowledge technology on Stellar.

Official page framing:

- Build anything with zero-knowledge on Stellar.
- Examples include privacy pools, private payments, confidential tokens, identity and compliance proofs, provable computation, and verifiable data.
- ZK must do real work, not appear only in the README.
- Real-world Stellar use cases are especially welcome: stablecoins, cross-border payments, tokenized real-world assets, and institutional settlement.

## Prize Structure

- First Place: $5,000 in XLM
- Second Place: $2,000 in XLM
- Third Place: $1,250 in XLM
- Fourth Place: $1,000 in XLM
- Fifth Place: $750 in XLM

Total prize pool: $10,000.

## Required Construct Primer

- Required construct: zero-knowledge technology integrated with Stellar.
- Official minimum: include some form of zero-knowledge technology and integrate it with Stellar, for example by verifying proofs within a Stellar smart contract or otherwise integrating Stellar testnet/mainnet.
- What counts:
  - Proof generation off-chain using a higher-level ZK system such as Noir, Circom, or RISC Zero.
  - A Stellar/Soroban contract or Stellar integration that verifies, records, gates, settles, or inspects the result.
  - The ZK proof changes the user's actual product outcome.
- What does not count:
  - A README that namechecks ZK.
  - A generic dashboard with a fake hash or static proof log.
  - A proof bundle that has no user-facing consequence.
  - A local-only verifier with no Stellar path unless the limitation is made explicit and the product still integrates Stellar meaningfully.
- First-minute demo proof required:
  - A judge changes input, generates or submits a proof, sees Stellar-linked verification or settlement, and can inspect the resulting proof/transaction/contract state.
- Binding constraint for ideation:
  - Every candidate must make ZK load-bearing and Stellar-visible within the hero path, while keeping the first user action understandable to a non-domain judge.

## Accepted / Encouraged Technical Paths

- RISC Zero: off-chain computation with proof verified in a Stellar smart contract.
- Circom: circuit-based ZK; verify Groth16 proofs within Stellar smart contracts.
- Noir: Rust-like ZK circuit language; Ultrahonk proofs are larger and cost more to verify on-chain.

## Stellar Why-Now From Bounty Page

- Protocol 25, "X-Ray", introduced native host functions for ZK-friendly primitives, including BN254 elliptic-curve operations and Poseidon/Poseidon2 hashing.
- Protocol 26, "Yardstick", added nine additional BN254 host functions, including multi-scalar multiplication, scalar-field arithmetic, and curve-membership checks.
- The page says these host functions make proof verification, including Noir proofs, meaningfully cheaper to run on-chain.
- Earlier BLS12-381 support plus the newer BN254/Poseidon primitives give Stellar the on-chain building blocks to verify zk-SNARK proofs efficiently.

## Submission Requirements

- Public GitHub, GitLab, or Bitbucket repository with full source code.
- Clear `README.md` explaining what was built.
- Short 2-3 minute demo video showing the project working and explaining what ZK does.
- ZK + Stellar: zero-knowledge cryptography must be meaningful and load-bearing, and the project should touch Stellar by verifying proofs in a contract or otherwise integrating Stellar testnet/mainnet.

## Public Signals From Event Page

- 322 hackers displayed on the Details/Ideas tabs during capture.
- BUIDL list is private: "Submissions are set private by the hackathon organizer."
- Tags: Blockchain, ZK, Zero Knowledge, Rust, Noir, RISC Zero, Soroban, Circom.
- Platform technology: Stellar and ZK.

## Inspiration Ideas From Event Page

Mild:

- Proof-of-balance / proof-of-funds
- Age / eligibility check
- Private allowlist membership
- Verifiable off-chain computation
- Anonymous feedback / attestation

Medium:

- Private payment / shielded transfer
- Confidential payroll or invoicing
- Compliant private transfer with a view key
- Private credential / reputation
- Sealed-bid auction or vote
- Proof-of-reserves for an issuer

Spicy:

- Compliant privacy pool with ASP integration
- Confidential token implementation
- Private RWA settlement
- Privacy-preserving on-chain identity
- Private DAO membership and governance

Wild:

- Fully shielded stablecoin wallet
- Private cross-border remittance corridor
- ZK-powered confidential DeFi
- UTXO-style private payment system
- Proof aggregation / recursive proofs on Stellar
- Cross-chain private bridge

## Support Links Mentioned

- Hackathon Primer Twitter Space: https://x.com/i/spaces/1AGRnnLddNyGl?s=20
- RISC Zero docs: https://dev.risczero.com/
- Stellar RISC Zero verifier: https://github.com/NethermindEth/stellar-risc0-verifier/
- RISC Zero + Stellar tutorial: https://jamesbachini.com/stellar-risc-zero-games/
- Circom docs: https://docs.circom.io/
- Stellar Groth16 verifier examples: https://github.com/stellar/soroban-examples/tree/main/groth16_verifier
- Circom + Stellar tutorial: https://jamesbachini.com/circom-on-stellar/
- Noir docs: https://noir-lang.org/docs/
- Soroban Ultrahonk verifier: https://github.com/yugocabrio/rs-soroban-ultrahonk
- Noir + Stellar tutorial: https://jamesbachini.com/noir-on-stellar/
- Stellar Dev Discord: https://discord.gg/stellardev
- Stellar Hacks Telegram Group: https://t.me/+e898qibDUVExODkx

## Constraints To Keep Out Of The Hero

- Proof logs, benchmarks, reproducibility manifests, and contract inspection are evidence surfaces, not the first product beat.
- The first screen should not be a verifier dashboard, audit packet, or setup checklist.
- A judge should understand the user action and visible consequence before reading the ZK explanation.
