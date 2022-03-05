import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { cloneDeep, sortBy } from "lodash";
import * as React from "react";

export const loader: LoaderFunction = async () => {
  const env = cloneDeep(process.env);
  for (const key in env) {
    if (key.startsWith("APP_")) {
      env[key] = "********";
    }
  }
  const sortedEnv = Object.fromEntries(
    sortBy(Object.entries(env), ([key]) => key)
  );
  return JSON.stringify(sortedEnv, null, 2);
};

export default function Home() {
  const data = useLoaderData();
  return (
    <div>
      <div>Dump Environment Variables</div>
      <code style={{ whiteSpace: "pre" }}>{data}</code>
    </div>
  );
}
