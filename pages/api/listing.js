import { app } from "../../server/app.mjs";

// Next.js supplies Node request/response objects to the same Express app.
export default app;
export const config = {
  api: { bodyParser: false, externalResolver: true },
};
