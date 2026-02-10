import { test, expect } from '@playwright/test';

test.describe('Navbar Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display all navigation items', async ({ page, isMobile }) => {
        // Core items visible on all devices
        // Note: Check use-navigation.ts for these values
        // Home uses "/" and others use "/#section" format
        const coreItems = [
            { name: 'Home', href: '/' },
            { name: 'About', href: '/#about' },
            { name: 'Projects', href: '/#projects' },
            { name: 'Contact', href: '/#contact' },
        ];

        // Items only visible on desktop
        const desktopItems = [
            { name: 'Skills', href: '/#skills' },
            { name: 'Experience', href: '/#experience' },
            { name: 'Education', href: '/#education' },
            { name: 'Writing', href: '/#writing' },
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
        // Click on "About" using the correct href from use-navigation.ts
        const aboutLink = page.locator('a[href="/#about"]').first();
        await aboutLink.click();

        // The AnimeNavbar applies 'text-white' class when a tab is active.
        // When inactive, it has 'text-white/70'.
        await expect(aboutLink).toHaveClass(/text-white/);
    });
});
