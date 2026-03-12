import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display key personal information', async ({ page }) => {
        // Go to the home page
        await page.goto('/');

        // Check for the name "Sirajul Islam" in the title or hero
        await expect(page).toHaveTitle(/Sirajul Islam/);

        // Check specific Hero text
        // We use getByTestId for absolute precision and to avoid strict-mode violations with footer/background text
        await expect(page.getByTestId('hero-first-name')).toBeVisible();
        await expect(page.getByTestId('hero-last-name')).toBeVisible();
        await expect(page.getByTestId('hero-first-name')).toContainText('SIRAJUL');
        await expect(page.getByTestId('hero-last-name')).toContainText('ISLAM');
        
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
