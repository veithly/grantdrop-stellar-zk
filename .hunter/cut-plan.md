# Cut Plan: GrantDrop

## Must keep

- Public hosted access or concrete G5 Cloudflare Pages deploy handoff with command and owner.
- One complete end-to-end core loop: open campaign, choose private input, sign claim, create receipt, reopen receipt, inspect proof/Stellar detail.
- Sponsor/domain primitive: Stellar-linked transaction or contract state that blocks paid receipt if unavailable.
- Runtime proof: Playwright flow for valid, invalid, duplicate, receipt replay, mobile, and inspection.
- Empty, loading, validation, success, rejected, already-claimed, pending, failed, and degraded states.

## Can cut now

- Self-serve campaign creation and any operator dashboard.
- Extra charts, analytics, profile/settings pages, theme switches, and broad grant workflow.
- Mainnet, real funds, KYC, custody, compliance, and external credential provider integrations.

## Cut last

- Public receipt replay because it proves return value and no-wallet exception.
- Receipt inspection because it proves ZK/Stellar credibility.
- The stamped receipt success frame because it carries the 5-second judge memory.

## Why cut

Breadth is removed so the core workflow, public access, sponsor value, proof path, and runtime tests stay credible before deadline. One campaign with one proof rule beats a wider surface with unverifiable success.

## Risk if cut

Cutting the core loop, sponsor reference, receipt replay, or proof inspection would leave a claim booth that looks polished but cannot prove real state, which fails both judges and the Real-World ZK contest bar.
