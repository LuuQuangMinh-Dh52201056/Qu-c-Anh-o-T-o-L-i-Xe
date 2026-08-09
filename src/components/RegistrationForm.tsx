import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react'

import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Headphones,
  LoaderCircle,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'

import { courses } from '../data/courses'

import {
  createLeadId,
  submitRegistration,
  type RegistrationPayload,
} from '../services/googleSheetService'

type Props = {
  defaultCourse?: string
  compact?: boolean
}

type FieldName =
  | keyof RegistrationPayload
  | 'consent'

type FieldErrors = Partial<
  Record<FieldName, string>
>

const initialState: RegistrationPayload = {
  fullName: '',
  phone: '',
  birthYear: '',
  course: '',
  preferredTime: '',
  area: '',
  contactMethod: 'Điện thoại',
  note: '',
}

const courseCodes = new Set(
  courses.map((course) => course.code)
)

function normalizePhone(value: string) {
  return value.replace(/[.\s-]/g, '')
}

export default function RegistrationForm({
  defaultCourse = '',
  compact = false,
}: Props) {
  const formId = useId()

  const safeDefaultCourse =
    courseCodes.has(
      defaultCourse as (typeof courses)[number]['code']
    )
      ? defaultCourse
      : ''

  const [form, setForm] =
    useState<RegistrationPayload>({
      ...initialState,
      course: safeDefaultCourse,
    })

  const [consent, setConsent] =
    useState(false)

  const [errors, setErrors] =
    useState<FieldErrors>({})

  const [status, setStatus] =
    useState<
      | 'idle'
      | 'sending'
      | 'success'
      | 'error'
    >('idle')

  const [message, setMessage] =
    useState('')

  const [companyWebsite, setCompanyWebsite] =
    useState('')

  const pendingLeadId = useRef('')

  useEffect(() => {
    setForm((previous) => ({
      ...previous,
      course: safeDefaultCourse,
    }))
  }, [safeDefaultCourse])

  const changeField = (
    field: keyof RegistrationPayload,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }))

    if (status !== 'sending') {
      setStatus('idle')
      setMessage('')
    }
  }

  const validate = () => {
    const nextErrors: FieldErrors = {}
    const normalizedPhone = normalizePhone(
      form.phone
    )

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName =
        'Vui lòng nhập họ và tên đầy đủ.'
    }

    if (!normalizedPhone) {
      nextErrors.phone =
        'Vui lòng nhập số điện thoại.'
    } else if (
      !/^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/.test(
        normalizedPhone
      )
    ) {
      nextErrors.phone =
        'Số điện thoại chưa đúng định dạng.'
    }

    if (form.birthYear) {
      const birthYear = Number(
        form.birthYear
      )

      if (
        !/^\d{4}$/.test(form.birthYear) ||
        birthYear < 1900 ||
        birthYear > new Date().getFullYear()
      ) {
        nextErrors.birthYear =
          'Vui lòng nhập năm sinh hợp lệ.'
      }
    }

    if (!courseCodes.has(
      form.course as (typeof courses)[number]['code']
    )) {
      nextErrors.course =
        'Vui lòng chọn khóa học quan tâm.'
    }

    if (!consent) {
      nextErrors.consent =
        'Bạn cần đồng ý để Quốc Anh liên hệ tư vấn.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    // Trường bẫy bot: người dùng thật không nhìn thấy và không điền trường này.
    if (companyWebsite.trim()) {
      setStatus('success')
      setMessage(
        'Đăng ký của bạn đã được tiếp nhận.'
      )
      return
    }

    if (!validate()) {
      setStatus('error')
      setMessage(
        'Vui lòng kiểm tra lại các thông tin được đánh dấu.'
      )
      return
    }

    setStatus('sending')
    setMessage('')

    const payload: RegistrationPayload = {
      ...form,
      fullName: form.fullName
        .trim()
        .replace(/\s+/g, ' '),
      phone: normalizePhone(form.phone),
      birthYear: form.birthYear.trim(),
      area: form.area.trim(),
      note: form.note.trim(),
    }

    try {
      if (!pendingLeadId.current) {
        pendingLeadId.current = createLeadId()
      }

      const result = await submitRegistration(
        payload,
        pendingLeadId.current
      )

      const shortLeadId = result.leadId
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(-8)
        .toUpperCase()

      setStatus('success')
      setMessage(
        `Đăng ký thành công! Mã tiếp nhận ${shortLeadId}. Quốc Anh sẽ sớm liên hệ tư vấn cho bạn.`
      )

      pendingLeadId.current = ''

      setForm({
        ...initialState,
        course: safeDefaultCourse,
      })
      setConsent(false)
      setCompanyWebsite('')
      setErrors({})
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Không thể gửi đăng ký. Vui lòng thử lại hoặc gọi hotline.'
      )
    }
  }

  const fieldClass = (
    field: FieldName,
    full = false
  ) => [
    'lead-form__field',
    full ? 'lead-form__field--full' : '',
    errors[field]
      ? 'lead-form__field--error'
      : '',
  ].filter(Boolean).join(' ')

  return (
    <form
      className={`lead-form ${
        compact ? 'lead-form--compact' : ''
      }`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="lead-form__accent" />

      <label className="lead-form__honeypot" aria-hidden="true">
        Không điền trường này
        <input
          name="companyWebsite"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <header className="lead-form__header">
        <div className="lead-form__eyebrow">
          <Sparkles size={15} />
          Đăng ký tư vấn miễn phí
        </div>

        <h3>
          Bắt đầu hành trình
          <span> vững tay lái</span>
        </h3>

        <p>
          Điền thông tin để được tư vấn hạng bằng,
          lịch học và lộ trình phù hợp với bạn.
        </p>

        <div className="lead-form__trust">
          <span>
            <ShieldCheck size={16} />
            Bảo mật thông tin
          </span>

          <span>
            <Headphones size={16} />
            Hỗ trợ tận tâm
          </span>
        </div>
      </header>

      <div className="lead-form__body">
        <section
          className="lead-form__section"
          aria-labelledby={`${formId}-personal-title`}
        >
          <div className="lead-form__section-title">
            <span>01</span>
            <div>
              <h4 id={`${formId}-personal-title`}>
                Thông tin của bạn
              </h4>
              <p>
                Các trường có dấu * là bắt buộc.
              </p>
            </div>
          </div>

          <div className="lead-form__grid">
            <label className={fieldClass('fullName')}>
              <span className="lead-form__label">
                Họ và tên <strong>*</strong>
              </span>

              <span className="lead-form__control">
                <UserRound size={18} />
                <input
                  id={`${formId}-full-name`}
                  value={form.fullName}
                  onChange={(event) =>
                    changeField(
                      'fullName',
                      event.target.value
                    )
                  }
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  autoComplete="name"
                  maxLength={80}
                  required
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName
                      ? `${formId}-full-name-error`
                      : undefined
                  }
                />
              </span>

              {errors.fullName && (
                <small id={`${formId}-full-name-error`}>
                  {errors.fullName}
                </small>
              )}
            </label>

            <label className={fieldClass('phone')}>
              <span className="lead-form__label">
                Số điện thoại <strong>*</strong>
              </span>

              <span className="lead-form__control">
                <Phone size={18} />
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) =>
                    changeField(
                      'phone',
                      event.target.value
                    )
                  }
                  placeholder="Ví dụ: 0879 227 614"
                  autoComplete="tel"
                  maxLength={16}
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone
                      ? `${formId}-phone-error`
                      : undefined
                  }
                />
              </span>

              {errors.phone && (
                <small id={`${formId}-phone-error`}>
                  {errors.phone}
                </small>
              )}
            </label>

            {!compact && (
              <label className={fieldClass('birthYear')}>
                <span className="lead-form__label">
                  Năm sinh
                </span>

                <span className="lead-form__control">
                  <CalendarDays size={18} />
                  <input
                    id={`${formId}-birth-year`}
                    type="text"
                    inputMode="numeric"
                    value={form.birthYear}
                    onChange={(event) =>
                      changeField(
                        'birthYear',
                        event.target.value.replace(/\D/g, '').slice(0, 4)
                      )
                    }
                    placeholder="Ví dụ: 2000"
                    autoComplete="bday-year"
                    aria-invalid={Boolean(errors.birthYear)}
                    aria-describedby={
                      errors.birthYear
                        ? `${formId}-birth-year-error`
                        : undefined
                    }
                  />
                </span>

                {errors.birthYear && (
                  <small id={`${formId}-birth-year-error`}>
                    {errors.birthYear}
                  </small>
                )}
              </label>
            )}

            <label className={fieldClass('area', compact)}>
              <span className="lead-form__label">
                Khu vực sinh sống
              </span>

              <span className="lead-form__control">
                <MapPin size={18} />
                <input
                  id={`${formId}-area`}
                  value={form.area}
                  onChange={(event) =>
                    changeField(
                      'area',
                      event.target.value
                    )
                  }
                  placeholder="Quận/Huyện, Tỉnh/TP"
                  autoComplete="address-level2"
                  maxLength={100}
                />
              </span>
            </label>
          </div>
        </section>

        <section
          className="lead-form__section"
          aria-labelledby={`${formId}-course-title`}
        >
          <div className="lead-form__section-title">
            <span>02</span>
            <div>
              <h4 id={`${formId}-course-title`}>
                Nhu cầu học lái xe
              </h4>
              <p>
                Chọn thông tin gần nhất với nhu cầu của bạn.
              </p>
            </div>
          </div>

          <div className="lead-form__grid">
            <label className={fieldClass('course')}>
              <span className="lead-form__label">
                Khóa học quan tâm <strong>*</strong>
              </span>

              <span className="lead-form__control lead-form__control--select">
                <CarFront size={18} />
                <select
                  id={`${formId}-course`}
                  value={form.course}
                  onChange={(event) =>
                    changeField(
                      'course',
                      event.target.value
                    )
                  }
                  required
                  aria-invalid={Boolean(errors.course)}
                  aria-describedby={
                    errors.course
                      ? `${formId}-course-error`
                      : undefined
                  }
                >
                  <option value="">
                    Chọn hạng bằng phù hợp
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course.code}
                      value={course.code}
                    >
                      {course.title} — {course.subtitle}
                    </option>
                  ))}
                </select>
              </span>

              {errors.course && (
                <small id={`${formId}-course-error`}>
                  {errors.course}
                </small>
              )}
            </label>

            <label className={fieldClass('preferredTime')}>
              <span className="lead-form__label">
                Thời gian thuận tiện
              </span>

              <span className="lead-form__control lead-form__control--select">
                <Clock3 size={18} />
                <select
                  id={`${formId}-preferred-time`}
                  value={form.preferredTime}
                  onChange={(event) =>
                    changeField(
                      'preferredTime',
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Chọn khung thời gian
                  </option>
                  <option value="Buổi sáng">
                    Buổi sáng
                  </option>
                  <option value="Buổi chiều">
                    Buổi chiều
                  </option>
                  <option value="Buổi tối">
                    Buổi tối
                  </option>
                  <option value="Cuối tuần">
                    Cuối tuần
                  </option>
                  <option value="Linh động">
                    Linh động
                  </option>
                </select>
              </span>
            </label>

            <fieldset className="lead-form__field lead-form__field--full lead-form__contact-method">
              <legend className="lead-form__label">
                Bạn muốn được liên hệ qua
              </legend>

              <div className="lead-form__choices">
                <label>
                  <input
                    type="radio"
                    name={`${formId}-contact-method`}
                    value="Điện thoại"
                    checked={form.contactMethod === 'Điện thoại'}
                    onChange={(event) =>
                      changeField(
                        'contactMethod',
                        event.target.value
                      )
                    }
                  />
                  <span>
                    <Phone size={17} />
                    Điện thoại
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name={`${formId}-contact-method`}
                    value="Zalo"
                    checked={form.contactMethod === 'Zalo'}
                    onChange={(event) =>
                      changeField(
                        'contactMethod',
                        event.target.value
                      )
                    }
                  />
                  <span>
                    <MessageCircle size={17} />
                    Zalo
                  </span>
                </label>
              </div>
            </fieldset>

            <label className={fieldClass('note', true)}>
              <span className="lead-form__label lead-form__label--between">
                <span>Ghi chú thêm</span>
                <small>{form.note.length}/500</small>
              </span>

              <span className="lead-form__control lead-form__control--textarea">
                <MessageSquareText size={18} />
                <textarea
                  id={`${formId}-note`}
                  rows={compact ? 3 : 4}
                  value={form.note}
                  onChange={(event) =>
                    changeField(
                      'note',
                      event.target.value
                    )
                  }
                  placeholder="Bạn cần tư vấn thêm về lịch học, học phí hoặc hồ sơ?"
                  maxLength={500}
                />
              </span>
            </label>
          </div>
        </section>

        <div className={fieldClass('consent', true)}>
          <label className="lead-form__consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked)
                setErrors((previous) => ({
                  ...previous,
                  consent: undefined,
                }))

                if (status !== 'sending') {
                  setStatus('idle')
                  setMessage('')
                }
              }}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent
                  ? `${formId}-consent-error`
                  : undefined
              }
            />

            <span className="lead-form__checkmark">
              <CheckCircle2 size={16} />
            </span>

            <span>
              Tôi đồng ý để Quốc Anh sử dụng thông tin này
              nhằm liên hệ và tư vấn khóa học phù hợp.
            </span>
          </label>

          {errors.consent && (
            <small id={`${formId}-consent-error`}>
              {errors.consent}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="lead-form__submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle
                className="lead-form__spinner"
                size={20}
              />
              Đang lưu đăng ký an toàn...
            </>
          ) : (
            <>
              Gửi đăng ký tư vấn
              <Send size={19} />
            </>
          )}
        </button>

        <p className="lead-form__privacy">
          <ShieldCheck size={15} />
          Thông tin của bạn được bảo mật và chỉ dùng
          cho mục đích tư vấn khóa học.
        </p>

        {message && (
          <div
            className={`lead-form__message lead-form__message--${status}`}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {status === 'success' && (
              <CheckCircle2 size={20} />
            )}

            {message}
          </div>
        )}
      </div>
    </form>
  )
}
