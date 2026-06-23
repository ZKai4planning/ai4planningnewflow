// // ─── Auth flow types ──────────────────────────────────────────────

// export type AuthIntent = 'login' | 'signup'

// export interface SendOtpRequest {
//   email:  string
//   intent: AuthIntent
// }

// export interface SendOtpResponse {
//   success:   boolean
//   expiresIn: number   // seconds, e.g. 600
//   maskedEmail: string // e.g. "j***@example.com"
// }

// export interface VerifyOtpRequest {
//   email: string
//   code:  string       // 6-digit string
// }

// export interface VerifyOtpResponse {
//   success:     boolean
//   accessToken: string
//   user: {
//     id:        string
//     name:      string
//     email:     string
//     role:      'consumer' | 'b2b' | 'consultant' | 'admin'
//     createdAt: string
//   }
// }

// export interface ForgotPasswordRequest {
//   email: string
// }

// export interface ForgotPasswordResponse {
//   success:     boolean
//   maskedEmail: string
// }

// export interface ResetPasswordRequest {
//   email:    string
//   code:     string
//   password: string
// }

// // Form field states
// export type FieldState = 'idle' | 'valid' | 'error'

// export interface FormField<T = string> {
//   value:   T
//   state:   FieldState
//   message: string
// }


// ─── Auth flow types ──────────────────────────────────────────────

export type AuthIntent = 'login' | 'signup'

export interface SendOtpRequest {
  email:  string
  intent: AuthIntent
}

export interface SendOtpResponse {
  success:     boolean
  expiresIn:   number
  maskedEmail: string
}

export interface VerifyOtpRequest {
  email: string
  code:  string
}

export interface VerifyOtpResponse {
  success:      boolean
  accessToken:  string
  mfaEnabled:   boolean
  user: {
    id:        string
    name:      string
    email:     string
    role:      'consumer' | 'b2b' | 'consultant' | 'admin'
    createdAt: string
  }
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  success:     boolean
  maskedEmail: string
}

export interface ResetPasswordRequest {
  email:    string
  code:     string
  password: string
}

export interface MfaSetupResponse {
  secret:        string
  otpAuthUrl:    string
  qrCodeDataUrl: string | null
}

export interface MfaVerifyRequest {
  email:  string
  code:   string
  enable: boolean
}

export interface MfaVerifyResponse {
  success:     boolean
  mfaEnabled:  boolean
  backupCodes: string[]
}

export interface AuthSession {
  accessToken: string
  email:       string
  name:        string
  role:        string
  mfaEnabled:  boolean
}

export type FieldState = 'idle' | 'valid' | 'error'