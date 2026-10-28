# Dean On Deck: booking-focused preview

This branch prepares a brighter version of the existing GitHub Pages website. It does not change the Durable website, DNS, deployment workflow, or the existing form endpoint. Static export now writes directory index pages so direct links work on static hosts.

## What changed

- Warm white backgrounds, burgundy buttons, readable dark text and the supplied master logo.
- A shorter homepage: cruise lines, Dean’s support, a personal introduction, two supplied Google reviews, booking options, FAQs and contact.
- Travel stories retained at `/from-the-deck`; unused homepage sections remain in the CMS as hidden content.
- Virgin’s booking link uses `https://go.deanondeck.com/Book-with-Dean`.
- Other lines lead to an inquiry with the cruise line selected. Royal Caribbean, Celebrity and Silversea also have research links clearly distinguished from booking with Dean.
- Atlantis eligibility copy is attributed to the advice Dean received; confirm it with Atlantis before publication.
- A shorter inquiry form supports all listed lines. Existing backend form names and endpoint are preserved.
- Booking-transfer copy explains that eligibility must be checked, without guaranteeing perks or transfers.

## Making routine updates

The current website already keeps copy separate from layout:

| Update | File |
| --- | --- |
| Logo, navigation, social/review links, cruise lines | `content/site.json` |
| Homepage phrases, reviews, FAQs, contact | `content/pages/index.json` |
| Cruise-line introduction and closing message | `content/pages/cruises.json` |
| Inquiry introduction and contact sidebar | `content/pages/plan.json` |
| Existing-booking explanation | `content/pages/manage.json` |
| Travel stories and destination inspiration | `content/pages/from-the-deck.json` |
| Colors and layout | `src/app/globals.css` |

The existing admin panel may expose these fields; its private repository and operation have not been audited. Do not assume every new optional field is exposed there. Hidden content is retained for future editing and should be reviewed for current supplier policies before enabling it.

## Validation and publishing

Run `npm run build`. The existing deployment workflow uses pnpm and publishes pushes to `main` to GitHub Pages. Review this branch before merging or pushing to `main`.

The form implementation compiles, but no live inquiries were submitted. Confirm origin permissions and email delivery on the final website before launch. No analytics or promotional pricing was added. Existing general supplier descriptions on secondary pages should be reviewed by Dean before launch.
