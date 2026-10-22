import { app } from "./app.mjs";
export { app };
if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.API_PORT || 4000);
  const server = app.listen(
    port,
    "127.0.0.1",
    (error) =>
      !error &&
      console.log(`Listing API: http://localhost:${port}/api/listing`),
  );
  
  server.on("error", (err) => {
    console.error(err.message);
    process.exit(1);
  });
  for (const signal of ["SIGTERM", "SIGINT"])
    process.on(signal, () => server.close(() => process.exit(0)));
}
