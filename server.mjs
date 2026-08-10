import { randomBytes } from 'node:crypto'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

function loadLocalEnv() {
  const envFile = fileURLToPath(new URL('./.env.server', import.meta.url))

  if (!existsSync(envFile)) {
    return
  }

  for (const rawLine of readFileSync(envFile, 'utf8').split(/\r?\n/u)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex < 1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/u.test(key)) {
      continue
    }

    let value = line.slice(separatorIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadLocalEnv()

const HOST = '0.0.0.0'
const DEFAULT_PORT = 10000
const MAX_BODY_BYTES = 32 * 1024
const UPSTREAM_TIMEOUT_MS = 30_000
const RATE_LIMIT_MAX = readPositiveInteger(
  process.env.REGISTRATION_RATE_LIMIT,
  10,
)
const RATE_LIMIT_WINDOW_MS = readPositiveInteger(
  process.env.REGISTRATION_RATE_WINDOW_MS,
  10 * 60 * 1000,
)
const PORT = readPort(process.env.PORT)
const DIST_DIRECTORY = resolve(
  fileURLToPath(new URL('./dist/', import.meta.url)),
)
const INDEX_FILE = resolve(DIST_DIRECTORY, 'index.html')
const STARTED_AT = new Date()
const ALLOWED_COURSES = new Set(['A', 'A1', 'BSS', 'BTĐ', 'C1'])

const MIME_TYPES = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jfif', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.ogg', 'audio/ogg'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ttf', 'font/ttf'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webm', 'video/webm'],
  ['.webmanifest', 'application/manifest+json'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
])

const rateLimitEntries = new Map()

class HttpError extends Error {
  constructor(status, code, message, details = {}, headers = {}) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
    this.details = details
    this.headers = headers
  }
}

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback
}

function readPort(value) {
  const port = Number.parseInt(value ?? '', 10)
  return Number.isInteger(port) && port > 0 && port <= 65_535
    ? port
    : DEFAULT_PORT
}

function sendJson(response, status, payload, headers = {}, headOnly = false) {
  const body = JSON.stringify(payload)

  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  })
  response.end(headOnly ? undefined : body)
}

function getGoogleScriptUrl() {
  const configuredUrl = (
    process.env.GOOGLE_SCRIPT_URL ??
    process.env.VITE_GOOGLE_SCRIPT_URL ??
    ''
  ).trim()

  if (!configuredUrl) {
    throw new HttpError(
      503,
      'SERVICE_NOT_CONFIGURED',
      'Hệ thống tiếp nhận đăng ký chưa được cấu hình. Vui lòng gọi hotline để được hỗ trợ.',
    )
  }

  let parsedUrl

  try {
    parsedUrl = new URL(configuredUrl)
  } catch {
    throw new HttpError(
      503,
      'SERVICE_MISCONFIGURED',
      'Hệ thống tiếp nhận đăng ký đang được cấu hình lại. Vui lòng thử lại sau.',
    )
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new HttpError(
      503,
      'SERVICE_MISCONFIGURED',
      'Hệ thống tiếp nhận đăng ký đang được cấu hình lại. Vui lòng thử lại sau.',
    )
  }

  return parsedUrl
}

function isGoogleScriptConfigured() {
  return Boolean(
    (
      process.env.GOOGLE_SCRIPT_URL ??
      process.env.VITE_GOOGLE_SCRIPT_URL ??
      ''
    ).trim(),
  )
}

function isGoogleScriptSecretConfigured() {
  return Boolean((process.env.GOOGLE_SCRIPT_SECRET ?? '').trim())
}

function getGoogleScriptSecret() {
  const secret = (process.env.GOOGLE_SCRIPT_SECRET ?? '').trim()

  if (!secret) {
    throw new HttpError(
      503,
      'SERVICE_SECRET_NOT_CONFIGURED',
      'Hệ thống đăng ký chưa hoàn tất cấu hình bảo mật. Vui lòng gọi hotline để được hỗ trợ.',
    )
  }

  return secret
}

