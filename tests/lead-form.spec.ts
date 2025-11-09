import { test, expect } from "@playwright/test"

test.describe("Lead form happy path", () => {
  test("submits successfully via modal", async ({ page }) => {
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      })
    })

    await page.goto("/")

    const acceptButton = page.getByRole("button", { name: /принять все/i })
    if (await acceptButton.isVisible()) {
      await acceptButton.click()
    }

    await page.getByRole("button", { name: /стартовать проект/i }).click()

    await expect(page.getByRole("heading", { name: /старт проекта/i })).toBeVisible()

    await page.fill('input[name="name"]', "Тест Пользователь")
    await page.fill('input[id="phone"]', "+7 (999) 123-45-67")
    await page.fill('input[id="email"]', "test@example.com")
    await page.fill('input[id="telegram"]', "@burra_test")
    await page.click('label[for="consent"]')

    await page.getByRole("button", { name: /отправить заявку/i }).click()

    await expect(page.getByText(/заявка отправлена/i)).toBeVisible()
  })
})

