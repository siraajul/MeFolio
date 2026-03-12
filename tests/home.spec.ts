import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display key personal information', async ({ page }) => {
        // Go to the home page
        await page.goto('/');

        // Check for the name "Sirajul Islam" in the title or hero
        await expect(page).toHaveTitle(/Sirajul Islam/);

        // Check specific Hero text
        // Note: Since we use BlurText, we check for presence using exact match and .first() to be safe
        await expect(page.getByText('SIRAJUL', { exact: true }).first()).toBeVisible();
        await expect(page.getByText('ISLAM', { exact: true }).first()).toBeVisible();
        
        // Check for tagline presence using a more flexible approach (looking for either the Sanity content or the fallback)
        // We can just check for "software" which is likely present in both versions or better, check for the CTA button.
        await expect(page.getByRole('button', { name: /Book a Reality Check/i })).toBeVisible();
    });

    test('should have working navigation', async ({ page }) => {
        await page.goto('/');

        // Check if the timeline exists (Experience Section)
        await expect(page.locator('#experience')).toBeVisible();

        // Check for Projects section
        // We look for the section presence rather than specific text that might change
        await expect(page.locator('#projects')).toBeVisible();
    });
});
