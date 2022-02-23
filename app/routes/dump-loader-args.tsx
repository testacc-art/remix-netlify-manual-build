import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import * as React from "react";

export const loader: LoaderFunction = async (args) => {
  const headers: any = {};
  args.request.headers.forEach((v, k) => (headers[k] = v));

  return JSON.stringify({ args, headers }, null, 2);
};

export default function Home() {
  const data = useLoaderData();
  return (
    <div>
      <div>Dump Loader Args</div>
      <code style={{ whiteSpace: "pre" }}>{data}</code>
    </div>
  );
}
