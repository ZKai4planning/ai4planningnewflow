// 'use client'

// import React, { useRef, useId } from 'react'
// import { cn } from '@/lib/cn'
// import type { SearchSuggestion } from '@/types'

// interface SearchBarProps {
//   value:         string
//   suggestion:    SearchSuggestion | null
//   isLoading:     boolean
//   onChange:      (value: string) => void
//   onSubmit:      () => void
//   placeholder?:  string
//   className?:    string
//   /** Rendered below the input as hint text */
//   hintDefault?:  string
// }

// /**
//  * SearchBar
//  * ──────────
//  * Controlled component — all state lives in the parent (useSearch hook).
//  * The component only handles presentation and event wiring.
//  *
//  * Accessibility:
//  *  - role="search" on the wrapper
//  *  - aria-live on the suggestion hint
//  *  - keyboard: Enter submits, Escape clears
//  */
// export function SearchBar({
//   value,
//   suggestion,
//   isLoading,
//   onChange,
//   onSubmit,
//   placeholder = 'e.g. I want to build a rear extension…',
//   className,
//   hintDefault = 'No planning knowledge needed · Free first result · Expert consultants available',
// }: SearchBarProps) {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const inputId  = useId()

//   const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') onSubmit()
//   }

//   return (
//     <div className={cn('w-full', className)} role="search">

//       {/* ── Search input row ──────────────────────────────────── */}
//       <div
//         className={cn(
//           'flex items-center rounded-[14px] overflow-hidden transition-all duration-200',
//           'bg-[#141C30] border border-white/16',
//           'focus-within:border-[#00E87A] focus-within:shadow-[0_0_0_3px_rgba(0,232,122,0.18)]',
//           'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]'
//         )}
//       >
//         {/* Search icon */}
//         <span className="pl-4 shrink-0 text-[#5A6A8A]" aria-hidden="true">
//           <SearchIcon />
//         </span>

//         {/* Input */}
//         <input
//           ref={inputRef}
//           id={inputId}
//           type="text"
//           value={value}
//           onChange={e => onChange(e.target.value)}
//           onKeyDown={handleKey}
//           placeholder={placeholder}
//           autoComplete="off"
//           spellCheck={false}
//           aria-label="Describe your planning goal"
//           className={cn(
//             'flex-1 min-w-0 px-3 py-3.5 bg-transparent',
//             'font-sans text-[15px] text-[#E8F0FF] placeholder:text-[#5A6A8A]',
//             'focus:outline-none'
//           )}
//         />

//         {/* Loading spinner */}
//         {isLoading && (
//           <span className="pr-3 shrink-0 text-[#5A6A8A] animate-spin" aria-hidden="true">
//             <SpinnerIcon />
//           </span>
//         )}

//         {/* Submit button */}
//         <button
//           type="button"
//           onClick={onSubmit}
//           aria-label="Check planning route"
//           className={cn(
//             'shrink-0 m-[6px] px-5 py-2.5 rounded-[10px]',
//             'bg-[#00E87A] text-[#050A12] font-semibold text-sm font-sans',
//             'transition-all duration-150',
//             'hover:bg-[#00FF88] hover:shadow-[0_0_16px_rgba(0,232,122,0.5)]',
//             'active:scale-[0.97]',
//             'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E87A]',
//             'focus-visible:ring-offset-2 focus-visible:ring-offset-[#141C30]'
//           )}
//         >
//           Check it →
//         </button>
//       </div>

//       {/* ── Hint / suggestion row ─────────────────────────────── */}
//       <p
//         aria-live="polite"
//         aria-atomic="true"
//         className="mt-2.5 text-xs text-center min-h-[18px] transition-all duration-200"
//       >
//         {suggestion ? (
//           <span className="text-[#00E87A]" style={{ textShadow: '0 0 12px rgba(0,232,122,0.4)' }}>
//             → {suggestion.label}
//             <span className="ml-2 text-[#5A6A8A]">
//               · Press Enter or click Check it
//             </span>
//           </span>
//         ) : (
//           <span className="text-[#5A6A8A]">{hintDefault}</span>
//         )}
//       </p>
//     </div>
//   )
// }

// // ── Icons ─────────────────────────────────────────────────────────
// function SearchIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="11" cy="11" r="8"/>
//       <path d="M21 21l-4.35-4.35"/>
//     </svg>
//   )
// }

// function SpinnerIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//       <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//     </svg>
//   )
// }

'use client'

import React, { useRef, useId } from 'react'
import { cn } from '@/lib/cn'
import type { SearchSuggestion, Actor } from '@/types'

