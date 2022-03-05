import { test } from "@playwright/test";

test("user-registration", async ({ page }) => {
  await page.goto("/users/register");
  await page.locator('input[name="name"]').fill("test-user");
  await page.locator('input[name="password"]').fill("test-pass");
  await page.locator("text=Register").click();
  await page.waitForURL("/users/profile");
});
