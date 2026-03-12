import { test, expect } from '@playwright/test'

// You can adjust the URL to your production URL after deployment
const targetUrl = process.env.ENVIRONMENT_URL || 'https://siraajul.com'

test('Homepage loads correctly', async ({ page }) => {
  // Set a high timeout for initial load
  test.setTimeout(30000)

  // Navigate to the homepage
  const response = await page.goto(targetUrl)

  // Verify the response status is 200
  expect(response?.status()).toBe(200)

  // Verify the Hero section text is visible
  // We look for "SIRAJUL" which is the main standout text
  await expect(page.getByText('SIRAJUL', { exact: true }).first()).toContainText('SIRAJUL')

  // Verify the "Book a Reality Check" button exists
  await expect(page.getByRole('button', { name: /Book a Reality Check/i })).toBeVisible()

  // Take a snapshot for the checkly dashboard
  await page.screenshot({ path: 'homepage.png' })
})