function getClientIp(request) {
  const forwardedFor = request.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.socket.remoteAddress ?? 'unknown'
}

function getRateLimit(request) {
  const now = Date.now()
  const clientIp = getClientIp(request)
  let entry = rateLimitEntries.get(clientIp)

  if (!entry || entry.resetAt <= now) {
    entry = {
      count: 0,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    }
  }

  entry.count += 1
  rateLimitEntries.set(clientIp, entry)

  if (rateLimitEntries.size > 10_000) {
    for (const [ip, candidate] of rateLimitEntries) {
      if (candidate.resetAt <= now || rateLimitEntries.size > 10_000) {
        rateLimitEntries.delete(ip)
      }
    }
  }

  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count)
  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
  const headers = {
    'RateLimit-Limit': String(RATE_LIMIT_MAX),
    'RateLimit-Remaining': String(remaining),
    'RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
  }

  if (entry.count > RATE_LIMIT_MAX) {
    headers['Retry-After'] = String(retryAfter)
  }

  return {
    allowed: entry.count <= RATE_LIMIT_MAX,
    headers,
  }
}

async function readRequestBody(request) {
  const declaredLength = Number.parseInt(
    request.headers['content-length'] ?? '0',
    10,
  )

  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new HttpError(
      413,
      'PAYLOAD_TOO_LARGE',
      'Dữ liệu đăng ký vượt quá dung lượng cho phép.',
    )
  }

  const chunks = []
  let totalBytes = 0

  for await (const chunk of request) {
    totalBytes += chunk.length

    if (totalBytes > MAX_BODY_BYTES) {
      throw new HttpError(
        413,
        'PAYLOAD_TOO_LARGE',
        'Dữ liệu đăng ký vượt quá dung lượng cho phép.',
      )
    }

    chunks.push(chunk)
  }

  return Buffer.concat(chunks).toString('utf8')
}

async function parseRegistrationBody(request) {
  const rawBody = await readRequestBody(request)

  if (!rawBody.trim()) {
    throw new HttpError(
      400,
      'EMPTY_BODY',
      'Vui lòng nhập thông tin đăng ký.',
    )
  }

  const contentType = String(request.headers['content-type'] ?? '')
    .split(';', 1)[0]
    .trim()
    .toLowerCase()

  if (contentType === 'application/json') {
    let value

    try {
      value = JSON.parse(rawBody)
    } catch {
      throw new HttpError(
        400,
        'INVALID_JSON',
        'Dữ liệu JSON không hợp lệ.',
      )
    }

    if (!value || Array.isArray(value) || typeof value !== 'object') {
      throw new HttpError(
        400,
        'INVALID_BODY',
        'Dữ liệu đăng ký không đúng định dạng.',
      )
    }

    return value
  }

  if (contentType === 'application/x-www-form-urlencoded') {
    return Object.fromEntries(new URLSearchParams(rawBody))
  }

  throw new HttpError(
    415,
    'UNSUPPORTED_MEDIA_TYPE',
    'Chỉ chấp nhận application/json hoặc application/x-www-form-urlencoded.',
  )
}

function cleanText(value, field, errors, options = {}) {
  const {
    defaultValue = '',
    maxLength = 200,
    minLength = 0,
    required = false,
  } = options

  if (value === undefined || value === null) {
    if (required) {
      errors[field] = 'Thông tin này là bắt buộc.'
    }

    return defaultValue
  }

  if (!['string', 'number'].includes(typeof value)) {
    errors[field] = 'Thông tin không đúng định dạng.'
    return defaultValue
  }

  const cleaned = String(value).trim()

  if (required && cleaned.length === 0) {
    errors[field] = 'Thông tin này là bắt buộc.'
  } else if (cleaned.length < minLength) {
    errors[field] = `Thông tin phải có ít nhất ${minLength} ký tự.`
  } else if (cleaned.length > maxLength) {
    errors[field] = `Thông tin không được vượt quá ${maxLength} ký tự.`
  } else if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(cleaned)) {
    errors[field] = 'Thông tin chứa ký tự không hợp lệ.'
  }

  return cleaned
}

