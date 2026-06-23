'use client'
export const dynamic = 'force-dynamic'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { AuthShell }        from '@/components/auth/AuthShell'
import { AuthInput }        from '@/components/auth/AuthInput'
import { AuthDivider }      from '@/components/auth/AuthDivider'
import { PasswordStrength } from '@/components/auth/PasswordStrength'
import { Button }           from '@/components/ui/Button'
import { sendOtp }          from '@/lib/api'
import { cn }               from '@/lib/cn'
import type { FieldState }  from '@/types/auth'

/**
 * /signup
 * ────────
 * Collects: full name, email, password (optional — for accounts that need it)
 * Then sends OTP via POST /api/auth/send-otp { intent: 'signup' }
 * Redirects to /verify-email?email=...&intent=signup
 *
 * If your backend does passwordless-only, remove the password field
 * and the PasswordStrength component.
 */

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }
function isValidName(v: string)  { return v.trim().length >= 2 }
function isValidPassword(v: string) { return v.length >= 8 }

export default function SignupPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  // Preserve goal if user was mid-flow before hitting auth
  const returnTo = searchParams.get('returnTo') ?? '/dashboard'
  const goalId   = searchParams.get('goalId')   ?? ''

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()

  // Derived field states
  const nameState:     FieldState = errors.name     ? 'error' : name     && isValidName(name)         ? 'valid' : 'idle'
  const emailState:    FieldState = errors.email    ? 'error' : email    && isValidEmail(email)        ? 'valid' : 'idle'
  const passwordState: FieldState = errors.password ? 'error' : password && isValidPassword(password) ? 'valid' : 'idle'

  function validate() {
    const e: Record<string, string> = {}
    if (!isValidName(name))         e.name     = 'Please enter your full name.'
    if (!isValidEmail(email))       e.email    = 'Please enter a valid email address.'
    if (!isValidPassword(password)) e.password = 'Password must be at least 8 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      const { data, error: apiError } = await sendOtp({
        email:  email.trim(),
        intent: 'signup',
      })

      if (apiError || !data?.success) {
        setErrors({ email: apiError ?? 'Something went wrong. Please try again.' })
        return
      }

      // Carry name, goalId, returnTo through to verify page
      const params = new URLSearchParams({
        email:    email.trim(),
        name:     name.trim(),
        intent:   'signup',
        returnTo,
        ...(goalId ? { goalId } : {}),
      })
      router.push(`/verify-email?${params.toString()}`)
    })
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free to start. Your planning goal is saved."
      footerText="Already have an account?"
      footerLink={{ label: 'Log in', href: `/login${returnTo !== '/dashboard' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}` }}
      maxWidth="md"
    >
      {/* Goal preserved banner */}
      {goalId && (
        <div className="mb-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] bg-[rgba(0,232,122,0.07)] border border-[rgba(0,232,122,0.2)]">
          <span className="text-[#00E87A]" aria-hidden="true">✓</span>
          <p className="text-[12px] text-[#A8B8D8]">
            Your planning goal is saved — we'll continue your check after sign-up.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* Name */}
        <AuthInput
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
          fieldState={nameState}
          message={errors.name}
          autoFocus
          disabled={isPending}
        />

        {/* Email */}
        <AuthInput
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
          fieldState={emailState}
          message={errors.email}
          disabled={isPending}
        />

        {/* Password */}
        {/* <div>
          <AuthInput
            label="Password"
            type={showPass ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
            fieldState={passwordState}
            message={errors.password}
            disabled={isPending}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="text-[#5A6A8A] hover:text-[#A8B8D8] transition-colors p-1"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          <PasswordStrength password={password} />
        </div> */}

        {/* Submit */}
        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? 'Sending code…' : 'Create account →'}
          </Button>
        </div>

        {/* Terms */}
        <p className="text-center text-[11px] text-[#5A6A8A] leading-relaxed px-2">
          By signing up you agree to our{' '}
          <Link href="/terms" className="text-[#A8B8D8] hover:text-[#E8F0FF] underline underline-offset-2">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-[#A8B8D8] hover:text-[#E8F0FF] underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  )
}

// ── Eye icons ─────────────────────────────────────────────────────
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
