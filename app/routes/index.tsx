import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import * as React from "react";
import superjson from "superjson";
import { UserTable } from "../db/models.server";
import { getSessionUser } from "../utils/authentication.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request);
  return superjson.serialize(user);
};

export default function Index() {
  const data = superjson.deserialize<UserTable | undefined>(useLoaderData());

  return (
    <ul className="menu m-4 w-64 text-sm">
      <li className="border-b">
        <Link to="home">Home Page</Link>
      </li>
      <li className="border-b">
        <Link to="counter">Counter Page</Link>
      </li>
      <li className="border-b">
        <Link to="dump-loader-args">Dump Loader Args Page</Link>
      </li>
      <li className="border-b">
        <Link to="dump-environment-variables">Dump Environment Variables</Link>
      </li>
      {data ? (
        <li>
          <Link to="users/profile">Profile</Link>
        </li>
      ) : (
        <li>
          <Link to="users/login">Login</Link>
        </li>
      )}
    </ul>
  );
}
