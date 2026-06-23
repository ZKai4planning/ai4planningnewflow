import type { ActorId } from '@/types'
import { hasWholeWord, escapeRegExp } from '@/lib/textMatch'

/**
 * goalActorMap.ts
 * ────────────────
 * Single source of truth for "if someone's goal is X, they're probably
 * actor Y" — used as a fallback suggestion ONLY when no actor was
 * explicitly typed/detected in the query (see detectActor in actors.ts).
 *
 * This file is intentionally separate and dead simple to edit: add or
 * change a row here, nothing else needs to change.
 *
 * IMPORTANT: this is a *suggestion*, never auto-applied. It always
 * goes through the same ActorConfirmModal popup as text-detected
 * actors before selectedActor is actually set.
 */
export const GOAL_ACTOR_MAP: Record<string, ActorId> = {
  'build extension':  'homeowner',
  'extension':         'homeowner',
  'loft conversion':   'homeowner',
  'home renovation':   'homeowner',

  'development':       'landlord',
  'rental property':   'landlord',
  'buy to let':        'landlord',

  'construction':      'builder',
  'new build':         'builder',
  'house building':    'builder',

  'planning advice':   'consultant',
  'planning application': 'consultant',

  'design':            'architect',
  'architectural drawings': 'architect',

  'site acquisition':  'business',
  'commercial development': 'business',
}

/**
 * Returns the actor id whose goal-keyword appears (whole word) in the
 * query, preferring the longest matching keyword if multiple match
 * (so "build extension" beats "extension" if both were ever mapped
 * to different actors).
 */
export function inferActorFromGoal(query: string): ActorId | null {
  const lower = query.toLowerCase().trim()
  if (!lower) return null

  let bestMatch: { keyword: string; actorId: ActorId } | null = null

  for (const [keyword, actorId] of Object.entries(GOAL_ACTOR_MAP)) {
    if (hasWholeWord(lower, keyword)) {
      if (!bestMatch || keyword.length > bestMatch.keyword.length) {
        bestMatch = { keyword, actorId }
      }
    }
  }

  return bestMatch ? bestMatch.actorId : null
}

// Re-exported for any callers that previously imported escapeRegExp
// from this file directly (kept for backwards compatibility).
export { escapeRegExp }