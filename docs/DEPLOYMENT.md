# Deployment

GrantDrop deploys as a static Cloudflare Pages site.

## Cloudflare target

- Project: `grantdrop-stellar-zk`
- Production URL: `https://grantdrop-stellar-zk.pages.dev`
- Build output: `dist`
- Deploy command: `npm run deploy`

## Bindings and secrets

No Cloudflare storage binding is required for this submitted build. The app uses static proof assets, browser IndexedDB, public receipt URL payloads, and Stellar testnet Horizon/Friendbot from the client. There are no D1, KV, R2, Queue, service, or secret bindings to configure.

## Smoke evidence

- Public runtime report: `.hunter/public-runtime.report.json`
- Public smoke report: `.hunter/public-smoke.report.json`
- Desktop success screenshot: `.hunter/public-smoke/desktop-accepted.png`
- Mobile success screenshot: `.hunter/public-smoke/mobile-pixel7-accepted.png`
- Second-context receipt screenshot: `.hunter/public-smoke/second-context-reopen.png`

The latest public smoke run opened the production URL, created accepted desktop and mobile receipts, and reopened the desktop receipt from a second browser context.
