import { createCookieSessionStorage } from "@remix-run/server-runtime";
import { SERVER_CONFIG } from "../config.server";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__DEMO_APP_ee80ecb1__",
      secrets: [SERVER_CONFIG.SESSION_SECRET],
    },
  });

export { getSession, commitSession, destroySession };
