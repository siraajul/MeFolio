import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display key personal information', async ({ page }) => {
        // Go to the home page
        await page.goto('/');

        // Check for the name "Sirajul Islam" in the title or hero
        await expect(page).toHaveTitle(/Sirajul Islam/);

        // Check specific Hero text
        // Note: Since we use BlurText, we check for presence of the text content
        // Using .first() because BlurText might render multiple layers or the layout might have duplicates
        await expect(page.getByText('SIRAJUL').first()).toBeVisible();
        await expect(page.getByText('ISLAM').first()).toBeVisible();

        // Check for tagline presence (checking first word as BlurText splits words into spans without spaces in DOM)
        await expect(page.getByText('Ensuring').first()).toBeVisible();
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
