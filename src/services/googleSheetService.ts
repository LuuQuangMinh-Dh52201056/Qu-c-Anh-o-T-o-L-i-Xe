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

type ViteImportMeta = ImportMeta & {
  env?: {
    VITE_GOOGLE_SCRIPT_URL?: string
  }
}

function getGoogleScriptUrl() {
  const meta =
    import.meta as ViteImportMeta

  return (
    meta.env?.VITE_GOOGLE_SCRIPT_URL ??
    ''
  )
}

export async function submitRegistration(
  data: RegistrationPayload
) {
  const url =
    getGoogleScriptUrl()

  if (!url) {
    throw new Error(
      'Chưa cấu hình Google Sheet. Hãy tạo file .env và thêm VITE_GOOGLE_SCRIPT_URL.'
    )
  }

  const body =
    new URLSearchParams()

  body.append(
    'fullName',
    data.fullName
  )

  body.append(
    'phone',
    data.phone
  )

  body.append(
    'birthYear',
    data.birthYear
  )

  body.append(
    'course',
    data.course
  )

  body.append(
    'preferredTime',
    data.preferredTime
  )

  body.append(
    'area',
    data.area
  )

  body.append(
    'contactMethod',
    data.contactMethod
  )

  body.append(
    'note',
    data.note
  )

  body.append(
    'source',
    'Website Quốc Anh'
  )

  body.append(
    'createdAt',
    new Date().toISOString()
  )

  const response =
    await fetch(
      url,
      {
        method: 'POST',
        body,
      }
    )

  if (!response.ok) {
    throw new Error(
      'Không thể kết nối hệ thống đăng ký.'
    )
  }

  const result =
    await response.json()

  if (!result.success) {
    throw new Error(
      result.message ||
        'Không thể gửi đăng ký.'
    )
  }

  return result
}
