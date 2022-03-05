import { ActionFunction } from "@remix-run/server-runtime";
import * as qs from "qs";

const DUMMY_URL = "http://localhost:3000";

export function makeAction(data: any): Parameters<ActionFunction>[0] {
  return {
    request: new Request(DUMMY_URL, {
      method: "POST",
      body: qs.stringify(data),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }),
    context: {},
    params: {},
  };
}