function createLeadId() {
  const timePart = Date.now().toString(36).toUpperCase()
  const randomPart = randomBytes(4).toString('hex').toUpperCase()
  return `QA-${timePart}-${randomPart}`
}

function validateRegistration(input) {
  const errors = {}
  const suppliedLeadId = cleanText(input.leadId, 'leadId', errors, {
    maxLength: 100,
  })
  const leadId = suppliedLeadId || createLeadId()
  const fullName = cleanText(input.fullName, 'fullName', errors, {
    required: true,
    minLength: 2,
    maxLength: 100,
  }).replace(/\s+/g, ' ')
  const phone = cleanText(input.phone, 'phone', errors, {
    required: true,
    maxLength: 24,
  }).replace(/[\s().-]/g, '')
  const birthYear = cleanText(input.birthYear, 'birthYear', errors, {
    maxLength: 4,
  })
  const course = cleanText(input.course, 'course', errors, {
    required: true,
    maxLength: 100,
  })

  if (course && !ALLOWED_COURSES.has(course)) {
    errors.course = 'Vui lòng chọn hạng bằng hợp lệ.'
  }
  const preferredTime = cleanText(
    input.preferredTime,
    'preferredTime',
    errors,
    { maxLength: 100 },
  )
  const area = cleanText(input.area, 'area', errors, {
    maxLength: 160,
  })
  const contactMethod = cleanText(
    input.contactMethod,
    'contactMethod',
    errors,
    { defaultValue: 'Điện thoại', maxLength: 50 },
  )
  const note = cleanText(input.note, 'note', errors, {
    maxLength: 500,
  })
  const source = cleanText(input.source, 'source', errors, {
    defaultValue: 'Website Quốc Anh',
    maxLength: 100,
  })
  const pageUrl = cleanText(input.pageUrl, 'pageUrl', errors, {
    maxLength: 2_048,
  })
  const referrer = cleanText(input.referrer, 'referrer', errors, {
    maxLength: 2_048,
  })
  const utmSource = cleanText(input.utmSource, 'utmSource', errors, {
    maxLength: 200,
  })
  const utmMedium = cleanText(input.utmMedium, 'utmMedium', errors, {
    maxLength: 200,
  })
  const utmCampaign = cleanText(input.utmCampaign, 'utmCampaign', errors, {
    maxLength: 200,
  })
  const utmTerm = cleanText(input.utmTerm, 'utmTerm', errors, {
    maxLength: 200,
  })
  const utmContent = cleanText(input.utmContent, 'utmContent', errors, {
    maxLength: 200,
  })
  const ttclid = cleanText(input.ttclid, 'ttclid', errors, {
    maxLength: 500,
  })
  const fbclid = cleanText(input.fbclid, 'fbclid', errors, {
    maxLength: 500,
  })
  const gclid = cleanText(input.gclid, 'gclid', errors, {
    maxLength: 500,
  })
  const website = cleanText(input.website, 'website', errors, {
    maxLength: 2_048,
  })
  const companyWebsite = cleanText(
    input.companyWebsite,
    'companyWebsite',
    errors,
    {
      maxLength: 200,
    },
  )

  if (
    suppliedLeadId &&
    !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,99}$/.test(suppliedLeadId)
  ) {
    errors.leadId = 'Mã đăng ký không hợp lệ.'
  }

  if (phone && !/^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/.test(phone)) {
    errors.phone = 'Số điện thoại chưa đúng định dạng Việt Nam.'
  }

  if (birthYear) {
    const numericYear = Number(birthYear)
    const currentYear = new Date().getFullYear()

    if (
      !/^\d{4}$/.test(birthYear) ||
      numericYear < 1900 ||
      numericYear > currentYear
    ) {
      errors.birthYear = 'Năm sinh không hợp lệ.'
    }
  }

  return {
    data: {
      leadId,
      fullName,
      phone,
      birthYear,
      course,
      preferredTime,
      area,
      contactMethod,
      note,
      source,
      pageUrl,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      ttclid,
      fbclid,
      gclid,
      website,
      companyWebsite,
    },
    errors,
  }
}

