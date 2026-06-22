import { test, expect } from '@playwright/test';

test('homepage and main navigation load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(/Users/i);

  await page.click('a.nav-link:has-text("Teams")');
  await expect(page.locator('h1')).toHaveText(/Teams/i);

  await page.click('a.nav-link:has-text("Activities")');
  await expect(page.locator('h1')).toHaveText(/Activities/i);

  await page.click('a.nav-link:has-text("Leaderboard")');
  await expect(page.locator('h1')).toHaveText(/Leaderboard/i);

  await page.click('a.nav-link:has-text("Workouts")');
  await expect(page.locator('h1')).toHaveText(/Available Workouts|Workouts/i);
});
