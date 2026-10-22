# Playpower Labs — Airbnb listing assignment

Independent desktop reconstruction of **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10**, built with Next.js, React and a minimal Express API. Created from the supplied PDF screenshots and screen recording; no reference application source was copied.

## Run

Requires **Node.js 20.9+** (Node 22 recommended), npm, and free ports 3000 and 4000. Python 3 is needed only to create the ZIP. All display assets and fonts are served locally after dependency installation.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. The launcher runs both Next.js and Express; Ctrl+C stops both. Express serves `GET http://127.0.0.1:4000/api/listing`. Next.js forwards `/api/listing` to Express, avoiding browser CORS configuration.

```sh
npm run build
npm start
```

The production build does not need a running API. Runtime needs both processes. Development uses `.next-dev`; production uses `.next`, keeping their outputs separate. Use the explicit `127.0.0.1` URL if your system resolves `localhost` to IPv6.

Optional separate terminals:

```sh
npm run start:api
npm run start:web -- --hostname 127.0.0.1
```

`API_PORT` changes the Express port. When changing it, also set `API_ORIGIN` for **both the build and Next.js runtime**, e.g. `http://127.0.0.1:4100`. `PORT` changes the Next.js port. No credentials are required.

## Hosting on Vercel

Submission URL: https://powerplay-puce.vercel.app

The project can be deployed directly from this folder with `npx vercel --prod` after signing in with `npx vercel login`. A public GitHub repository is not required. Vercel runs `npm run build` and hosts the frontend plus `/api/listing` on one origin.

On Vercel, `pages/api/listing.js` adapts the shared Express application in `server/app.mjs` to a Next.js Node function. It does not start a loopback listener. Local development retains the standalone Express process and rewrite. No API secrets or environment values are needed on Vercel; its automatic `VERCEL` variable selects the hosted routing mode. `.vercelignore` excludes raw evidence and generated files from deployment.

## Implemented features

- Full listing surface: header/search pill, title, five-image hero, host, highlights, description, sleep cards, amenities, calendar, reviews, approximate location, host details, rules, and five nearby-stay cards.
- Sticky discount/booking card and compact section navigation while scrolling.
- Full-screen photo tour from every hero image or “Show all photos”, with nine ordered category jumps.
- Nested lightbox with category, actual counter, gallery return, close, prev/next buttons and keyboard arrows.
- Native modal semantics plus explicit keyboard focus wrapping, scroll locking, top-overlay Escape, and focus/scroll restoration.
- Reduced-motion support; all visual tokens and estimated animation durations live in `app/design-tokens.css`.
- Guest limit, date selection, calculated preview price, save preference, share-link copy and local preview dialogs.

This is a **listing UI assignment**, not a booking service. Reservation, payments, host messaging, real availability, authentication and other marketplace workflows are not connected. Controls disclose those limits rather than claiming a transaction occurred.

## Verification and packaging

```sh
npm test
npm audit --omit=dev
npm run checkpoint
```

`npm test` checks the actual HTTP API, rejection of writes, category order, image integrity, unique gallery slots and token discipline. It binds an ephemeral loopback port. A sandbox that blocks network listeners must grant localhost access.

Browser checks and repeatable steps: `docs/test-results.md` and `tests/browser-checklist.md`.

`npm run checkpoint` writes `deliverables/playpower-airbnb-source.zip` and regenerates `FILE_TREE.txt`. The ZIP includes real source, the lockfile, local imagery, tests and documentation. It excludes dependencies, build outputs, `.env` files, raw evidence recordings, temporary files and other archives. No public GitHub repository was created. The user subsequently requested a hosted Vercel deployment for submission.

## Evidence limitations

The reference site's Vercel security checkpoint blocked live inspection. The supplied recording was inspected across its full 154-second duration, including the lower listing sections, and rechecked on resumption. The implementation contains **25 distinct recovered property photos**, **three display-crop variants**, and **five separate nearby-stay thumbnails**. The reference counter says 43; no extra photo slots were invented. See `NEEDS_VERIFICATION.md`, `ui-fidelity.md` and `docs/asset-manifest.json` for exact-asset gaps.

## Handoff files

- `NEEDS_VERIFICATION.md`: known evidence gaps and remaining parity checks.
- `ui-fidelity.md`: dimensions, visual decisions, image provenance and estimated motion.
- `accessibility.md`: keyboard behavior, focus management, checks and limits.
- `architecture.md`: implemented architecture and production-scale outline for the diagram you will draw separately.
- `prompt-history.md`: available user prompt history and an implementation activity summary.
- `docs/ai-workflow.json`: actual agent/skill workflow record; no fictitious sub-agents.
- `FILE_TREE.txt`: complete file list inside the deliverable.

## Optional evidence regeneration

The committed image files are sufficient to run the app. To regenerate them from the original supplied documents, install FFmpeg plus Python packages `pillow` and `pypdf`, then run:

```sh
python3 scripts/extract-assets.py --pdf "/path/to/assignment.pdf" --video "/path/to/recording.mov"
```

The script uses a temporary extraction directory and saves only the resulting crops and provenance manifest. Its crop coordinates are specific to these supplied inputs. Raw PDF/video evidence is intentionally excluded from the ZIP.
