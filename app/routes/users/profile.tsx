import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import * as React from "react";
import superjson from "superjson";
import { UserTable } from "../../db/models.server";
import { getSessionUser } from "../../utils/authentication.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request);
  if (!user) {
    return redirect("/users/login");
  }
  return superjson.serialize(user);
};

export default function Profile() {
  const data = superjson.deserialize<UserTable>(useLoaderData());

  return (
    <div className="card border m-4 p-4 w-80 gap-2">
      <div className="text-xl uppercase">Profile</div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">ID</span>
        </label>
        <input className="input input-bordered" readOnly value={data.id} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input className="input input-bordered" readOnly value={data.name} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Account Created At</span>
        </label>
        <input
          className="input input-bordered"
          readOnly
          value={data.createdAt.toISOString()}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <div className="label-text">
            <form method="post" action="/users/logout">
              <button className="link">Logout</button>
            </form>
          </div>
        </label>
      </div>
    </div>
  );
}
