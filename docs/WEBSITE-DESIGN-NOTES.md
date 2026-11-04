# Dean On Deck — approved website design measurements and change controls

Last updated: 2026-11-03 (local US Eastern time)

## Homepage: approved gold microheading dashes

- The reference is the short, thin, understated gold dash shown to the LEFT of “FIND YOUR KIND OF GETAWAY” in the user's screenshot.
- Both the homepage hero eyebrow “DEAN ON DECK · CRUISE TRAVEL” and the next cruise-lines eyebrow “FIND YOUR KIND OF GETAWAY” should have matching gold dashes on BOTH sides.
- Each dash: **1.8rem width** (28.8px at a 16px root font size), **1px height**, **#c8a45c** gold. No long 3rem / 5.5rem dashes. Do not add literal em dashes in the CMS copy; draw lines with CSS pseudo-elements.
- Current scoped CSS is at the end of `src/app/globals.css`: `.hero .log::before`, `.hero .log::after`, `#fleet .log::after`. The fleet left dash already comes from the global `.log::before` rule.
- Gold microheading typography, letter spacing, positioning and surrounding white space are NOT part of the dash correction and must remain unchanged.

## Approved first-page copy and layout

- Hero eyebrow: `DEAN ON DECK · CRUISE TRAVEL` (centered dot).
- Main heading: `Your vacation, your way.`
- Burgundy script: `Your First Mate, All The Way.` (title case, not all capitals).
- Intro begins: `Hi, I’m Dean.` Do not reintroduce `Independent Travel Advisor` in the hero or gold label.
- Preserve approved white/ivory background, navy serif heading, burgundy script and CTAs, navigation/logo, Virgin sunset cruise photo, sizes and spacing.
- Next section eyebrow: `Find your kind of getaway`; main heading: `Explore your kind of cruise.` (existing italic emphasis).
- Do not modify unrelated page sections, footer, cruise-line descriptions, typography, photos or layout without specific approval.

## Change procedure

1. Work one section at a time; preserve approved sections.
2. Compare changes with these notes and the existing CSS before editing.
3. Make the smallest scoped code change; do not override global styling unnecessarily.
4. Distinguish a GitHub commit from a successful GitHub Pages deployment and visual confirmation.
5. Do not claim that a published change has been visually verified unless it has been checked.

## Relevant source files

- Homepage text and sections: `content/pages/index.json`
- Homepage/section presentation: `src/app/globals.css`
- Hero component: `src/components/sections/Hero.tsx`
- Cruise-lines component: `src/components/sections/Fleet.tsx`
- Deployment workflow: `.github/workflows/deploy.yml`
