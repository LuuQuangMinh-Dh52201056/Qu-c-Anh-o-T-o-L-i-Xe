import { expect, test, type Page } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]

const courseChoices = [
  { slug: 'hang-a', title: 'Hạng A', price: '2.500.000đ', firstModule: 'Tư duy lái xe an toàn', localVideo: true },
  { slug: 'hang-a1', title: 'Hạng A1', price: '900.000đ', firstModule: 'Lý thuyết gắn với việc đi xe hằng ngày', localVideo: true },
  { slug: 'hang-b-so-san', title: 'B Số Sàn', price: '22.000.000đ', firstModule: 'Làm quen khoang lái và kiến thức nền', localVideo: false },
  { slug: 'hang-b-tu-dong', title: 'B Tự Động', price: '22.000.000đ', firstModule: 'Hiểu xe và thói quen trước khi lái', localVideo: false },
  { slug: 'hang-c1', title: 'Hạng C1', price: '24.000.000đ', firstModule: 'Hiểu phương tiện và kiểm tra trước khi lái', localVideo: false },
]

const sectionChoices = [
  { label: 'Nội dung học', id: 'noi-dung-khoa-hoc' },
  { label: 'Phù hợp với ai', id: 'doi-tuong' },
  { label: 'Lộ trình', id: 'lo-trinh-hoc' },
  { label: 'Học phí', id: 'hoc-phi' },
  { label: 'Câu hỏi', id: 'cau-hoi' },
]

test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort())
  await page.route('https://www.google.com/maps**', route => route.abort())
})

async function expectSectionBelowHeader(page: Page, sectionId: string) {
  const section = page.locator('#' + sectionId)
  await expect.poll(async () => section.evaluate(element => {
    const header = document.querySelector('.site-header')!
    return element.getBoundingClientRect().top - header.getBoundingClientRect().bottom
  }), { message: `${sectionId} should land below the header with one anchor offset` })
    .toBeGreaterThanOrEqual(-2)
  await expect.poll(async () => section.evaluate(element => {
    const header = document.querySelector('.site-header')!
    return element.getBoundingClientRect().top - header.getBoundingClientRect().bottom
  }), { message: `${sectionId} should stay close to the header` })
    .toBeLessThanOrEqual(28)

  const heading = await section.getByRole('heading', { level: 2 }).first().boundingBox()
  const header = await page.locator('.site-header').boundingBox()
  expect(heading).not.toBeNull()
  expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height - 2)
  expect(heading!.y + heading!.height).toBeLessThanOrEqual(page.viewportSize()!.height)
}

for (const viewport of viewports) {
  test(`${viewport.name}: every grade has its own complete content and real contact channels`, async ({ page }) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))

    for (const course of courseChoices) {
      await page.goto('/khoa-hoc/' + course.slug)
      await expect(page.locator('.course-detail__intro h1')).toHaveText(course.title)
      await expect(page).toHaveTitle(/Văn Phòng Học Lái Xe Linh Xuân/)
      const switcher = page.getByRole('navigation', { name: 'Chọn hạng bằng' })
      await expect(switcher.locator('a[aria-current="page"]')).toHaveText(course.title)
      await expect(switcher.locator('a')).toHaveCount(5)

      const modules = page.locator('.course-detail__module')
      expect(await modules.count()).toBeGreaterThanOrEqual(4)
      await expect(modules.first().getByRole('heading', { level: 3 })).toHaveText(course.firstModule)
      for (const module of await modules.all()) {
        await expect(module.getByRole('heading', { level: 3 })).not.toBeEmpty()
        await expect(module.locator('p').first()).not.toBeEmpty()
      }

      const fees = page.locator('#hoc-phi')
      await expect(fees).toContainText(course.price)
      await expect(fees).toContainText(/tham khảo/i)
      await expect(page.locator('.course-detail__price')).toHaveText(course.price)
      await expect(page.locator('#chuan-bi')).toContainText(/hồ sơ/i)
      await expect(page.getByRole('contentinfo')).toContainText('Đường Số 1, Khu Phố 4, Phường Linh Xuân, Thủ Đức, Thành Phố Hồ Chí Minh')
      await expect(page.locator('.course-detail__office-link')).toHaveAttribute('href', 'https://maps.app.goo.gl/bf62B1T8RFGcrDyYA')

      const contact = page.locator('.course-detail__contact-card')
      await expect(contact.locator('a[href="https://zalo.me/0879227614"]')).toHaveCount(1)
      await expect(contact.locator('a[href="tel:0879227614"]')).toHaveCount(1)
      await expect(page.locator('form')).toHaveCount(0)

      const vehicle = page.locator('.course-detail__image img')
      await expect(vehicle).toHaveCSS('object-fit', 'contain')
      await expect.poll(() => vehicle.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      expect(await page.locator('.course-detail__training-gallery img').count()).toBeGreaterThan(0)

      if (course.localVideo) {
        const video = page.locator('#video-khoa-hoc video')
        await expect(video).toHaveCount(1)
        await expect(video).toHaveAttribute('preload', 'none')
        await expect(video.locator('source')).toHaveAttribute('src', /\.mp4$/)
      } else {
        await expect(page.locator('.course-detail__tiktok-link')).toHaveAttribute('href', 'https://www.tiktok.com/@quoc.anh.dtlx.binhduong?is_from_webapp=1&sender_device=pc')
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }

    await page.goto('/khoa-hoc/khong-ton-tai')
    await expect(page.getByRole('heading', { name: 'Chưa tìm thấy khóa học này.' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Xem tất cả khóa học' })).toHaveAttribute('href', '/khoa-hoc#danh-sach-khoa-hoc')
    await expect(page.locator('.course-not-found a[href="https://zalo.me/0879227614"]')).toHaveCount(1)
    expect(errors).toEqual([])
  })

  test(`${viewport.name}: switching grades and repeated section clicks reach the chosen content`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/khoa-hoc/hang-a')

    for (const course of courseChoices) {
      await page.getByRole('navigation', { name: 'Chọn hạng bằng' })
        .getByRole('link', { name: course.title, exact: true }).click()
      await expect(page).toHaveURL(new RegExp('/khoa-hoc/' + course.slug + '$'))
      await expect(page.locator('.course-detail__intro h1')).toHaveText(course.title)
      await expect(page.locator('.course-detail__module h3').first()).toHaveText(course.firstModule)

      const tabs = page.getByRole('navigation', { name: 'Nội dung khóa học' })
      for (const section of sectionChoices) {
        const link = tabs.getByRole('link', { name: section.label, exact: true })
        await link.click()
        await expect(page).toHaveURL(new RegExp('/khoa-hoc/' + course.slug + '#' + section.id + '$'))
        await expectSectionBelowHeader(page, section.id)

        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await link.click()
        await expectSectionBelowHeader(page, section.id)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  })
}