function toGoogleScriptBody(data) {
  const form = new URLSearchParams()

  for (const field of [
    'leadId',
    'fullName',
    'phone',
    'birthYear',
    'course',
    'preferredTime',
    'area',
    'contactMethod',
    'note',
    'source',
    'pageUrl',
    'referrer',
    'utmSource',
    'utmMedium',
    'utmCampaign',
    'utmTerm',
    'utmContent',
    'ttclid',
    'fbclid',
    'gclid',
    'website',
  ]) {
    form.set(field, data[field])
  }

  form.set('createdAt', new Date().toISOString())

  form.set('ingestSecret', getGoogleScriptSecret())

  return form
}

async function forwardRegistration(data) {
  const targetUrl = getGoogleScriptUrl()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'User-Agent': 'Quoc-Anh-Driving-Registration/1.0',
      },
      body: toGoogleScriptBody(data).toString(),
      redirect: 'follow',
      signal: controller.signal,
    })
    const responseText = await response.text()

    if (!response.ok) {
      throw new HttpError(
        502,
        'UPSTREAM_ERROR',
        'Google Sheet chưa xác nhận đăng ký. Vui lòng thử lại hoặc gọi hotline.',
      )
    }

    let result

    try {
      result = JSON.parse(responseText)
    } catch {
      throw new HttpError(
        502,
        'INVALID_UPSTREAM_RESPONSE',
        'Google Sheet chưa xác nhận đăng ký. Vui lòng thử lại hoặc gọi hotline.',
      )
    }

    if (!result || result.success !== true) {
      throw new HttpError(
        502,
        'UPSTREAM_REJECTED',
        typeof result?.message === 'string' && result.message.trim()
          ? result.message.trim().slice(0, 300)
          : 'Google Sheet chưa xác nhận đăng ký. Vui lòng thử lại hoặc gọi hotline.',
      )
    }

    return {
      leadId:
        typeof result.leadId === 'string' && result.leadId.trim()
          ? result.leadId.trim().slice(0, 100)
          : data.leadId,
      message:
        typeof result.message === 'string' && result.message.trim()
          ? result.message.trim().slice(0, 300)
          : 'Đăng ký thành công! Quốc Anh sẽ liên hệ tư vấn sớm nhất.',
      duplicate: result.duplicate === true,
      updated: result.updated === true,
    }
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }

    if (error?.name === 'AbortError') {
      throw new HttpError(
        504,
        'UPSTREAM_TIMEOUT',
        'Google Sheet phản hồi quá chậm. Vui lòng thử lại sau.',
      )
    }

    throw new HttpError(
      502,
      'UPSTREAM_UNAVAILABLE',
      'Không thể kết nối Google Sheet. Vui lòng thử lại hoặc gọi hotline.',
    )
  } finally {
    clearTimeout(timeout)
  }
}

async function handleRegistration(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    throw new HttpError(
      405,
      'METHOD_NOT_ALLOWED',
      'Phương thức không được hỗ trợ.',
    )
  }

  const rateLimit = getRateLimit(request)

  if (!rateLimit.allowed) {
    throw new HttpError(
      429,
      'RATE_LIMITED',
      'Bạn đã gửi quá nhiều lần. Vui lòng chờ ít phút rồi thử lại.',
      {},
      rateLimit.headers,
    )
  }

  const input = await parseRegistrationBody(request)
  const { data, errors } = validateRegistration(input)

  if (Object.keys(errors).length > 0) {
    throw new HttpError(
      422,
      'VALIDATION_ERROR',
      'Vui lòng kiểm tra lại thông tin đăng ký.',
      {
        errors,
        leadId: data.leadId,
      },
      rateLimit.headers,
    )
  }

  // Hidden honeypot field: acknowledge bots without creating a Sheet row.
  if (data.companyWebsite) {
    sendJson(
      response,
      201,
      {
        success: true,
        message: 'Đã tiếp nhận đăng ký.',
        leadId: data.leadId,
      },
      rateLimit.headers,
    )
    return
  }

  const startedAt = Date.now()
  const result = await forwardRegistration(data)

  console.info(
    JSON.stringify({
      durationMs: Date.now() - startedAt,
      event: 'registration_forwarded',
      leadId: result.leadId,
      duplicate: result.duplicate,
      updated: result.updated,
    }),
  )

  sendJson(
    response,
    201,
    {
      success: true,
      message: result.message,
      leadId: result.leadId,
      duplicate: result.duplicate,
      updated: result.updated,
    },
    rateLimit.headers,
  )
}

