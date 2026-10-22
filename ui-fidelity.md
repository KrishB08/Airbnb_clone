# UI fidelity

## Evidence and method

The three 1440 × 860 screenshots embedded on page 2 of the supplied PDF were extracted directly. The 2940 × 1912, 154.45-second recording was sampled over its entire duration, with additional frames around the gallery and nearby cards. The reference URL's browser security checkpoint prevented live comparison. Source code was authored independently.

## Layout targets

| Surface                     |       Implemented target | Evidence                                |
| --------------------------- | -----------------------: | --------------------------------------- |
| Main listing container      |                  1120 px | PDF listing screenshot                  |
| Header                      |                    88 px | PDF listing screenshot                  |
| Hero                        |            1120 × 494 px | PDF listing screenshot                  |
| Hero columns                |       560 / 272 / 272 px | One large image and four smaller images |
| Hero gutters                |                     8 px | PDF listing screenshot                  |
| Main column / gap / sidebar |        652 / 96 / 372 px | Listing and recording                   |
| Hero top at 1440 × 860      |                   173 px | PDF listing screenshot                  |
| Tour container              |                   976 px | PDF tour screenshot                     |
| Tour columns / gap          |        458 / 60 / 458 px | PDF tour screenshot                     |
| Tour first image top        |     approximately 436 px | PDF tour screenshot                     |
| Lightbox image bounds       | 912 × 684 px at x264/y88 | PDF lightbox screenshot                 |

Values, colors, spacing, typography, corner radii, shadows, opacity, dimensions and motion durations are centralized in `app/design-tokens.css`. SVG path coordinates define independently drawn artwork; calendar/date arithmetic and dynamic scroll coordinates are functional data rather than design values.

The listing centers on a white canvas with dark text, fine gray dividers and a pink reserve button. The photo tour and lightbox use white full-screen surfaces. The booking card remains sticky until its containing listing-details column ends, as in the recording. Compact navigation appears after the hero region and links to Photos, Amenities, Reviews and Location.

## Photo policy

25 property-photo slots are grouped in the required order: Living room 1 (3), Living room 2 (3), Full kitchen (2), Bedroom (1), Full bathroom (1), Gym (3), Exterior (4), Pool (3), Additional photos (5).

The actual `1 of 25` counter replaces the unavailable reference `1 of 43`; no faux unique assets are generated. The three variants `bedroom-hero`, `patio-seating-hero`, and `living-tour` reproduce visible crops while referring to existing gallery views. Five `nearby-*` photos belong to the separate nearby-stay row and do not enter the property tour. All 33 files are documented in `docs/asset-manifest.json`.

The first lightbox image and the first tour image use their respective PDF evidence crops. Other recovered images are fitted with `object-fit: cover` in galleries and `contain` in the viewer. No AI-generated room imagery or stock substitutes are used.

## Motion — estimated

| Interaction           | Token/behavior                            | Confidence                             |
| --------------------- | ----------------------------------------- | -------------------------------------- |
| Photo/button hover    | 160 ms, brightness 0.91, tiny photo scale | Estimated                              |
| Overlay entrance/exit | 240 ms, fade and 18 px vertical movement  | Estimated                              |
| Photo change          | 180 ms fade and 6 px entrance             | Estimated                              |
| Category/listing jump | Native smooth scrolling                   | Observed behavior, unmeasured duration |
| Reduced motion        | 0 ms, no displacement; instant jumps      | Accessibility accommodation            |

Motion uses one easing token `cubic-bezier(.2,.7,.2,1)`. Modal close waits for the CSS duration read from the token; no separately hardcoded close delay can drift from the CSS. Exact crossfades, lightbox photo direction and hover details need direct reference verification.

## Substitutions

DM Sans is bundled locally under its open-source font license; the exact reference font is unavailable. Lucide icons, the brand line drawing and laurel vectors are approximate. Host/reviewer initials replace missing portrait assets. The map is an approximate CSS illustration. See `NEEDS_VERIFICATION.md` for the full gap register.
