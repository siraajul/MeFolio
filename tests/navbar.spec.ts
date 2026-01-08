import { test, expect } from '@playwright/test';

test.describe('Navbar Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display all navigation items', async ({ page, isMobile }) => {
        // Core items visible on all devices
        // Note: Check site-navbar.tsx for these values
        const coreItems = [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' },
        ];

        // Items only visible on desktop
        const desktopItems = [
            { name: 'Skills', href: '#skills' },
            { name: 'Experience', href: '#experience' },
            { name: 'Education', href: '#education' },
            { name: 'Writing', href: '#writing' },
        ];

        // Check core items
        for (const item of coreItems) {
            // Use href locator which works for both text (desktop) and icon (mobile) versions
            await expect(page.locator(`a[href="${item.href}"]`).first()).toBeVisible();
        }

        // Check desktop specific items
        for (const item of desktopItems) {
            const locator = page.locator(`a[href="${item.href}"]`).first();
            if (isMobile) {
                // In mobile, these items are hidden (display: none)
                await expect(locator).toBeHidden();
            } else {
                await expect(locator).toBeVisible();
            }
        }
    });

    test('should NOT display the animation mascot (carton)', async ({ page }) => {
        // The mascot had specific sparkles with text "✨"
        await expect(page.getByText('✨')).not.toBeVisible();
    });

    test('should highlight active tab on click', async ({ page }) => {
        // Click on "About" using href locator
        const aboutLink = page.locator('a[href="#about"]').first();
        await aboutLink.click();

        // Use regex for class check because specific classes depend on state (hover etc)
        // We know 'text-white' is applied when active.
        await expect(aboutLink).toHaveClass(/text-white/);
    });
});
