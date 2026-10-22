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