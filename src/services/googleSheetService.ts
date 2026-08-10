export type RegistrationPayload = {
  fullName: string
  phone: string
  birthYear: string
  course: string
  preferredTime: string
  area: string
  contactMethod: string
  note: string
}

export type RegistrationResult = {
  success: true
  message: string
  leadId: string
  duplicate: boolean
  updated: boolean
}

type ViteImportMeta = ImportMeta & {
  env?: {
    VITE_REGISTRATION_API_URL?: string
  }
}

// Render gói miễn phí có thể cần hơn 50 giây để khởi động lại sau khi ngủ.
const REQUEST_TIMEOUT_MS = 90_000
const ATTRIBUTION_STORAGE_KEY = 'quoc-anh-attribution'

type AttributionData = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  ttclid: string
  fbclid: string
  gclid: string
  referrer: string
}

const emptyAttribution: AttributionData = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
  ttclid: '',
  fbclid: '',
  gclid: '',
  referrer: '',
}

function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return emptyAttribution
  }

  const params = new URLSearchParams(window.location.search)
  const current: AttributionData = {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    utmContent: params.get('utm_content') || '',
    ttclid: params.get('ttclid') || '',
    fbclid: params.get('fbclid') || '',
    gclid: params.get('gclid') || '',
    referrer: document.referrer || '',
  }
  const hasCurrentCampaign = Object.entries(current).some(
    ([key, value]) => key !== 'referrer' && Boolean(value)
  )

  try {
    const saved = window.sessionStorage.getItem(
      ATTRIBUTION_STORAGE_KEY
    )
    const stored = saved
      ? ({
          ...emptyAttribution,
          ...JSON.parse(saved),
        } as AttributionData)
      : null

    if (stored && !hasCurrentCampaign) {
      return stored
    }

    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(current)
    )
  } catch {
    // Một số chế độ riêng tư chặn sessionStorage; form vẫn gửi bình thường.
  }

  return current
}

// Ghi nhận nguồn ngay khi ứng dụng nạp, trước khi người dùng chuyển trang SPA.
captureAttribution()

function getRegistrationApiUrl() {
  const meta = import.meta as ViteImportMeta

  return (
    meta.env?.VITE_REGISTRATION_API_URL?.trim() ||
    '/api/registrations'
  )
}

export function createLeadId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `qa-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

function getTrackingData() {
  if (typeof window === 'undefined') {
    return {
      source: 'Website Quốc Anh',
      pageUrl: '',
      ...emptyAttribution,
    }
  }

  const attribution = captureAttribution()
  const pageName =
    window.location.pathname === '/dang-ky'
      ? 'Trang đăng ký'
      : window.location.pathname === '/'
        ? 'Trang chủ'
        : window.location.pathname

  return {
    source: `Website Quốc Anh - ${pageName}`,
    pageUrl: window.location.href,
    ...attribution,
  }
}

async function readJson(response: Response) {
  try {
    return (await response.json()) as Partial<RegistrationResult> & {
      error?: string
    }
  } catch {
    return {}
  }
}

export async function submitRegistration(
  data: RegistrationPayload,
  leadId = createLeadId()
): Promise<RegistrationResult> {
  const controller = new AbortController()
  const timeout = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS
  )

  try {
    const response = await fetch(getRegistrationApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...data,
        leadId,
        ...getTrackingData(),
      }),
      signal: controller.signal,
    })

    const result = await readJson(response)

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          result.error ||
          'Hệ thống chưa thể tiếp nhận đăng ký. Vui lòng thử lại hoặc gọi hotline.'
      )
    }

    return {
      success: true,
      message:
        result.message ||
        'Đăng ký của bạn đã được ghi nhận.',
      leadId: result.leadId || leadId,
      duplicate: result.duplicate === true,
      updated: result.updated === true,
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(
        'Hệ thống phản hồi chậm. Vui lòng bấm gửi lại; đăng ký trùng sẽ tự động được loại bỏ.'
      )
    }

    if (error instanceof TypeError) {
      throw new Error(
        'Không thể kết nối hệ thống đăng ký. Vui lòng kiểm tra mạng hoặc gọi hotline.'
      )
    }

    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}
