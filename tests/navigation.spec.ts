import { expect, test, type Page } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]

test.beforeEach(async ({ page }) => {
  // Keep provider loading and font swaps independent of the navigation checks.
  await page.route('https://fonts.googleapis.com/**', route => route.abort())
  await page.route('https://www.google.com/maps**', route => route.abort())
  await page.route('https://www.tiktok.com/embed.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `document.querySelectorAll('blockquote.tiktok-embed').forEach(host => {
      const frame = document.createElement('iframe');
      frame.src = 'data:text/html,' + encodeURIComponent('<p>Video từ kênh TikTok</p>');
      frame.style.width = '100%'; frame.style.height = '480px';
      host.appendChild(frame);
    });`,
  }))
})

async function clickMenu(page: Page, mobile: boolean, label: string) {
  if (mobile) {
    await page.getByRole('button', { name: 'Mở menu', exact: true }).click()
    await page.getByRole('navigation', { name: 'Điều hướng trên điện thoại' })
      .getByRole('link', { name: label, exact: true }).click()
    await expect(page.locator('.mobile-nav')).toHaveCount(0)
  } else {
    await page.getByRole('navigation', { name: 'Điều hướng chính' })
      .getByRole('link', { name: label, exact: true }).click()
  }
}

async function expectActiveMenu(page: Page, mobile: boolean, label: string) {
  if (mobile) await page.getByRole('button', { name: 'Mở menu', exact: true }).click()
  const navigation = page.getByRole('navigation', {
    name: mobile ? 'Điều hướng trên điện thoại' : 'Điều hướng chính',
  })
  await expect(navigation.locator('a[aria-current]')).toHaveCount(1)
  await expect(navigation.locator('a[aria-current]')).toHaveText(label)
  if (mobile) await page.getByRole('button', { name: 'Đóng menu', exact: true }).click()
}

async function expectSectionBelowHeader(page: Page, sectionId: string, checkHeading = true) {
  const section = page.locator('#' + sectionId)
  await expect.poll(async () => section.evaluate(element => {
    const header = document.querySelector('.site-header')!
    return element.getBoundingClientRect().top - header.getBoundingClientRect().bottom
  }), { message: `${sectionId} should land just below the sticky header` })
    .toBeGreaterThanOrEqual(-2)
  await expect.poll(async () => section.evaluate(element => {
    const header = document.querySelector('.site-header')!
    return element.getBoundingClientRect().top - header.getBoundingClientRect().bottom
  }), { message: `${sectionId} should not have a large extra anchor offset` })
    .toBeLessThanOrEqual(28)

  if (!checkHeading) return
  const heading = section.getByRole('heading', { level: 2 }).first()
  await expect(heading).toBeVisible()
  const headingBox = await heading.boundingBox()
  const headerBox = await page.locator('.site-header').boundingBox()
  expect(headingBox!.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height - 2)
  expect(headingBox!.y + headingBox!.height).toBeLessThanOrEqual(page.viewportSize()!.height)
}

for (const viewport of viewports) {
  const mobile = viewport.name === 'mobile'

  test(`${viewport.name}: the course menu lands on the visible vehicle filters`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/lien-he')
    await clickMenu(page, mobile, 'Khóa học')
    await expect(page).toHaveURL(/\/khoa-hoc#danh-sach-khoa-hoc$/)
    await expectSectionBelowHeader(page, 'danh-sach-khoa-hoc', false)
    const toolbar = await page.locator('.course-catalog__toolbar').boundingBox()
    const header = await page.locator('.site-header').boundingBox()
    expect(toolbar!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
    expect(toolbar!.y + toolbar!.height).toBeLessThanOrEqual(viewport.height)
    await expectActiveMenu(page, mobile, 'Khóa học')

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await clickMenu(page, mobile, 'Khóa học')
    await expectSectionBelowHeader(page, 'danh-sach-khoa-hoc', false)
  })

  test(`${viewport.name}: section menus reach the target, repeat and reset home`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc')
    await page.evaluate(() => document.fonts.ready)

    for (const [label, sectionId] of [
      ['Văn phòng', 'gioi-thieu'],
      ['Góc học lái xe', 'mang-xa-hoi'],
    ]) {
      await clickMenu(page, mobile, label)
      await expect(page).toHaveURL(new RegExp('/#' + sectionId + '$'))
      await expectSectionBelowHeader(page, sectionId)
      await expectActiveMenu(page, mobile, label)

      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await clickMenu(page, mobile, label)
      await expectSectionBelowHeader(page, sectionId)
    }

    await clickMenu(page, mobile, 'Trang chủ')
    await expect(page).toHaveURL(/\/$/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expectActiveMenu(page, mobile, 'Trang chủ')

    // Repeated clicks on a hashless home route also return to its beginning.
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }))
    await clickMenu(page, mobile, 'Trang chủ')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  })

  test(`${viewport.name}: choosing a vehicle keeps the visible filters in place`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc')
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.course-catalog__toolbar').evaluate(element => {
      const headerHeight = document.querySelector('.site-header')!.getBoundingClientRect().height
      window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - headerHeight - 24, behavior: 'instant' })
    })
    const originalScroll = await page.evaluate(() => window.scrollY)
    const originalTop = (await page.locator('.course-catalog__toolbar').boundingBox())!.y

    for (const [label, count] of [['Xe máy', 2], ['Ô tô', 3], ['Tất cả khóa học', 5]] as const) {
      const button = page.getByRole('button', { name: label, exact: true })
      await button.click()
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      await expect(page.locator('.course-card')).toHaveCount(count)
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      expect(Math.abs(await page.evaluate(() => window.scrollY) - originalScroll)).toBeLessThanOrEqual(2)
      const toolbarTop = (await page.locator('.course-catalog__toolbar').boundingBox())!.y
      expect(Math.abs(toolbarTop - originalTop)).toBeLessThanOrEqual(2)
    }
  })

  test(`${viewport.name}: course content links use one header offset`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc/hang-a1')
    await page.evaluate(() => document.fonts.ready)
    await page.getByRole('link', { name: 'Xem nội dung', exact: true }).click()
    await expect(page).toHaveURL(/\/khoa-hoc\/hang-a1#noi-dung-khoa-hoc$/)
    await expectSectionBelowHeader(page, 'noi-dung-khoa-hoc')

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.getByRole('link', { name: 'Xem nội dung', exact: true }).click()
    await expectSectionBelowHeader(page, 'noi-dung-khoa-hoc')
  })

  test(`${viewport.name}: the last section click wins during a quick switch`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc')
    await clickMenu(page, mobile, 'Văn phòng')
    await clickMenu(page, mobile, 'Góc học lái xe')
    await expect(page).toHaveURL(/\/#mang-xa-hoi$/)
    await expectSectionBelowHeader(page, 'mang-xa-hoi')
    await expectActiveMenu(page, mobile, 'Góc học lái xe')
  })

  test(`${viewport.name}: browser Back returns to the chosen vehicles and catalog position`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc')
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.course-catalog__toolbar').evaluate(element => {
      const headerHeight = document.querySelector('.site-header')!.getBoundingClientRect().height
      window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - headerHeight - 24, behavior: 'instant' })
    })
    await page.getByRole('button', { name: 'Ô tô', exact: true }).click()
    await expect(page.locator('.course-card')).toHaveCount(3)
    const previousScroll = await page.evaluate(() => window.scrollY)
    const courseTitle = page.locator('.course-card h3 a').first()
    const titleText = await courseTitle.textContent()
    await courseTitle.click()
    await expect(page).toHaveURL(/\/khoa-hoc\/hang-b-so-san$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(titleText!)

    await page.goBack()
    await expect(page).toHaveURL(/\/khoa-hoc$/)
    await expect(page.getByRole('button', { name: 'Ô tô', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.course-card')).toHaveCount(3)
    await expect.poll(async () => Math.abs(await page.evaluate(() => window.scrollY) - previousScroll))
      .toBeLessThanOrEqual(2)
  })
}
