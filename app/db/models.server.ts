import { client } from "./client.server";

export interface UserTable {
  id: number;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export const users = () => client<UserTable>("users");
