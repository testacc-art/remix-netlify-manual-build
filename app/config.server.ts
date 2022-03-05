export const SERVER_CONFIG = {
  MYSQL_HOST: process.env.APP_MYSQL_HOST ?? "localhost",
  MYSQL_PORT: process.env.APP_MYSQL_PORT ?? "3306",
  MYSQL_USER: process.env.APP_MYSQL_USER ?? "root",
  MYSQL_PASSWORD: process.env.APP_MYSQL_PASSWORD ?? "password",
  MYSQL_DATABASE: process.env.APP_MYSQL_DATABASE ?? "remix_development",
  MYSQL_SSL: process.env.APP_MYSQL_SSL ? {} : undefined,
  SESSION_SECRET: process.env.APP_SESSION_SECRET ?? "__secret__",
} as const;
