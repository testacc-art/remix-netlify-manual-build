/**
 * @type {import("knex").Knex.Config}
 */
module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "remix_development",
  },
  migrations: {
    directory: "app/db/migrations",
    extension: "js",
  },
};
