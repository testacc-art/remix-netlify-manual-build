import { Link, useActionData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { Type as t } from "@sinclair/typebox";
import * as React from "react";
import { users } from "../../db/models.server";
import {
  makePasswordHash,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  RegisterData,
  REGISTER_DATA_SCHEMA,
  setSessionUser,
} from "../../utils/authentication.server";
import { toFormData } from "../../utils/misc";
import { ajv } from "../../utils/validation";

// TODO: testing

export const action: ActionFunction = async ({ request }) => {
  const data = await toFormData<RegisterData>(request);

  // Validate format
  if (!ajv.validate(t.Strict(REGISTER_DATA_SCHEMA), data)) {
    return { data, message: ajv.errorsText(ajv.errors) };
  }

  // Validate uniqueness
  if (await users().select().where("name", data.name).first()) {
    return { data, message: `Name '${data.name}' is already taken` };
  }

  // Save
  const passwordHash = await makePasswordHash(data.password);
  const [userId] = await users().insert({ name: data.name, passwordHash });

  // Persist to session and redirect
  return redirect("/users/profile", {
    headers: {
      "set-cookie": await setSessionUser(request, userId),
    },
  });
};

export default function Register() {
  const actionData = useActionData<
    { data: RegisterData; message: string } | undefined
  >();

  return (
    <form
      method="post"
      action="/users/register"
      className="card border w-80 m-4 p-4"
    >
      {actionData?.message ? (
        <div className="alert alert-error text-white text-sm">
          <div>Error: {actionData.message}</div>
        </div>
      ) : null}
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          defaultValue={actionData?.data.name}
          className="input input-bordered"
          required
          maxLength={NAME_MAX_LENGTH}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          required
          maxLength={PASSWORD_MAX_LENGTH}
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn">
          Register
        </button>
        <label className="label">
          <div className="label-text text-xs text-gray-400">
            Already have an account?{" "}
            <Link to="/users/login" className="link link-primary">
              Login
            </Link>
          </div>
        </label>
      </div>
    </form>
  );
}
