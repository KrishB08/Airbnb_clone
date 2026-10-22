# Accessibility

## Implemented behavior

- Real buttons and links, named landmark navigation, one listing heading and section headings. A keyboard-visible skip link targets the listing content.
- Hero photos, category thumbnails, gallery controls, date controls and icon-only buttons have accessible names. Room photos have descriptive alternative text; category thumbnails are decorative within already-named buttons.
- Native `dialog.showModal()` establishes modal semantics and makes background content inert. Explicit Tab / Shift+Tab boundary handling prevents focus from escaping to browser chrome while tabbing through the overlay.
- Initial focus moves to a close control. Escape invokes the top dialog's cancel event only, runs its closing animation, and restores the activating control.
- The lightbox is stacked above the still-mounted photo tour. Closing the lightbox restores the tour's scroll position and the selected photo button. Closing the tour restores the listing position and original trigger.
- A shared modal lock keeps the page fixed until the last overlay closes. Layout-effect cleanup restores focus and scroll synchronously, avoiding races during rapid reopen.
- Left/Right keys move through photos; the first/last boundaries stop and disable the matching arrow. Counters and category changes use polite announcements. Disabled controls are actual disabled buttons.
- Category jumps scroll only the tour panel and move focus to its heading without moving the underlying page.
- Controls have visible focus outlines. Selection is conveyed with text/pressed states as well as appearance. Guest count changes are announced, with limits of one through three.
- Dates use accessible full-date labels; Tab and Enter/Space work with the calendar's native buttons. The calendar does not claim to be a complete ARIA date-picker grid with arrow-key navigation.
- Reduced-motion preference zeroes explicit animation durations and movement and disables smooth jumps. Scroll containers use overscroll containment.
- Error/loading states and retry are present when the Express listing request fails. Local-storage denial does not break the page.

## Verification

See `docs/test-results.md` for actually executed production-browser checks and `tests/browser-checklist.md` for repeatable keyboard steps. In the earlier pass, native dialog behavior alone allowed focus to leave for browser chrome; explicit wrapping was added. A later rapid close/reopen check exposed passive cleanup and scroll restoration races; modal setup/cleanup now use a layout effect and a fixed-body lock.

## Scope limits

Desktop only. Browser checks are not a WCAG audit or screen-reader certification. VoiceOver/NVDA, Firefox/Safari, high-contrast modes, OS-level reduced-motion behavior and full 200% zoom reflow still need independent testing. Font substitutions and missing original assets are disclosed in `ui-fidelity.md`.
