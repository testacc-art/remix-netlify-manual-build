const mode = process.env.BUILD_MODE ?? "development";

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildDirectory: `build/remix/${mode}`,
  server: mode === "production" ? "app/deploy/netlify.ts" : undefined,
};
