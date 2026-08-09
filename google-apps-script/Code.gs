export type RegistrationPayload = {
  fullName: string
  phone: string
  birthYear: string
  course: string
  preferredTime: string
  area: string
  note: string
}

export async function submitRegistration(
  data: RegistrationPayload
) {
  const url =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL

  if (!url) {
    throw new Error(
      'Chưa cấu hình VITE_GOOGLE_SCRIPT_URL trong file .env'
    )
  }

  const body =
    new URLSearchParams()

  Object.entries(data).forEach(
    ([key, value]) => {
      body.append(key, value)
    }
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
    await fetch(url, {
      method: 'POST',
      body,
    })

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