function isInsideDist(filePath) {
  return (
    filePath === DIST_DIRECTORY ||
    filePath.startsWith(`${DIST_DIRECTORY}${sep}`)
  )
}

async function getFileStat(filePath) {
  try {
    return await stat(filePath)
  } catch (error) {
    if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') {
      return null
    }

    throw error
  }
}

function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim())

  if (!match || size === 0) {
    return null
  }

  const [, startText, endText] = match
  let start
  let end

  if (!startText) {
    const suffixLength = Number.parseInt(endText, 10)

    if (!Number.isFinite(suffixLength) || suffixLength <= 0) {
      return null
    }

    start = Math.max(0, size - suffixLength)
    end = size - 1
  } else {
    start = Number.parseInt(startText, 10)
    end = endText ? Number.parseInt(endText, 10) : size - 1
  }

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return null
  }

  return {
    start,
    end: Math.min(end, size - 1),
  }
}

function getStaticCacheControl(filePath) {
  if (filePath === INDEX_FILE) {
    return 'no-cache'
  }

  const relativePath = filePath.slice(DIST_DIRECTORY.length).replaceAll('\\', '/')

  if (relativePath.startsWith('/assets/')) {
    return 'public, max-age=31536000, immutable'
  }

  return 'public, max-age=3600'
}

function streamFile(request, response, filePath, fileStat) {
  const etag = `W/"${fileStat.size.toString(16)}-${Math.floor(
    fileStat.mtimeMs,
  ).toString(16)}"`
  const headers = {
    'Accept-Ranges': 'bytes',
    'Cache-Control': getStaticCacheControl(filePath),
    'Content-Type':
      MIME_TYPES.get(extname(filePath).toLowerCase()) ??
      'application/octet-stream',
    ETag: etag,
    'Last-Modified': fileStat.mtime.toUTCString(),
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
  }

  if (request.headers['if-none-match'] === etag) {
    response.writeHead(304, headers)
    response.end()
    return
  }

  const rangeHeader = request.headers.range
  let status = 200
  let start = 0
  let end = Math.max(0, fileStat.size - 1)

  if (rangeHeader) {
    const range = parseRange(rangeHeader, fileStat.size)

    if (!range) {
      response.writeHead(416, {
        ...headers,
        'Content-Range': `bytes */${fileStat.size}`,
      })
      response.end()
      return
    }

    status = 206
    start = range.start
    end = range.end
    headers['Content-Range'] = `bytes ${start}-${end}/${fileStat.size}`
  }

  headers['Content-Length'] = String(fileStat.size === 0 ? 0 : end - start + 1)
  response.writeHead(status, headers)

  if (request.method === 'HEAD' || fileStat.size === 0) {
    response.end()
    return
  }

  const fileStream = createReadStream(filePath, { end, start })
  fileStream.on('error', (error) => {
    console.error('static_stream_error', error)
    response.destroy(error)
  })
  fileStream.pipe(response)
}

function shouldUseSpaFallback(request, pathname) {
  const accept = String(request.headers.accept ?? '')
  return accept.includes('text/html') || extname(pathname) === ''
}

