const mode = process.env.BUILD_MODE ?? "development";

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildDirectory: `build/remix/${mode}`,
  // TODO: should be able to test production build locally
  server: mode === "production" ? "app/deploy/netlify.ts" : undefined,
  ignoredRouteFiles: ["**/__tests__/**/*"],
};
