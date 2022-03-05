import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { destroySession, getSession } from "../../utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  return redirect("/", {
    headers: {
      "set-cookie": await destroySession(session),
    },
  });
};
