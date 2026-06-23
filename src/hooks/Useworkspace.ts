'use client'

import { useState, useEffect } from 'react'
import { getWorkspaceConfig } from '@/types/workspace'
import type { WorkspaceConfig } from '@/types/workspace'
import type { ActorId } from '@/types'

interface SessionData {
  email:       string
  name:        string
  accessToken: string
  mfaEnabled:  boolean
  role:        string
  /**
   * actorId is set server-side at signup/login and returned inside the
   * session payload. The frontend treats it as an opaque routing key —
   * it never surfaces in any UI copy.
   */
  actorId?:    ActorId
}

interface UseWorkspaceResult {
  isLoading:  boolean
  session:    SessionData | null
  workspace:  WorkspaceConfig | null
  /** Convenience: first name only, for greetings */
  firstName:  string
}

/**
 * useWorkspace
 * ─────────────
 * Reads the auth session (set during verify-email / mfa-verify) and
 * resolves the WorkspaceConfig that drives dashboard rendering.
 *
 * IMPORTANT: in production, the actorId should come from the backend's
 * /api/auth/me or /api/workspace endpoint (server-authoritative), NOT
 * trusted purely from client storage. This hook is written so swapping
 * the data source is a one-line change — see the API swap comment below.
 */
export function useWorkspace(): UseWorkspaceResult {
  const [session,   setSession]   = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ── API swap point ──────────────────────────────────────────
    // Replace this block with:
    //   const { data } = await fetch('/api/workspace/me').then(r => r.json())
    //   setSession(data.session)
    // ─────────────────────────────────────────────────────────────
    try {
      const raw = sessionStorage.getItem('auth_session')
      if (raw) {
        const parsed = JSON.parse(raw) as SessionData
        setSession(parsed)
      }
    } catch {
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const workspace = session?.actorId
    ? getWorkspaceConfig(session.actorId)
    : null

  const firstName = session?.name?.split(' ')[0] ?? 'there'

  return { isLoading, session, workspace, firstName }
}