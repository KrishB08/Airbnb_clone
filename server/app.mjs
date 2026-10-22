import express from "express";
import { listing } from "./listing.mjs";

// Shared by the standalone server and the hosted Next.js API adapter.
export const app = express();
app.disable("x-powered-by");
app.get("/api/listing", (_req, res) => {
  res.set("Cache-Control", "public, max-age=60");
  res.json(listing);
});
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
