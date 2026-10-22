# Architecture

## Implemented assignment

The user will draw the architecture diagram separately. This document provides the actual design and a production outline, not a claim that marketplace infrastructure was built.

**Request path:** browser → Next.js at port 3000 → same-origin `/api/listing` rewrite → Express at port 4000 → one in-memory listing object. Next.js serves the local WebP photos and bundled font files. No database, external image host, search cluster or secret is required.

**Vercel deployment path:** browser → Next.js `/api/listing` Node function → the same Express application → listing object. `server/app.mjs` defines routes without opening a listener; `server/index.mjs` runs the standalone local backend, while `pages/api/listing.js` exports the application as a hosted handler. The automatic `VERCEL` environment flag disables the local-port rewrite. The frontend and Express backend share one public origin.

- `app/page.jsx` renders the client listing controller. `app/layout.jsx` owns metadata, fonts and shared CSS.
- `components/ListingPage.jsx` owns listing fetch/error/retry, saved preference, preview guests/dates/pricing, the booking sidebar and supporting sections/dialogs.
- `components/PhotoTour.jsx` renders ordered categories and the nested lightbox. It derives the counter from the actual photo array and bounds navigation at both ends.
- `components/Modal.jsx` owns the native dialog lifecycle, focus wrap, close timing, page locking and focus/scroll restoration. It reads its closing duration from the CSS token.
- `components/Calendar.jsx` implements the two-month date selector.
- `server/listing.mjs` holds the single API record and photo metadata. `server/index.mjs` exposes read-only JSON, a health check and JSON 404 responses. Express is loopback-only by default, and does not expose its framework header.
- `app/design-tokens.css` is the visual source of truth. `app/globals.css` consumes it.
- `scripts/dev.mjs` starts/stops both processes; dev mode watches the backend. `scripts/checkpoint.py` creates an allowlisted ZIP. `tests/listing.test.mjs` exercises the live HTTP contract and evidence/data constraints.

API contract: `GET /api/listing` → `{ id, title, subtitle, location, guests, bedrooms, beds, bathrooms, rating, reviewCount, host, hostYears, currency, total, nights, checkIn, checkOut, referencePhotoCount, heroSources, tourSources, hero, categories }`. Each category has an id, display name, amenity description and `{id, src, alt}` photos. The response is cached for 60 seconds; unknown endpoints and write methods return 404.

The page is statically generated as an application shell; listing data is fetched at runtime. That keeps the minimal Express dependency real and the production build independent of API availability. A production marketplace would server-render the listing data for SEO and first-content performance.

## Production-scale marketplace outline

### Frontend and delivery

Use a CDN/WAF in front of a horizontally scalable Next.js tier. Server-render public listing pages and cache stable listing metadata with explicit invalidation on edits. Stream noncritical reviews/recommendations. Serve sized AVIF/WebP derivatives from the CDN. Keep personalized account/booking responses private and outside shared caches. Expose a versioned backend-for-frontend API, with an explicit contract and generated client types.

### Backend boundaries

Start as a modular service with separate catalog, availability/pricing, booking, identity, reviews, messaging and payment modules. Split services only where scale or ownership warrants it. Stateless API instances run behind a load balancer; session/auth tokens are validated centrally and actions are authorized per resource. Rate-limit costly search, upload and login endpoints.

Availability is authoritative at the booking boundary. Create a short-lived inventory hold, compute a server-signed quote, and commit the reservation with an idempotency key and database transaction. Use a transactional outbox to publish confirmed events. Payments use a PCI-compliant provider; verify and deduplicate webhooks. A failed or expired payment releases its hold; asynchronous compensation handles partial failures. Never trust the browser's calculated preview price.

### Storage

Use PostgreSQL for users, listings, rates, inventory, bookings and ledger references. Apply appropriate unique/exclusion constraints to prevent overlapping reservations and lock inventory during reservation commits. Store money as integer minor units with explicit currencies. Encrypt sensitive fields and minimize retention.

Use object storage (S3-compatible) for original photos, with signed uploads, content-type/size validation, malware scanning and asynchronous image transformations. Keep originals private; publish approved derivatives through the CDN. Redis provides bounded caches, rate limits and transient holds, but is not the sole source of truth for a booking. Backups, point-in-time recovery and restore drills are mandatory before launch.

### Search and discovery

Index published listing documents into OpenSearch/Elasticsearch with geo coordinates, amenities, capacity and searchable text. Populate the index from catalog events via an outbox/queue; replay failed events and reconcile periodically. Search may be eventually consistent, but checkout must revalidate availability and the final price with authoritative services. Cache popular queries with short TTLs; use geo bounding boxes, facets and cursor pagination. Keep recommendation models separate from booking correctness.

### Deployment and operations

Run isolated development, staging and production environments. CI performs unit/API/browser/accessibility checks, builds immutable images, scans dependencies and produces an SBOM. Deploy the Next.js and API services on managed containers or suitable managed Node hosting; use private networking for databases and workers. The API should listen on the configured container interface behind the gateway, rather than this assignment's loopback-only default.

Use managed PostgreSQL, object storage, queue and search where possible. Use infrastructure as code, a secret manager and workload identity. Expand/contract database migrations preserve rollback compatibility. Canary or blue/green rollout compares errors and latency against the previous release. Collect structured logs, traces and metrics for search latency, listing availability, hold expiry, reservation failures, payment reconciliation and queue lag. Autoscale by resource use plus queue age; maintain tested rollback, recovery and incident procedures.

### Diagram guidance

Draw these boxes and directed connections: client → CDN/WAF → Next.js/BFF → API gateway/modules → PostgreSQL/Redis; uploads → object storage → transformation workers → CDN; catalog transaction/outbox → queue → search index; booking service → payment provider → verified webhook; CI/CD → frontend/API/workers, with observability spanning all services. Label the booking database path **strong consistency** and search/recommendations **eventual consistency**. This is the requested outline; no diagram file is included.
