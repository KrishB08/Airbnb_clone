# Test Results

Final validation for the desktop Airbnb listing implementation.

## Automated checks

- `npm run build` — passed with Next.js 15.5.25; production compilation and static generation completed without errors.
- `npm test` — passed, 7/7 tests.
- `npm audit --omit=dev` — passed; 0 vulnerabilities reported.
- `npx prettier --check app components server scripts tests *.md docs/*.md` — passed.
- `python3 -m py_compile scripts/extract-assets.py scripts/checkpoint.py` — passed.

## Browser and keyboard checks

- Production preview loaded at 1440×860 with an 1120px listing container, 88px header, 1120×494px hero, and 372px booking sidebar.
- Photo Tour opened from all hero entry points and the Show all photos control; it contains the required nine categories in order.
- Lightbox measured approximately 912×684px at 1440px viewport width and reported the evidence-backed `1 of 25` counter.
- At 1280×800 there was no horizontal overflow; the lightbox remained inside the viewport.
- Arrow navigation, previous/next bounds, Tab and Shift+Tab focus wrapping, visible focus outlines, and Escape close behavior passed.
- Closing the top overlay restored the opening trigger focus and page scroll position; closing the tour restored the hero trigger focus.
- Category jumps retained tour scroll position; Pool opened at `18 of 25`.
- Compact scroll navigation and sticky booking card appeared during page scroll.
- Guest count changed from 2 to 3 and disabled the add control at the configured maximum. Date changes recalculated nights, total, and cancellation copy.
- Save preference persisted after reload. Share reported link copied. Nearby cards and their detail dialog opened successfully.
- No broken images or console errors were observed.

## Deployment adapter validation

- `VERCEL=1 npm run build` — passed; `/api/listing` is included as a dynamic Node API route.
- `npm test` — 7/7 passed after extracting the shared Express application.
- Production Next.js on port 3100, without a standalone API process: `GET /api/listing` returned 200 with the expected listing and 25 photos; `POST /api/listing` returned 404.
- Vercel production deployment succeeded at https://powerplay-puce.vercel.app. An unauthenticated request returned 200 for the listing API and a property photo, and 404 for a POST to the read-only endpoint.
- On the deployed site, the listing loaded, Show all photos opened all nine categories, a tour photo opened the Lightbox, and ArrowRight advanced the counter from 1 to 2 of 25.

## Evidence limitations

The supplied evidence shows a 43-photo reference counter, but only 25 distinct property images were available in the supplied PDF/recording. The application preserves the reference count as metadata and uses the 25 available originals without fabricating duplicate assets. See `NEEDS_VERIFICATION.md` and `docs/asset-manifest.json`.
