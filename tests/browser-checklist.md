# Repeatable desktop browser checks

Run `npm run build && npm start`, then open http://127.0.0.1:3000 at 1440 × 860. These checks were exercised through the Codex browser controls, not through a standalone Playwright runner. The API/data suite is separately automated with `npm test`.

1. Confirm the title, five-image layout, local images, 88px header, 1120×494px hero and 372px sidebar.
2. Open and close the tour from each of the five hero buttons, then “Show all photos”. Verify each trigger regains focus and the page unlocks after the closing animation.
3. Verify category order and the 976px tour width. Click Pool, Bedroom and Additional photos; each jump stays inside the tour scroll region.
4. Open a gallery image. Confirm its category, actual `n of 25` counter and prev/next/close/gallery controls. The first image is 912×684px at the target viewport.
5. Press Right, then Left. At the first image, Left remains at 1; at the last, Right remains at 25. Corresponding buttons are disabled.
6. Tab from Close to Next and back around to the gallery icon. Shift+Tab wraps the other way. Focus remains in the viewer and has a visible outline.
7. Escape once returns to the same tour image and scroll position. Escape again returns to the listing. Repeat opening/closing rapidly after **actual dialog removal**, not merely while its exit animation is transparent.
8. Open the tour while the listing is scrolled. Record the locked body's top offset and compare it with restored page scroll after closing. Repeat for a scrolled tour opening/closing the viewer.
9. Scroll below the hero. Verify compact navigation and sticky card at 100px top. Use Amenities, Reviews and Location links.
10. Open all amenities, inspect its sections and close with Escape; verify the trigger and scroll position are restored.
11. Change guests from two to three; increment must disable. Save and check the card. Decrement to one; decrement must disable.
12. Select 20–23 October: three nights and ₹17,099. Clear dates and check the missing-date state; Reserve should open dates rather than claim a booking.
13. Open Reserve with valid dates: it must disclose preview-only behavior and never charge or create a booking.
14. Toggle Save, reload, and verify the local preference persists. Open Share and copy the loopback URL.
15. Inspect reviews, approximate location, host/rules and the five nearby cards. No broken image or overlapping content should be present.
16. Check the console for application errors. Repeat core layout checks at 1280×800. Test reduced motion at OS/browser level separately where available.

A visual comparison still needs the original high-resolution image set and exact font. Do not label these checks a pixel-difference, cross-browser or screen-reader certification.
