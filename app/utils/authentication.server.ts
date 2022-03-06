import { createHash } from "crypto";
import { Static, Type as t } from "@sinclair/typebox";
import * as bcrypt from "bcryptjs";
import { UserTable, users } from "../db/models.server";
import { commitSession, getSession } from "./session.server";

export const NAME_MAX_LENGTH = 32;
export const PASSWORD_MAX_LENGTH = 128;

const BCRYPT_ROUNDS = 10;
const SESSION_USER_ID_KEY = "user-id";

export const REGISTER_DATA_SCHEMA = t.Object({
  name: t.String({
    pattern: "^[a-zA-Z0-9_.-]+$",
    minLength: 1,
    maxLength: NAME_MAX_LENGTH,
  }),
  password: t.String({ minLength: 1, maxLength: PASSWORD_MAX_LENGTH }),
});

export type RegisterData = Static<typeof REGISTER_DATA_SCHEMA>;

function prehash(password: string): string {
  return createHash("sha256")
    .update(password, "utf8")
    .digest()
    .toString("base64");
}

export async function makePasswordHash(password: string): Promise<string> {
  const hash1 = prehash(password);
  const hash2 = await bcrypt.hash(hash1, BCRYPT_ROUNDS);
  return hash2;
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const hash1 = prehash(password);
  const ok = bcrypt.compare(hash1, passwordHash);
  return ok;
}

export async function login(
  name: string,
  password: string
): Promise<UserTable | undefined> {
  const found = await users().select("*").where("name", name).first();
  if (found) {
    if (await verifyPassword(password, found.passwordHash)) {
      return found;
    }
  }
  return;
}

export async function getSessionUser(
  request: Request
): Promise<UserTable | undefined> {
  const session = await getSession(request.headers.get("cookie"));
  if (!session.has(SESSION_USER_ID_KEY)) {
    return;
  }
  const userId: number = session.get(SESSION_USER_ID_KEY);
  return await users().select("*").where("id", userId).first();
}

export async function setSessionUser(
  request: Request,
  userId: number
): Promise<string> {
  const session = await getSession(request.headers.get("cookie"));
  session.set(SESSION_USER_ID_KEY, userId);
  return await commitSession(session);
}
