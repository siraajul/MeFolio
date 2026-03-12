import { test, expect } from '@playwright/test'

// You can adjust the URL to your production URL after deployment
const targetUrl = process.env.ENVIRONMENT_URL || 'https://siraajul.com'

test('Homepage loads correctly', async ({ page }) => {
  // Set a high timeout for initial load
  test.setTimeout(30000)

  // Vercel deployment authentication bypass
  // See: https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  await page.setExtraHTTPHeaders({
    'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_TOKEN || ''
  })

  // Navigate to the homepage
  const response = await page.goto(targetUrl)

  // Verify the response status is 200 (allow 401 if token is missing so we can debug, but log it)
  expect(response?.status()).toBeLessThan(400)

  // Verify the Hero section text is visible
  // We use getByTestId for absolute precision and to avoid strict-mode violations
  await expect(page.getByTestId('hero-first-name')).toContainText('SIRAJUL')

  // Verify the "Book a Reality Check" button exists
  await expect(page.getByRole('button', { name: /Book a Reality Check/i })).toBeVisible()

  // Take a snapshot for the checkly dashboard
  await page.screenshot({ path: 'homepage.png' })
})
