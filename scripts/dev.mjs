import { spawn } from "node:child_process";
const production = process.argv.includes("--production");
const environment = {
  ...process.env,
  NODE_ENV: production ? "production" : "development",
};
const children = [
  spawn(
    process.execPath,
    [...(production ? [] : ["--watch"]), "server/index.mjs"],
    { stdio: "inherit", env: environment },
  ),
  spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      production ? "start" : "dev",
      "--hostname",
      "127.0.0.1",
    ],
    { stdio: "inherit", env: environment },
  ),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  setTimeout(() => process.exit(code), 300).unref();
}
for (const child of children) {
  child.on("error", (error) => {
    console.error(error.message);
    stop(1);
  });
  child.on("exit", (code) => stop(code ?? 1));
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
