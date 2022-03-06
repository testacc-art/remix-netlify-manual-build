import { Link, useActionData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { Type as t } from "@sinclair/typebox";
import * as React from "react";
import {
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  REGISTER_DATA_SCHEMA,
  RegisterData,
  login,
  setSessionUser,
} from "../../utils/authentication.server";
import { toFormData } from "../../utils/misc";
import { ajv } from "../../utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const data = await toFormData<RegisterData>(request);

  // Validate format
  if (!ajv.validate(t.Strict(REGISTER_DATA_SCHEMA), data)) {
    return { data, message: ajv.errorsText(ajv.errors) };
  }

  // Login
  const user = await login(data.name, data.password);
  if (!user) {
    return { data, message: "Invalid name or password" };
  }

  // Persist to session and redirect
  return redirect("/users/profile", {
    headers: {
      "set-cookie": await setSessionUser(request, user.id),
    },
  });
};

export default function Login() {
  const actionData = useActionData<
    { data: RegisterData; message: string } | undefined
  >();

  return (
    <form
      method="post"
      action="/users/login"
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
          Login
        </button>
        <label className="label">
          <div className="label-text text-xs text-gray-400">
            Don't have an account yet?{" "}
            <Link to="/users/register" className="link link-primary">
              Register
            </Link>
          </div>
        </label>
      </div>
    </form>
  );
}
