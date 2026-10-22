import { fileURLToPath } from "node:url";
const config = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  async rewrites() {
    // Hosted deployments use the Express API adapter without a local listener.
    if (process.env.VERCEL) return [];
    return {
      beforeFiles: [
        {
          source: "/api/listing",
          destination: `${process.env.API_ORIGIN || "http://127.0.0.1:4000"}/api/listing`,
        },
      ],
    };
  },
};
export default config;
