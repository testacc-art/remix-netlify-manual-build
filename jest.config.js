/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["app"],
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
};
