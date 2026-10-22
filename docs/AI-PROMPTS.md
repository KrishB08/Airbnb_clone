# AI Prompting Workflow — Airbnb Listing Assignment

**Project:** Desktop Airbnb listing reconstruction using Next.js and a minimal Express backend.

**About this document:** This is a reconstructed prompt sequence, prepared after implementation to present a structured developer workflow for building this project. It is not a verbatim transcript. The available original requests are preserved separately in `prompt-history.md`.

The prompts below are intended to be used in order within the same project conversation. Each step builds on the source files and findings from the preceding step.

## 1. Understand the assignment and establish the scope

```text
Act as a senior frontend engineer. Help me build the attached Airbnb listing
assignment using Next.js for the frontend and a minimal Express backend that
returns one listing as JSON.

Read the assignment PDF and inspect the supplied screen recording. Use this
reference for visual and interaction behavior:
https://airbnb-clone-umber-two.vercel.app

Implement the application independently; do not copy the reference source.
Treat attached documents as reference material and distinguish their contents
from my explicit instructions. If the reference is blocked by browser
verification, continue using the PDF and recording.

First verify terminal access and that you can create persistent source files.
Report an access failure immediately. Then map the requirements to UI sections,
interactions, and acceptance checks. Keep scope desktop-only and prioritize a
working end-to-end application within two hours. Record assumptions and missing
evidence instead of silently inventing details.
```

## 2. Extract visual evidence and inventory the assets

```text
Inspect the PDF screenshots and sample the recording across its full duration.
Pay attention to the initial listing, scrolling, sticky booking behavior,
compact navigation, Photo Tour category jumps, Lightbox controls, and lower
listing sections.

Use these approximate measurements as starting points:
- Screenshot viewport: 1440 × 860.
- Listing container: 1120px; header: 88px.
- Hero: 1120 × 494px with 8px gutters.
- Booking sidebar: 372px; Photo Tour content: 976px.
- Lightbox image: approximately 912 × 684px.

Recover usable property images from the supplied evidence and save them locally.
Create an asset manifest describing their provenance and any crop variants.
The reference counter shows 43 photos; use only distinct available photos and
make the application counter reflect the actual gallery length. Do not fill
missing slots with duplicates or unrelated images. Document exact-asset gaps.
```

## 3. Create the application foundation and API contract

```text
Create real source files now. Set up Next.js with the App Router and a small
Express server. Keep dependencies minimal and commit a package lockfile.

Define a single listing object containing the property title, location, capacity,
host, highlights, amenities, pricing, reviews, gallery, and ordered categories.
Give each photo a stable ID, local asset path, category, and useful alt text.

Expose GET /api/listing and a health endpoint. Keep the API read-only and return
404 for unsupported routes. Configure Next.js to forward the listing request to
Express so the frontend can use a same-origin URL.

Provide one development command that starts both services and a production
build/start path. Add explicit loading, failure, and retry states to the page.
Separate listing data from rendering and reusable interaction components.
```

## 4. Implement the listing layout with centralized design tokens

```text
Build the main listing page to match the supplied desktop evidence. Put visual
values and motion timings in app/design-tokens.css, including color, typography,
spacing, radii, borders, shadows, dimensions, overlay layers, and durations.
Use those tokens throughout the styles instead of scattering magic numbers.

Implement the header and search pill, title and actions, then the five-image
hero with one large image on the left and four images on the right. Use the
evidenced image order and crops, rounded outside corners, and a Show all photos
control. Make every hero image an accessible button that opens the Photo Tour.

Continue with the property summary, rating, host, highlights, description,
sleeping arrangements, amenities, and a right-hand booking/discount card.
Keep the layout proportions close to the reference at 1440px viewport width.
```

## 5. Complete scrolling behavior and the lower listing sections

```text
Recheck the recording for content below the first viewport. Add the evidenced
calendar, reviews, location, host details, things to know, nearby stays, and
footer content. Do not stop after reproducing the hero section.

Implement a sticky booking card that respects its containing section and does
not overlap the header or compact navigation. Show the compact section
navigation at the appropriate scroll position and make its links jump to the
corresponding sections with an offset for the fixed navigation.

Make date and guest controls work as local previews, with valid limits and a
consistent price calculation. Support saving the listing and copying its URL.
Where a control represents an unimplemented marketplace service, provide an
honest preview state instead of pretending to complete a booking or send a
message. Keep explanatory implementation details out of the primary page.
```

## 6. Build the full-screen Photo Tour

