import { afterAll, describe, expect, it } from "@jest/globals";
import { installGlobals } from "@remix-run/node";
import { client } from "../../../db/client.server";
import { loader } from "../../youtube";

installGlobals();
afterAll(() => client.destroy());

describe("youtube", () => {
  describe("loader", () => {
    it("basic", async () => {
      const request = new Request(
        "http://localshot:3000/youtube?id=MoH8Fk2K9bc"
      );
      const response: Response = await loader({
        request,
        context: {},
        params: {},
      });
      const json = await response.json();
      expect(json?.videoDetails?.title).toBe(
        "LEARN FRENCH IN 2 MINUTES – French idiom : Noyer le poisson"
      );
    });
  });
});
