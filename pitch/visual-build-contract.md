# Visual Build Contract

## Source truth

- Product source: `PRODUCT.md`.
- PRD source: `pitch/project_prd.md`.
- UIUX source: `pitch/uiux_interaction_plan.md`.
- Mockup source: `docs/ui-mockups/01-hero.png`, `docs/ui-mockups/02-app-frame.png`, `docs/ui-mockups/04-mobile-qr.png`.
- Source markers: `src/App.tsx` uses `data-visual-lane="minimal-product"` and `data-hero-composition="claim-booth-receipt-frame"`.

## First-Glance Clarity

- What is this: Claim a Stellar grant receipt without exposing why you qualify.
- How it works: choose a private input, use a testnet signer, claim the grant, then inspect the receipt.
- First-time user line: pick Valid demo input and press Claim grant.

## Visual direction

- Visual style lane: minimal-product with kinetic receipt booth and stamped GrantDrop receipt.
- Non-Tailwind visual signature: civic claim booth, state rail, receipt flip, Stellar badge, and inspection receipt fields.
- Component-system lock: shadcn/ui-style owned component layer plus Radix Slot, Motion for React, Phosphor icons, and custom CSS tokens.
- Primary UI library: shadcn/ui-style owned component layer with Radix Slot in `src/components/ui/button.tsx`.
- Supporting UI library: Motion for React for receipt flip and inspection reveal.
- Official docs checked: Vite guide, Motion React quick start, Stellar developer/Freighter docs, snarkjs/Circom CLI behavior from local installed packages.
- Install commands: `npm install react react-dom motion @phosphor-icons/react @stellar/stellar-sdk @stellar/freighter-api snarkjs clsx class-variance-authority tailwind-merge @radix-ui/react-slot`; `npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom circom`.
- Tailwind/shadcn rejection note: shadcn-style primitives are plumbing only. The product identity is the receipt booth, proof rail, and inspectable Stellar receipt, not default cards.
- Reference screen worth borrowing: Stripe Issuing receipt and transaction detail surfaces for clear money-state hierarchy, adapted into a civic grant booth.
- Forbidden template face: verifier dashboard, KYC portal, and default shadcn card grid.
- Signature frame to earn: accepted GrantDrop receipt with nullifier, proof digest, and Stellar tx reference visible above the fold.
- Image minimalism reason: GrantDrop is intentionally image-light because the real content artifact is the receipt and proof evidence, not decorative photography.

## Required design skills

- design-taste-frontend workflow: source path `C:/Users/Ricky/.skills-manager/skills/design-taste-frontend/SKILL.md`; visual direction is product UI for judges and claimants, not a landing page, portfolio, or redesign. Anti-template rules applied: no purple AI gradient, no generic card grid, no marketing hero before action.
- impeccable workflow: source path `C:/Users/Ricky/.skills-manager/skills/impeccable/SKILL.md`; register is product from `PRODUCT.md`; product register read. Anti-slop checks applied: restrained color strategy, consistent component vocabulary, clear loading/error/success states, no decorative motion.
- logo-generator workflow: source path `C:/Users/Ricky/.skills-manager/skills/logo-generator/SKILL.md`; logo variants and selected receipt-seal direction are in `pitch/logo-showcase/index.html`; brand pack is in `public/brand`.

## Mockup trace

- `01-hero.png` maps to the campaign claim booth first screen and product sentence.
- `02-app-frame.png` maps to private input, proof/Stellar rail, and accepted receipt frame.
- `04-mobile-qr.png` maps to read-only receipt replay and mobile QR behavior.
- Mockup-to-build lock: source must preserve private input left, state/proof rail middle, receipt right on desktop; mobile stacks campaign, CTA, receipt, then proof details.

## Layout and contrast math

- Hero math: H1 max width 760px; desktop target is two to three lines; mobile font drops to 36px with no viewport-based fluid type.
- H1 width and line-limit: `src/styles.css` caps text width and uses `text-wrap: balance`; no button text can wrap on desktop.
- AIDA coverage: Attention is the H1; Interest is campaign strip and private input chips; Desire is receipt preview and one-claim rule; Action is the single `data-cta-primary` claim button.
- CTA contrast check: honey button text uses dark honey ink; secondary buttons use dark ink on white with border; focus rings are visible.
- Cheap-label sweep: no decorative section-number labels, no buzzword badges, no meta-label strip. The only small label is the event context kicker.

## Motion plan

- Engine: Motion for React.
- Entrance order: campaign booth loads static; receipt appears with a short flip only after terminal state.
- Primary CTA emphasis: active press transform, no decorative pulsing.
- State/result transition: proof rail rows activate separately from receipt creation.
- One signature moment: receipt flips into accepted/rejected/already-claimed state.
- Reduced-motion fallback: CSS `prefers-reduced-motion` removes transition duration while preserving status text.

## Generated cutout asset plan

- Generated image assets: none for P0; product/domain screenshots and brand SVG carry the visual surface.
- Cutout plan: no people/avatar cutouts are used. If future art is added, run `scripts/cutout_assets.mjs` and write outputs to `public/art/cutouts/cutout-manifest.json`.
- Cutout contract: generated cutout assets cannot replace real receipt output.

## Brand asset pack

- `public/brand/logomark.svg`
- `public/brand/wordmark.svg`
- `public/brand/logo-mono.svg`
- `public/brand/og.png`

## Forbidden lookalikes

- Verifier dashboard.
- KYC portal.
- Generic shadcn grid.
- AI-purple gradient shell.
- Proof log page.
- Wallet dashboard with no claim consequence.
