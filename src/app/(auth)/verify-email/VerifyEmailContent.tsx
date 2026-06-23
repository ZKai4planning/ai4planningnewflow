'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { AuthShell } from '@/components/auth/AuthShell'
import { OtpBoxes } from '@/components/auth/OtpBoxes'
import { Button } from '@/components/ui/Button'
import {
  verifyOtpMock as verifyOtp,
  sendOtpMock as sendOtp,
  DEMO_OTP,
} from '@/lib/mock'
import type { AuthIntent } from '@/types/auth'
import { cn } from '@/lib/cn'

export default function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email') ?? ''
  const intent = (searchParams.get('intent') ?? 'login') as AuthIntent
  const returnTo = searchParams.get('returnTo') ?? '/dashboard'

  const [error, setError] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [resent, setResent] = useState(false)

  function handleComplete(code: string) {
    if (isPending) return

    setError('')
    setHasError(false)

    startTransition(async () => {
      const { data, error: apiError } = await verifyOtp({
        email,
        code,
      })

      if (apiError || !data) {
        setError(apiError ?? 'Verification failed.')
        setHasError(true)
        return
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('demo_token', data.accessToken)
        localStorage.setItem('demo_user', JSON.stringify(data.user))
      }

      if (data.mfaEnabled) {
        const params = new URLSearchParams({
          email,
          returnTo,
        })

        router.push(`/mfa-verify?${params.toString()}`)
      } else {
        const params = new URLSearchParams({
          email,
          returnTo,
        })

        router.push(`/mfa-setup?${params.toString()}`)
      }
    })
  }

  async function handleResend() {
    setResent(false)

    await sendOtp({
      email,
      intent,
    })

    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }

  const maskedEmail = email.replace(
    /^(.)(.*)(@.+)$/,
    (_, a, _b, c) => `${a}***${c}`
  )

  return (
    <AuthShell
      eyebrow={intent === 'signup' ? 'Step 2 of 2' : undefined}
      title="Check your inbox"
      subtitle={
        <>
          We sent a 6-digit code to{' '}
          <span className="text-[#A8B8D8] font-medium">
            {maskedEmail}
          </span>
        </>
      }
    >
      <div className="space-y-6">
        <OtpBoxes
          onComplete={handleComplete}
          hasError={hasError}
          disabled={isPending}
        />

        {error && (
          <p
            className="text-center text-[13px] text-[#F87171]"
            role="alert"
          >
            {error}
          </p>
        )}

        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isPending}
          disabled={isPending}
        >
          {isPending ? 'Verifying…' : 'Verify code'}
        </Button>

        <p className="text-center text-[12px] text-[#5A6A8A]">
          Didn't receive it?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="text-[#00E87A] hover:text-[#00FF88] font-medium transition-colors"
          >
            Resend code
          </button>

          {resent && (
            <span className="ml-2 text-[#00E87A]">
              ✓ Sent!
            </span>
          )}
        </p>
      </div>

      <p
        className={cn(
          'mt-7 pt-5 border-t border-white/[0.06]',
          'text-[11px] text-[#5A6A8A] text-center'
        )}
      >
        🛠 Mock mode — use code{' '}
        <span className="text-[#00E87A] font-mono">
          {DEMO_OTP}
        </span>
      </p>
    </AuthShell>
  )
}