import { Knex, knex as initKnex } from "knex";
import { SERVER_CONFIG } from "../config.server";

const CONFIG: Knex.Config = {
  // statically require knex dialect for esbuild to bundle it
  // instead of dynamic require (https://github.com/knex/knex/blob/3616791ac2a6d17d55b29feed6a503a793d7c488/lib/knex-builder/internal/config-resolver.js#L38)
  client: require("knex/lib/dialects/mysql2"),
  connection: {
    host: SERVER_CONFIG.MYSQL_HOST,
    port: Number(SERVER_CONFIG.MYSQL_PORT),
    user: SERVER_CONFIG.MYSQL_USER,
    password: SERVER_CONFIG.MYSQL_PASSWORD,
    database: SERVER_CONFIG.MYSQL_DATABASE,
    ssl: SERVER_CONFIG.MYSQL_SSL,
  },
};

// cf. https://github.com/remix-run/remix/blob/7a4279a513fb38fdea5b49a3a6ffa24dfbafcf16/examples/jokes/app/utils/db.server.ts

export let client: Knex;

declare global {
  var __DEV_CLIENT__: any;
}

if (process.env.NODE_ENV === "production") {
  client = initKnex(CONFIG);
} else {
  if (!global.__DEV_CLIENT__) {
    global.__DEV_CLIENT__ = initKnex(CONFIG);
  }
  client = global.__DEV_CLIENT__;
}
