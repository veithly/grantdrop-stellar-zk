# Sponsor Depth: GrantDrop

sponsor_track: "Stellar Hacks: Real-World ZK open innovation track"
required_tooling: "Stellar testnet transaction or Soroban contract state plus ZK proof public inputs/nullifier"
primary_prize_only: "yes"
centrality_score_out_of_10: "9.2"
why_core_not_decorative: "The accepted receipt exists only when the claim result is visible as Stellar-linked state."
user_visible_dependency: "The receipt shows a Stellar tx or contract-state reference before it can show paid/accepted."
fallback_if_unavailable: "Show pending, failed, or degraded inspection; never mark the receipt paid without the Stellar reference."
what_breaks_without_it: "Without Stellar, the product collapses into a local eligibility credential and cannot win the Real-World ZK on Stellar prize."
screenshots_or_logs: "G4 will capture success screenshot, receipt inspection, proof command, and tx/contract reference."
submission_answer_draft: "GrantDrop uses ZK to validate private grant eligibility and records the accepted, rejected, or duplicate claim result through Stellar-linked transaction/contract state."

## Sponsor Centrality Test

- Removing the sponsor primitive breaks: the public receipt and inspection path.
- The judge sees the sponsor primitive at: receipt badge, Inspect receipt panel, README command, and demo video.
- It is not merely a panel/status/receipt because: the paid state is blocked until the Stellar reference exists.
- Secondary sponsors/tools omitted from public copy: proof-system internals stay behind the receipt unless needed for inspection.

## Not Applicable Override

not_applicable_reason: ""
