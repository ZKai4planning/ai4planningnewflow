/**
 * api.ts
 * ───────
 * Typed fetch wrapper for every auth endpoint.
 * All functions are async and return { data, error }.
 *
 * Base URL reads from NEXT_PUBLIC_API_URL (defaults to /api for same-origin).
 * next.config.js proxies /api/* to the backend server.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api'

// ── Generic fetch helper ──────────────────────────────────────────
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        data:  null,
        error: json?.message ?? json?.error ?? `Request failed (${res.status})`,
      }
    }

    return { data: json as T, error: null }
  } catch (err) {
    return {
      data:  null,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

// ── Auth endpoints ────────────────────────────────────────────────

import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
} from '@/types/auth'

/**
 * POST /api/auth/send-otp
 * Sends a 6-digit OTP to the given email.
 * Works for both login and signup flows.
 */
export function sendOtp(body: SendOtpRequest) {
  return request<SendOtpResponse>('/auth/send-otp', {
    method: 'POST',
    body:   JSON.stringify(body),
  })
}

/**
 * POST /api/auth/verify-otp
 * Verifies the 6-digit code and returns a JWT + user object.
 */
export function verifyOtp(body: VerifyOtpRequest) {
  return request<VerifyOtpResponse>('/auth/verify-otp', {
    method: 'POST',
    body:   JSON.stringify(body),
  })
}

/**
 * POST /api/auth/forgot-password
 * Sends a password-reset OTP to the email.
 */
export function forgotPassword(body: ForgotPasswordRequest) {
  return request<ForgotPasswordResponse>('/auth/forgot-password', {
    method: 'POST',
    body:   JSON.stringify(body),
  })
}

/**
 * POST /api/auth/reset-password
 * Resets password using the OTP code received via email.
 */
export function resetPassword(body: ResetPasswordRequest) {
  return request<{ success: boolean }>('/auth/reset-password', {
    method: 'POST',
    body:   JSON.stringify(body),
  })
}

/**
 * POST /api/auth/logout
 * Invalidates the session server-side.
 */
export function logout() {
  return request<{ success: boolean }>('/auth/logout', { method: 'POST' })
}
