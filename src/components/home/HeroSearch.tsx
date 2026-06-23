'use client'

import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/ui/SearchBar'
import { ActorSelect } from '@/components/home/ActorSelect'
import { useSearch } from '@/hooks/useSearch'

/**
 * HeroSearch
 * ───────────
 * Wires SearchBar + ActorSelect to the useSearch hook and handles
 * the redirect on submit: /check/{goalId}?actor={actorId}
 */
export function HeroSearch() {
  const router = useRouter()
  const {
    query,
    suggestion,
    actorSuggestion,
    selectedActor,
    selectedActorMeta,
    isLoading,
    handleChange,
    handleSubmit,
    selectActor,
    acceptActorSuggestion,
  } = useSearch()

  const onSubmit = () => {
    handleSubmit((goalId, actorId) => {
      const params = actorId ? `?actor=${actorId}` : ''
      router.push(`/check/${goalId}${params}`)
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      <SearchBar
        value={query}
        suggestion={suggestion}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={onSubmit}
        actorChip={selectedActorMeta}
        onRemoveActorChip={() => selectActor(null)}
      />

      <ActorSelect
        selectedActor={selectedActor}
        actorSuggestion={actorSuggestion}
        onSelect={selectActor}
        onAcceptSuggestion={acceptActorSuggestion}
      />
    </div>
  )
}