import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const APP_PORT = 4185
const receivedRequests = []

function listen(server, port = 0) {
  return new Promise((resolveListen, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', () => {
      server.off('error', reject)
      resolveListen(server.address())
    })
  })
}

function close(server) {
  return new Promise((resolveClose) => server.close(resolveClose))
}

async function waitForServer(url) {
  let lastError

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
    } catch (error) {
      lastError = error
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 100))
  }

  throw lastError || new Error(`Server did not start: ${url}`)
}

const upstream = createServer(async (request, response) => {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)

  const fields = Object.fromEntries(
    new URLSearchParams(Buffer.concat(chunks).toString('utf8')),
  )
  receivedRequests.push(fields)

  response.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(
    JSON.stringify({
      success: true,
      message: 'Đăng ký đã được ghi nhận thành công.',
      leadId: fields.leadId,
    }),
  )
})

const upstreamAddress = await listen(upstream)
const app = spawn(process.execPath, ['server.mjs'], {
  cwd: ROOT,
  env: {
    ...process.env,
    GOOGLE_SCRIPT_URL: `http://127.0.0.1:${upstreamAddress.port}/exec`,
    GOOGLE_SCRIPT_SECRET: 'qa-smoke-secret',
    PORT: String(APP_PORT),
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})

let appLogs = ''
app.stdout.on('data', (chunk) => {
  appLogs += chunk.toString()
})
app.stderr.on('data', (chunk) => {
  appLogs += chunk.toString()
})

try {
  const baseUrl = `http://127.0.0.1:${APP_PORT}`
  const healthResponse = await waitForServer(`${baseUrl}/api/health`)
  const health = await healthResponse.json()
  assert.equal(health.success, true)
  assert.equal(health.googleScriptConfigured, true)
  assert.equal(health.googleScriptSecretConfigured, true)

  const spaResponse = await fetch(`${baseUrl}/dang-ky`)
  assert.equal(spaResponse.status, 200)
  assert.match(await spaResponse.text(), /<div id="root"><\/div>/)

  const leadId = 'qa-smoke-20260810'
  const registrationResponse = await fetch(
    `${baseUrl}/api/registrations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId,
        fullName: 'Nguyễn Minh Anh',
        phone: '0879227614',
        birthYear: '2000',
        course: 'BTĐ',
        preferredTime: 'Cuối tuần',
        area: 'Dĩ An, Bình Dương',
        contactMethod: 'Zalo',
        note: 'Cần tư vấn học phí\nƯu tiên liên hệ buổi tối',
        source: 'Website Quốc Anh - Trang đăng ký',
        pageUrl: `${baseUrl}/dang-ky?utm_source=tiktok`,
        website: 'quoc-anh-dao-tao-lai-xe.onrender.com',
        utmSource: 'tiktok',
        utmMedium: 'social',
        utmCampaign: 'tuyen-sinh',
        utmContent: 'video-a1',
        ttclid: 'test-tiktok-click-id',
      }),
    },
  )
  assert.equal(registrationResponse.status, 201)
  assert.deepEqual(await registrationResponse.json(), {
    success: true,
    message: 'Đăng ký đã được ghi nhận thành công.',
    leadId,
    duplicate: false,
    updated: false,
  })
  assert.equal(receivedRequests.length, 1)
  assert.equal(receivedRequests[0].phone, '0879227614')
  assert.equal(receivedRequests[0].course, 'BTĐ')
  assert.equal(receivedRequests[0].ingestSecret, 'qa-smoke-secret')
  assert.equal(receivedRequests[0].utmContent, 'video-a1')
  assert.equal(receivedRequests[0].ttclid, 'test-tiktok-click-id')
  assert.equal(
    receivedRequests[0].website,
    'quoc-anh-dao-tao-lai-xe.onrender.com',
  )

  const invalidResponse = await fetch(`${baseUrl}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'A',
      phone: '123',
      course: '',
    }),
  })
  assert.equal(invalidResponse.status, 422)
  assert.equal(receivedRequests.length, 1)

  const invalidCourseResponse = await fetch(
    `${baseUrl}/api/registrations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Nguyễn Minh Anh',
        phone: '0879227614',
        course: 'B2',
      }),
    },
  )
  assert.equal(invalidCourseResponse.status, 422)
  assert.equal(receivedRequests.length, 1)

  const botResponse = await fetch(`${baseUrl}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Bot Test',
      phone: '0879227614',
      course: 'A1',
      companyWebsite: 'https://spam.example',
    }),
  })
  assert.equal(botResponse.status, 201)
  assert.equal(receivedRequests.length, 1)

  const builtAssets = await readdir(resolve(ROOT, 'dist', 'assets'))
  const videoName = builtAssets.find((name) => name.endsWith('.mp4'))
  assert.ok(videoName, 'Expected a built MP4 asset')

  const rangeResponse = await fetch(
    `${baseUrl}/assets/${encodeURIComponent(videoName)}`,
    { headers: { Range: 'bytes=0-31' } },
  )
  assert.equal(rangeResponse.status, 206)
  assert.equal((await rangeResponse.arrayBuffer()).byteLength, 32)

  console.log('Smoke test passed: health, SPA, proxy, validation, bot trap, video range.')
} catch (error) {
  if (appLogs) console.error(appLogs)
  throw error
} finally {
  app.kill('SIGTERM')
  await close(upstream)
}
