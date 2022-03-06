import * as assert from "assert/strict";
import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import { installGlobals } from "@remix-run/node";
import { client } from "../../../db/client.server";
import { users } from "../../../db/models.server";
import { action } from "../register";
import { makeAction } from "./helper";

installGlobals();
afterAll(() => client.destroy());

describe("register", () => {
  beforeEach(async () => {
    await users().truncate();
  });

  describe("action", () => {
    describe("error (invalid format)", () => {
      it("basic", async () => {
        const res = await action(
          makeAction({ name: "john#doe", password: "pass" })
        );
        expect(res.message).toBe(
          'data/name must match pattern "^[a-zA-Z0-9_.-]+$"'
        );
      });
    });

    describe("error (name already taken)", () => {
      it("basic", async () => {
        await users().insert({ name: "common", passwordHash: "" });
        const res = await action(
          makeAction({ name: "common", password: "pass" })
        );
        expect(res.message).toBe("Name 'common' is already taken");
      });
    });

    describe("success", () => {
      it("basic", async () => {
        const res: Response = await action(
          makeAction({ name: "dogg", password: "pass" })
        );
        const found = await users().select("*").where("name", "dogg").first();
        assert.ok(found);
        expect(found.name).toBe("dogg");
        expect(res.status).toBe(302);
        expect(res.headers.get("location")).toBe("/users/profile");
      });
    });
  });
});