interface SearchBarProps {
  id?: string
  value:         string
  suggestion:    SearchSuggestion | null
  isLoading:     boolean
  onChange:      (value: string) => void
  onSubmit:      () => void
  placeholder?:  string
  className?:    string
  hintDefault?:  string
  /** When set, renders a small removable chip inside the input (left side) */
  actorChip?:    Actor | null
  onRemoveActorChip?: () => void
  /** Called when the user clicks/taps the inline suggestion to accept it into the input */
  onAcceptSuggestion?: (suggestion: SearchSuggestion) => void
}

/**
 * SearchBar
 * ──────────
 * Controlled component — all state lives in the parent (useSearch hook).
 *
 * Optional actorChip renders as a pill inside the input itself,
 * e.g. [🔑 Landlord ✕]  I want to build an HMO...
 * This visually confirms "we know who you are" while they keep typing
 * their goal.
 */
export function SearchBar({
  id,
  value,
  suggestion,
  isLoading,
  onChange,
  onSubmit,
  placeholder = 'e.g. I want to build a rear extension…',
  className,
  hintDefault = 'No planning knowledge needed · Free first result · Expert consultants available',
  actorChip = null,
  onRemoveActorChip,
  onAcceptSuggestion,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId  = useId()

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
    // Tab accepts the inline suggestion, like a browser address bar
    if (e.key === 'Tab' && suggestion && onAcceptSuggestion) {
      e.preventDefault()
      onAcceptSuggestion(suggestion)
    }
  }

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Defensive: stop this click from bubbling up to any wrapping
    // <a>/<Link>/<form> in the parent tree that could trigger navigation.
    e.preventDefault()
    e.stopPropagation()
    onSubmit()
  }

  const handleSuggestionClick = () => {
    if (suggestion && onAcceptSuggestion) onAcceptSuggestion(suggestion)
  }

  return (
    <div className={cn('w-full', className)} role="search">

      {/* ── Search input row ──────────────────────────────────── */}
      <div
        className={cn(
          'flex items-center rounded-[14px] overflow-hidden transition-all duration-200',
          'bg-[#141C30] border border-white/16',
          'focus-within:border-[#00E87A] focus-within:shadow-[0_0_0_3px_rgba(0,232,122,0.18)]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]'
        )}
      >
        {/* Search icon */}
        <span className="pl-4 shrink-0 text-[#5A6A8A]" aria-hidden="true">
          <SearchIcon />
        </span>

        {/* Actor chip (inline, inside the field) */}
        {actorChip && (
          <span
            className={cn(
              'flex items-center gap-1 ml-2.5 shrink-0 pl-2 pr-1.5 py-1 rounded-full',
              'bg-[rgba(0,232,122,0.12)] border border-[#00E87A]',
              'text-[12px] font-medium text-[#00E87A]'
            )}
          >
            <span aria-hidden="true">{actorChip.emoji}</span>
            {actorChip.label}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemoveActorChip?.() }}
              aria-label={`Remove ${actorChip.label}`}
              className="ml-0.5 hover:text-[#00FF88] transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </span>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Describe your planning goal"
          className={cn(
            'flex-1 min-w-0 px-3 py-3.5 bg-transparent',
            'font-sans text-[15px] text-[#E8F0FF] placeholder:text-[#5A6A8A]',
            'focus:outline-none'
          )}
        />

        {/* Loading spinner */}
        {isLoading && (
          <span className="pr-3 shrink-0 text-[#5A6A8A] animate-spin" aria-hidden="true">
            <SpinnerIcon />
          </span>
        )}

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmitClick}
          aria-label="Check planning route"
          className={cn(
            'shrink-0 m-[6px] px-5 py-2.5 rounded-[10px]',
            'bg-[#00E87A] text-[#050A12] font-semibold text-sm font-sans',
            'transition-all duration-150',
            'hover:bg-[#00FF88] hover:shadow-[0_0_16px_rgba(0,232,122,0.5)]',
            'active:scale-[0.97]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E87A]',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-[#141C30]'
          )}
        >
          Check it →
        </button>
      </div>

      {/* ── Hint / suggestion row ─────────────────────────────── */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="mt-2.5 text-xs text-center min-h-[18px] transition-all duration-200"
      >
        {suggestion ? (
          <span className="text-[#00E87A]" style={{ textShadow: '0 0 12px rgba(0,232,122,0.4)' }}>
            <button
              type="button"
              onClick={handleSuggestionClick}
              className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              → {suggestion.label}
            </button>
            <span className="ml-2 text-[#5A6A8A]">
              · Press Tab to accept, Enter or click Check it to search
            </span>
          </span>
        ) : (
          <span className="text-[#5A6A8A]">{hintDefault}</span>
        )}
      </p>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}