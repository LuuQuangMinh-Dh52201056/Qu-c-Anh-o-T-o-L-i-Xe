import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort())
  await page.route('https://www.google.com/maps**', route => route.abort())
  await page.route('https://www.tiktok.com/embed.js', route => route.abort())
})

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`${viewport.name}: process and fee menus reach their section on repeated clicks`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc')
    await page.evaluate(() => document.fonts.ready)

    for (const [label, sectionId] of [
      ['Quy trình thi', 'lo-trinh'],
      ['Học phí', 'hoc-phi'],
    ]) {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        if (attempt > 0) await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        if (viewport.name === 'mobile') await page.getByRole('button', { name: 'Mở menu', exact: true }).click()
        const navigation = page.getByRole('navigation', { name: viewport.name === 'mobile' ? 'Điều hướng trên điện thoại' : 'Điều hướng chính', exact: true })
        await navigation.getByRole('link', { name: label, exact: true }).click()
        await expect(page).toHaveURL(new RegExp('/#' + sectionId + '$'))
        if (viewport.name === 'mobile') await expect(navigation).toHaveCount(0)
        const section = page.locator('#' + sectionId)
        await expect(section).toBeVisible()
        await expect.poll(async () => {
          const targetBox = await section.boundingBox()
          const headerBox = await page.locator('.site-header').boundingBox()
          return targetBox!.y - (headerBox!.y + headerBox!.height)
        }).toBeGreaterThanOrEqual(10)
        const targetBox = await section.boundingBox()
        const headerBox = await page.locator('.site-header').boundingBox()
        expect(targetBox!.y - (headerBox!.y + headerBox!.height)).toBeLessThanOrEqual(28)
        await expect(section.getByRole('heading', { level: 2 }).first()).toBeVisible()
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}

test('mobile: course arrows move the rail without moving the page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#khoa-hoc')
  await page.evaluate(() => document.fonts.ready)
  const rail = page.locator('#home-course-strip')
  const previous = page.getByRole('button', { name: 'Xem khóa học trước', exact: true })
  const next = page.getByRole('button', { name: 'Xem khóa học tiếp theo', exact: true })
  await expect(next).toBeVisible()
  await expect(next).toBeEnabled()
  await expect(previous).toBeDisabled()
  const originalScroll = await page.evaluate(() => window.scrollY)
  const originalTop = (await next.boundingBox())!.y

  await next.click()
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeGreaterThan(100)
  await expect(previous).toBeEnabled()
  expect(Math.abs(await page.evaluate(() => window.scrollY) - originalScroll)).toBeLessThanOrEqual(2)
  expect(Math.abs((await next.boundingBox())!.y - originalTop)).toBeLessThanOrEqual(2)

  await previous.click()
  await expect(previous).toBeDisabled()
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeLessThanOrEqual(2)
  expect(Math.abs(await page.evaluate(() => window.scrollY) - originalScroll)).toBeLessThanOrEqual(2)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