async function serveStatic(request, response, pathname) {
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.setHeader('Allow', 'GET, HEAD')
    throw new HttpError(
      405,
      'METHOD_NOT_ALLOWED',
      'Phương thức không được hỗ trợ.',
    )
  }

  let decodedPath

  try {
    decodedPath = decodeURIComponent(pathname)
  } catch {
    throw new HttpError(400, 'INVALID_PATH', 'Đường dẫn không hợp lệ.')
  }

  if (decodedPath.includes('\0')) {
    throw new HttpError(400, 'INVALID_PATH', 'Đường dẫn không hợp lệ.')
  }

  const relativePath = decodedPath.replace(/^\/+/, '')
  let filePath = resolve(DIST_DIRECTORY, relativePath || 'index.html')

  if (!isInsideDist(filePath)) {
    throw new HttpError(403, 'FORBIDDEN_PATH', 'Đường dẫn không được phép.')
  }

  let fileStat = await getFileStat(filePath)

  if (fileStat?.isDirectory()) {
    filePath = resolve(filePath, 'index.html')
    fileStat = await getFileStat(filePath)
  }

  if (!fileStat?.isFile() && shouldUseSpaFallback(request, pathname)) {
    filePath = INDEX_FILE
    fileStat = await getFileStat(filePath)
  }

  if (!fileStat?.isFile()) {
    throw new HttpError(404, 'NOT_FOUND', 'Không tìm thấy nội dung yêu cầu.')
  }

  streamFile(request, response, filePath, fileStat)
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url ?? '/', 'http://localhost')
  const pathname = requestUrl.pathname

  if (pathname === '/api/health') {
    if (!['GET', 'HEAD'].includes(request.method ?? '')) {
      response.setHeader('Allow', 'GET, HEAD')
      throw new HttpError(
        405,
        'METHOD_NOT_ALLOWED',
        'Phương thức không được hỗ trợ.',
      )
    }

    sendJson(
      response,
      200,
      {
        success: true,
        status: 'ok',
        service: 'quoc-anh-driving-web',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        googleScriptConfigured: isGoogleScriptConfigured(),
        googleScriptSecretConfigured: isGoogleScriptSecretConfigured(),
        startedAt: STARTED_AT.toISOString(),
      },
      {},
      request.method === 'HEAD',
    )
    return
  }

  if (pathname === '/api/registrations') {
    await handleRegistration(request, response)
    return
  }

  if (pathname.startsWith('/api/')) {
    throw new HttpError(404, 'API_NOT_FOUND', 'API không tồn tại.')
  }

  await serveStatic(request, response, pathname)
}

const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    if (response.headersSent) {
      response.destroy(error)
      return
    }

    if (error instanceof HttpError) {
      sendJson(
        response,
        error.status,
        {
          success: false,
          message: error.message,
          code: error.code,
          ...error.details,
        },
        error.headers,
        request.method === 'HEAD',
      )
      return
    }

    console.error('unhandled_request_error', error)
    sendJson(
      response,
      500,
      {
        success: false,
        message: 'Hệ thống gặp lỗi ngoài dự kiến. Vui lòng thử lại sau.',
        code: 'INTERNAL_ERROR',
      },
      {},
      request.method === 'HEAD',
    )
  })
})

server.headersTimeout = 10_000
server.requestTimeout = 40_000
server.keepAliveTimeout = 5_000

server.on('clientError', (_error, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n')
})

server.listen(PORT, HOST, () => {
  console.info(
    JSON.stringify({
      distDirectory: DIST_DIRECTORY,
      event: 'server_started',
      host: HOST,
      port: PORT,
    }),
  )
})

let shuttingDown = false

function shutdown(signal) {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  console.info(JSON.stringify({ event: 'server_stopping', signal }))

  const forceExit = setTimeout(() => {
    console.error('server_shutdown_timeout')
    process.exit(1)
  }, 10_000)

  server.close((error) => {
    clearTimeout(forceExit)

    if (error) {
      console.error('server_shutdown_error', error)
      process.exit(1)
    }

    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
