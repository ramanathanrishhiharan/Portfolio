'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckIcon, MailIcon, Loader2Icon } from 'lucide-react'
import { isValidPhoneNumber } from 'libphonenumber-js'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type FormState = {
  firstName: string
  lastName: string
  email: string
  mobile: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LeadForm() {
  const [values, setValues] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function validateField(field: keyof FormState, value: string): string | undefined {
    if (!value.trim()) return 'This field is required'
    if (field === 'email' && !EMAIL_REGEX.test(value)) return 'Enter a valid email address'
    if (field === 'mobile' && !isValidPhoneNumber(value)) return 'Enter a valid mobile number'
    return undefined
  }

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleBlur(field: keyof FormState) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors: FormErrors = {}
    ;(Object.keys(values) as (keyof FormState)[]).forEach((field) => {
      const error = validateField(field, values[field])
      if (error) newErrors[field] = error
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-350 px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          {/* Left column — image, fills full column height */}
          <div className="relative min-h-105 w-full overflow-hidden rounded-2xl shadow-sm lg:min-h-0">
            <Image
              src="/HR2.png"
              alt="Portrait of a smiling professional consultant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right column — benefits above the form */}
          <div className="flex flex-col justify-center">
            <ul className="mb-6 list-disc space-y-3 pl-5 marker:text-(--color-accent)">
              <li className="text-xl font-medium leading-snug text-foreground sm:text-2xl">
                Delivered as a PDF, straight to your inbox
              </li>
              <li className="text-xl font-medium leading-snug text-foreground sm:text-2xl">
                Get the{' '}
                <span className="inline-block rounded-tr-2xl rounded-bl-2xl rounded-tl-none rounded-br-none bg-(--color-accent) px-[0.25em] pb-[0.08em] leading-none text-white">
                  system
                </span>{' '}
                + checklist, free
              </li>
            </ul>

            {status === 'success' ? (
              <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 text-center">
                <p className="text-lg font-semibold text-foreground">
                  🎉 Check your inbox — your guide is on its way!
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <div className="mb-6 flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-(--color-muted)" />
                  <p className="text-base leading-relaxed text-(--color-muted)">
                    Enter your details below — the guide arrives in your inbox in under a minute.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="firstName"
                      label="First name"
                      autoComplete="given-name"
                      value={values.firstName}
                      error={errors.firstName}
                      onChange={(v) => handleChange('firstName', v)}
                      onBlur={() => handleBlur('firstName')}
                    />
                    <Field
                      id="lastName"
                      label="Last name"
                      autoComplete="family-name"
                      value={values.lastName}
                      error={errors.lastName}
                      onChange={(v) => handleChange('lastName', v)}
                      onBlur={() => handleBlur('lastName')}
                    />
                  </div>

                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => handleChange('email', v)}
                    onBlur={() => handleBlur('email')}
                  />

                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-1.5 block text-base font-medium text-foreground"
                    >
                      Mobile number
                    </label>
                    <PhoneInput
                      id="mobile"
                      international
                      defaultCountry="LK"
                      value={values.mobile}
                      onChange={(v) => handleChange('mobile', v || '')}
                      onBlur={() => handleBlur('mobile')}
                      className={`lead-phone-input ${errors.mobile ? 'lead-phone-input--error' : ''}`}
                    />
                    {errors.mobile && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.mobile}</p>
                    )}
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-(--color-border) bg-white transition-colors checked:border-(--color-accent) checked:bg-(--color-accent) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-1"
                      />
                      <CheckIcon
                        className="pointer-events-none absolute h-3.5 w-3.5 text-foreground opacity-0 peer-checked:opacity-100"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-(--color-muted)">
                      By providing your information and clicking &quot;Download Now,&quot; you agree to
                      be contacted by [Your Business Name] about offers and programs, including
                      by email, SMS, and phone. Consent is not a condition of purchase. Reply
                      STOP at any time to opt out, or HELP for assistance. Message and data
                      rates may apply; frequency varies. By submitting, you agree to our{' '}
                      <a href="#" className="underline hover:text-foreground">Privacy Policy</a>{' '}
                      and{' '}
                      <a href="#" className="underline hover:text-foreground">Terms of Service</a>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consent || status === 'loading'}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'loading' && <Loader2Icon className="h-4 w-4 animate-spin" />}
                    {status === 'loading' ? 'Sending...' : 'Download Now'}
                  </button>

                  {status === 'error' && (
                    <p role="alert" className="text-sm text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .lead-phone-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          background: white;
          padding: 0.5rem 1rem;
        }
        .lead-phone-input:focus-within {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        .lead-phone-input--error {
          border-color: #f87171;
        }
        .lead-phone-input--error:focus-within {
          border-color: #f87171;
          box-shadow: 0 0 0 2px #fca5a5;
        }
        .lead-phone-input .PhoneInputInput {
          border: none;
          outline: none;
          font-size: 16px;
          color: var(--color-text);
          flex: 1;
        }
        .lead-phone-input .PhoneInputCountry {
          margin-right: 0.25rem;
        }
      `}</style>
    </section>
  )
}

type FieldProps = {
  id: string
  label: string
  type?: string
  autoComplete?: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

function Field({ id, label, type = 'text', autoComplete, value, error, onChange, onBlur }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground placeholder:text-(--color-muted) focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
            : 'border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}