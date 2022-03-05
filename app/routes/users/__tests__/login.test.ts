import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import { installGlobals } from "@remix-run/node";
import { client } from "../../../db/client.server";
import { users } from "../../../db/models.server";
import { makePasswordHash } from "../../../utils/authentication.server";
import { action } from "../login";
import { makeAction } from "./helper";

installGlobals();
afterAll(() => client.destroy());

describe("register", () => {
  beforeEach(async () => {
    await users().truncate();
  });

  describe("action", () => {
    describe("error (incorrect name)", () => {
      it("basic", async () => {
        const res = await action(
          makeAction({ name: "noop", password: "pass" })
        );
        expect(res.message).toBe("Invalid name or password");
      });
    });

    describe("error (incorrect password)", () => {
      it("basic", async () => {
        await users().insert({
          name: "snoop",
          passwordHash: await makePasswordHash("asdf"),
        });
        const res = await action(
          makeAction({ name: "snoop", password: "jkl;" })
        );
        expect(res.message).toBe("Invalid name or password");
      });
    });

    describe("success", () => {
      it("basic", async () => {
        await users().insert({
          name: "snoop",
          passwordHash: await makePasswordHash("asdf"),
        });
        const res = await action(
          makeAction({ name: "snoop", password: "asdf" })
        );
        expect(res.status).toBe(302);
        expect(res.headers.get("location")).toBe("/users/profile");
      });
    });
  });
});