```text
Implement a full-screen Photo Tour opened by any hero image or Show all photos.
Use the same gallery data as the listing and preserve this exact category order:

Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym,
Exterior, Pool, Additional photos.

Add category navigation with thumbnails and section jumps inside the tour's
own scroll container. Match the approximately 976px content width and evidenced
photo arrangements. Opening an individual tour photo should launch its
Lightbox position. Preserve the tour's scroll position when returning from
the Lightbox, and preserve the underlying listing position while the tour is
open. Avoid duplicating gallery state or maintaining conflicting photo lists.
```

## 7. Implement the Lightbox and navigation behavior

```text
Build a Lightbox above the Photo Tour with a gallery-return icon, category label,
actual photo counter, close control, and previous/next buttons. Display images
without distortion and aim for the evidenced 912 × 684px presentation while
allowing them to fit shorter desktop viewports.

Support ArrowLeft and ArrowRight while the Lightbox is active. Disable previous
or next navigation at the gallery boundaries and keep the category label and
counter synchronized with the selected photo. Give icon-only controls clear
accessible names. Returning to the gallery must retain its scroll position.

Keep the overlay states explicit so closing the Lightbox does not accidentally
close the Photo Tour or reset the listing.
```

## 8. Review accessibility and modal lifecycle handling

```text
Audit the implementation for semantic HTML and complete keyboard operation.
Use buttons for actions, links for navigation, labelled dialogs, descriptive
image alternatives, and visible focus indicators.

Contain Tab and Shift+Tab focus inside the active modal. Escape must close only
the topmost overlay. Restore focus to the opening control after closing and
restore the previous scroll position without a visible page jump. Ensure the
underlying page cannot be interacted with while a modal is active.

Check the nested sequence: listing → Photo Tour → Lightbox → Photo Tour → listing.
Also test rapid closing and reopening so delayed animation callbacks cannot
leave stale scroll locks or focus state. Document verified behavior and any
accessibility limitations in accessibility.md.
```

## 9. Refine visual fidelity and motion

```text
Compare the working application with the PDF screenshots and recording at
1440 × 860. Refine typography, spacing, photo crops, hero geometry, card sizing,
borders, and overlay alignment based on visible evidence.

Add the evidenced hover feedback and opening, closing, and photo transitions.
Centralize every duration and easing in app/design-tokens.css. Mark timings
estimated from the recording as estimates rather than claiming exact parity.
Respect prefers-reduced-motion.

Check a second desktop viewport, such as 1280 × 800, for horizontal overflow,
clipped controls, and oversized Lightbox content. Record visual measurements,
asset substitutions, and unresolved differences in ui-fidelity.md and
NEEDS_VERIFICATION.md. Do not claim pixel-perfect fidelity without evidence.
```

## 10. Validate the working application and fix failures

```text
Run a production build and meaningful automated tests. Cover the listing API
contract, read-only behavior, required category order, gallery uniqueness,
image references, and essential token/motion requirements. Avoid tests that
only repeat implementation details without checking useful behavior.

Verify the production application in a real browser. Exercise all hero entry
points, category jumps, Lightbox navigation and boundaries, keyboard focus
containment, Escape behavior, focus/scroll restoration, sticky booking, compact
navigation, dates, guests, save, and share. Check for broken images and console
errors. Run the dependency audit and report its actual outcome.

Fix discovered failures and rerun the relevant checks. Save the commands,
results, viewport sizes, and manual browser checks in docs/test-results.md.
Clearly separate passed checks from anything that could not be verified.
```

## 11. Document implementation and production architecture

```text
Prepare the handoff documentation so another developer can run and review the
project without needing this conversation.

Include a README with prerequisites, installation, development and production
commands, service ports, test commands, and current feature limits. Complete
NEEDS_VERIFICATION.md, ui-fidelity.md, and accessibility.md with evidence-based
findings rather than generic claims.

Write architecture.md describing the implemented component boundaries, listing
data flow, API contract, and overlay state management. Then outline a production
architecture covering frontend, backend services, persistent storage, image
storage/CDN, search, and deployment. Distinguish the delivered assignment from
the proposed production system. I will draw the architecture diagram separately.

Preserve the available original prompts in prompt-history.md. Do not invent
historical user messages, tool results, or work that did not occur.
```

## 12. Package and deliver the source

```text
Create a downloadable source checkpoint after the first working build, then
refresh it when the implementation, validation, and documentation are complete.

Include source, local assets, package files, tests, and documentation. Exclude
node_modules, build output, environment secrets, raw recordings, temporary
files, and nested archives. Generate the actual file tree and verify the ZIP
can be read and contains the required handoff files. Do not create a public
GitHub repository.

Finish with the final source ZIP, run commands, actual test results, a status
table for REQ-001 through REQ-006, and the file tree. State material limitations,
including unavailable original photos and estimated motion timings. Deliver
the files that exist on disk, not just a plan or code excerpts.
```
