# Needs verification

The requested desktop flows are implemented. **Pixel-perfect and timing-perfect parity cannot be certified from the available evidence.** These gaps are disclosed rather than filled with invented assets or claimed live behavior.

## Reference and asset gaps

1. Live reference inspection stopped at the Vercel browser-verification checkpoint on 14 September 2026. It was not bypassed, and the reference implementation was not downloaded or copied.
2. No original property-image directory was supplied. All property imagery is cropped from the supplied PDF and recording. Crops retain screenshot resolution, compression, occasional rounded corners and video artifacts. They are not the original full-resolution photos.
3. The reference lightbox shows 43 images. This implementation contains 25 distinct recovered photo views, with no repeated slots inserted to inflate the count. The exact identity/order of the other 18 images remains unverified. Three additional files are display variants of existing photos, not additional lightbox entries.
4. Five nearby-stay thumbnails were recovered separately from the recording at 132.5 seconds. Their remaining carousel page and destination listings were not available. The reconstruction displays the five evidenced cards and does not fabricate page two. A small recorded cursor is visible in the second crop.
5. Original Airbnb Cereal font, exact brand artwork, host/reviewer avatars, review pictograms and native map tiles were not supplied. DM Sans, independently drawn brand/laurel vectors, Lucide icons, host initials and a CSS location illustration are explicit substitutes.
6. The map is approximate and has no independently verified coordinates or live map service. It must not be used for navigation.

## Behavior and content gaps

- Hover 160 ms, overlay 240 ms, photo 180 ms and easing are **estimates**, not measured source values. Category/listing scroll uses native smooth scrolling, whose duration is browser-dependent. Reduced motion disables the explicit durations and smooth scrolling.
- Video confirms sticky booking, compact navigation, section/category jumps, expanded description, amenities dialog, calendar, review grid, location, host information, rules and nearby stays. Exact unrecorded dialogs, deep-link/back-button routing and ancillary workflows are not verified.
- Six review excerpts and the overall 19-review count were visible. The dialog explicitly shows those six; unseen review text and reviewer portraits were not invented. Review topic pills open this available review collection rather than implementing an unsupported topic classification.
- Offer eligibility and complete cancellation terms were not supplied. Claim saves an in-memory preview offer only; it never silently discounts the total. Dates/prices/relative review dates reproduce the supplied snapshot, not current availability.
- The reserve dialog is a preview; no reservation, charge, report submission, host message, login, or account creation is performed. Search only checks the single available destination. Supporting dialogs are independently implemented when their full reference behavior was not recorded.
- The footer navigation and small UI illustrations are approximate where evidence is incomplete.

## Remaining external checks

- Replace crops and substitutes with authorized original imagery, font and map data, then run image-difference checks at 1440 × 860.
- Compare motion against an accessible reference with frame-level timing capture.
- Test Safari/Firefox and VoiceOver/NVDA. Current runtime browser checks used the Chromium-based Codex browser; no screen-reader certification is claimed.
- Desktop-only: 1440 × 860 is the primary target. No mobile layout, 200% zoom reflow certification, WCAG conformance claim or real transaction backend is included.
- The final architecture diagram is intentionally left for the user, as requested. The production architecture outline is included in `architecture.md`.
