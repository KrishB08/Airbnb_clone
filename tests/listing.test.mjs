import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { listing } from "../server/listing.mjs";
process.env.NODE_ENV = "test";
const { app } = await import("../server/index.mjs");
let server, origin;
before(async () => {
  server = await new Promise((resolve, reject) => {
    const s = app.listen(0, "127.0.0.1", (error) =>
      error ? reject(error) : resolve(s),
    );
    s.on("error", reject);
  });
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});
test("GET /api/listing returns the single listing with a JSON contract", async () => {
  const response = await fetch(`${origin}/api/listing`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const data = await response.json();
  assert.equal(data.id, "mirashya-ug10");
  assert.equal(data.currency, "INR");
  assert.equal(data.total, 28499);
  assert.equal(data.guests, 3);
  assert.equal(data.hero.length, 5);
  assert.equal(response.headers.get("x-powered-by"), null);
});
test("read-only API rejects mutation and unknown endpoints", async () => {
  for (const [method, path] of [
    ["POST", "/api/listing"],
    ["GET", "/api/missing"],
  ]) {
    const response = await fetch(origin + path, { method });
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Not found" });
  }
});
test("API exposes bounded caching and a health endpoint", async () => {
  assert.equal(
    (await fetch(origin + "/api/listing")).headers.get("cache-control"),
    "public, max-age=60",
  );
  assert.deepEqual(await (await fetch(origin + "/health")).json(), {
    status: "ok",
  });
});
test("tour categories match the required order", () => {
  assert.deepEqual(
    listing.categories.map((c) => c.name),
    [
      "Living room 1",
      "Living room 2",
      "Full kitchen",
      "Bedroom",
      "Full bathroom",
      "Gym",
      "Exterior",
      "Pool",
      "Additional photos",
    ],
  );
});
test("gallery has actual unique photos, not 43 fabricated slots", async () => {
  const photos = listing.categories.flatMap((c) => c.photos);
  assert.equal(photos.length, 25);
  assert.equal(new Set(photos.map((p) => p.id)).size, photos.length);
  assert.equal(listing.referencePhotoCount, 43);
  assert.ok(photos.length < listing.referencePhotoCount);
  const hashes = await Promise.all(
    photos.map(async (p) =>
      createHash("sha256")
        .update(await readFile(new URL("../public" + p.src, import.meta.url)))
        .digest("hex"),
    ),
  );
  assert.equal(new Set(hashes).size, photos.length);
});
test("all photos have useful alternatives and all hero references resolve", async () => {
  const photos = listing.categories.flatMap((c) => c.photos);
  for (const p of photos) {
    assert.ok(p.alt.length > 20);
    await access(new URL("../public" + p.src, import.meta.url));
  }
  for (const id of listing.hero) assert.ok(photos.some((p) => p.id === id));
  for (const src of [
    ...Object.values(listing.heroSources),
    ...Object.values(listing.tourSources),
  ])
    await access(new URL("../public" + src, import.meta.url));
});
test("visual values and motion are centralized, with reduced-motion support", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    css,
    /#(?:[0-9a-f]{3}){1,2}\b|\b\d+(?:\.\d+)?(?:px|ms)\b/i,
  );
  const tokens = await readFile(
    new URL("../app/design-tokens.css", import.meta.url),
    "utf8",
  );
  assert.match(tokens, /prefers-reduced-motion/);
  assert.match(tokens, /ESTIMATED/);
});
