// 'use client'

// import { useRouter }       from 'next/navigation'
// import { cn }              from '@/lib/cn'
// import { useSearch }       from '@/hooks/useSearch'
// import { CARD_GOALS, STRIP_GOALS } from '@/lib/goals'
// import { SearchBar }       from '@/components/ui/SearchBar'
// import { HeroEyebrow }     from './HeroEyebrow'
// import { HeroHeadline }    from './HeroHeadline'
// import { HeroTrustBar }    from './HeroTrustBar'
// import { GoalCard }        from './GoalCard'
// import { GoalStrip }       from './GoalStrip'
// import type { GoalId }     from '@/types'

// /**
//  * HeroSection
//  * ────────────
//  * Full above-the-fold section.
//  * Structure:
//  *   <section>
//  *     <AmbientBackground />   — CSS-only glow layers + dot grid
//  *     <HeroContent>
//  *       <HeroEyebrow />
//  *       <HeroHeadline />
//  *       <p> sub-copy </p>
//  *       <SearchBar />
//  *     </HeroContent>
//  *     <GoalGrid>              — 5 GoalCard
//  *     <GoalStripList>         — 5 GoalStrip
//  *     <HeroTrustBar />
//  *   </section>
//  *
//  * API integration point:
//  *   Goals currently come from the static GOALS array in lib/goals.ts.
//  *   When the /api/goals endpoint is ready, fetch here using
//  *   Next.js `fetch()` with `{ cache: 'revalidate', next: { revalidate: 3600 } }`
//  *   and pass the result down as props.
//  */
// export function HeroSection() {
//   const router = useRouter()
//   const search = useSearch()

//   // Navigate to the correct check flow
//   const handleGoalSelect = (goalId: GoalId | 'unsure') => {
//     router.push(`/check/${goalId}`)
//   }

//   return (
//     <section
//       className="relative overflow-hidden"
//       aria-labelledby="hero-heading"
//     >
//       {/* ── Ambient background layers ──────────────────────── */}
//       <AmbientBackground />

//       {/* ── Hero text + search ─────────────────────────────── */}
//       <div className="relative z-10 pt-[100px] pb-10 px-5 sm:px-8 text-center">
//         <div className="max-w-[620px] mx-auto flex flex-col items-center">

//           <HeroEyebrow />

//           <HeroHeadline id="hero-heading" className="mb-4" />

//           <p className="text-[15px] sm:text-[16px] text-[#A8B8D8] leading-relaxed mb-8 max-w-[480px]">
//             Tell us your goal in plain English. We check your location,
//             analyse planning constraints, and give you a free result in
//             under&nbsp;2&nbsp;minutes.
//           </p>

//           <SearchBar
//             value={search.query}
//             suggestion={search.suggestion}
//             isLoading={search.isLoading}
//             onChange={search.handleChange}
//             onSubmit={() => search.handleSubmit(handleGoalSelect)}
//             className="w-full max-w-[540px]"
//           />
//         </div>
//       </div>

//       {/* ── Goal catalogue ─────────────────────────────────── */}
//       {/* <div className="relative z-10 max-w-[920px] mx-auto px-5 sm:px-8 pb-6">

       
//         <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#5A6A8A] mb-3">
//           Most common goals — homeowners
//         </p>
//         <div
//           className={cn(
//             'grid gap-2.5 mb-6',
            
//             'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
//           )}
//           role="list"
//           aria-label="Homeowner planning goals"
//         >
//           {CARD_GOALS.map(goal => (
//             <div key={goal.id} role="listitem">
//               <GoalCard goal={goal} />
//             </div>
//           ))}
//         </div>

        
//         <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#5A6A8A] mb-3">
//           Landlords, developers &amp; professionals
//         </p>
//         <div
//           className="flex flex-col gap-2"
//           role="list"
//           aria-label="Professional and developer planning goals"
//         >
//           {STRIP_GOALS.map(goal => (
//             <div key={goal.id} role="listitem">
//               <GoalStrip goal={goal} />
//             </div>
//           ))}
//         </div>

        
//         <HeroTrustBar className="mt-2" />
//       </div> */}
//     </section>
//   )
// }

// // ── Ambient Background ─────────────────────────────────────────────
// function AmbientBackground() {
//   return (
//     <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//       {/* Dot grid texture */}
//       <div className="absolute inset-0 dot-grid opacity-60" />

//       {/* Green glow — top centre */}
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
//         style={{
//           background:
//             'radial-gradient(ellipse, rgba(0,232,122,0.10) 0%, rgba(0,232,122,0.04) 40%, transparent 70%)',
//           filter: 'blur(1px)',
//         }}
//       />

//       {/* Cyan glow — right */}
//       <div
//         className="absolute top-[15%] right-0 w-[400px] h-[400px] rounded-full"
//         style={{
//           background:
//             'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
//         }}
//       />

//       {/* Purple glow — left */}
//       <div
//         className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full"
//         style={{
//           background:
//             'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
//         }}
//       />

//       {/* Bottom gradient fade */}
//       <div
//         className="absolute bottom-0 inset-x-0 h-32"
//         style={{
//           background:
//             'linear-gradient(to bottom, transparent, #0A0E1A)',
//         }}
//       />
//     </div>
//   )
// }

'use client'

import { useRouter }        from 'next/navigation'
import { cn }               from '@/lib/cn'
import { useSearch }        from '@/hooks/useSearch'
import { CARD_GOALS, STRIP_GOALS } from '@/lib/goals'
import { SearchBar }        from '@/components/ui/SearchBar'
import { HeroEyebrow }      from './HeroEyebrow'
import { HeroHeadline }     from './HeroHeadline'
import { HeroTrustBar }     from './HeroTrustBar'
import { GoalCard }         from './GoalCard'
import { GoalStrip }        from './GoalStrip'
import { MarqueeScroll }    from '@/components/ui/MarqueeScroll'
import { FloatingLabels }   from '@/components/ui/FloatingLabels'
import type { ActorId, GoalId }      from '@/types'
import { ActorSelect } from './ActorSelect'
import { ActorConfirmModal } from '../ActorConfirmModal'

// ─────────────────────────────────────────────────────────────────────────────
// Marquee data
// Replace imageSrc values with your own assets or remove any you don't need.
// ─────────────────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  {
    id:       'ext',
    label:    'Build an extension',
    imageSrc: '/images/marquee/extension.jpg',
    imageAlt: 'Home extension example',
  },
  {
    id:       'loft',
    label:    'Convert a loft',
    imageSrc: '/images/marquee/loft.jpg',
    imageAlt: 'Loft conversion',
  },
  {
    id:       'garden',
    label:    'Add a garden room',
    imageSrc: '/images/marquee/garden-room.jpg',
    imageAlt: 'Garden room',
  },
  {
    id:       'hmo',
    label:    'Change of use to HMO',
    imageSrc: '/images/marquee/hmo.jpg',
    imageAlt: 'HMO property',
  },
  {
    id:       'newbuild',
    label:    'New build on my land',
    imageSrc: '/images/marquee/newbuild.jpg',
    imageAlt: 'New build plot',
  },
  {
    id:       'outbuilding',
    label:    'Outbuilding / garage',
    imageSrc: '/images/marquee/outbuilding.jpg',
    imageAlt: 'Outbuilding',
  },
  {
    id:       'annex',
    label:    'Annex for family',
    imageSrc: '/images/marquee/annex.jpg',
    imageAlt: 'Annex',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Floating label data
// These are sample planning questions your users actually ask.
// ─────────────────────────────────────────────────────────────────────────────
const FLOATING_LABELS = [
  { id: 'fl-1',  text: 'What can I do to get an approval?' },
  { id: 'fl-2',  text: 'Can I build a garage?' },
  { id: 'fl-3',  text: 'Do I need planning permission?' },
  { id: 'fl-4',  text: 'How big can my extension be?' },
  { id: 'fl-5',  text: 'Is my property in a conservation area?' },
  { id: 'fl-6',  text: 'Can I split the plot?' },
  { id: 'fl-7',  text: 'Convert loft to bedroom?' },
  { id: 'fl-8',  text: 'Add a garden room or studio?' },
  { id: 'fl-9',  text: 'Change of use to HMO' },
  { id: 'fl-10', text: 'Extend over the garage' },
  { id: 'fl-11', text: 'New build on my land' },
  { id: 'fl-12', text: 'Side return extension' },
]

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const router = useRouter()
  const search = useSearch()

const handleGoalSelect = (goalId: GoalId | 'unsure', actorId: ActorId | null) => {
  const params = actorId ? `?actor=${actorId}` : ''
  router.push(`/check/${goalId}${params}`)
}

  // Pre-fill the search bar when a floating label is clicked
  const floatingItemsWithHandlers = FLOATING_LABELS.map(item => ({
    ...item,
    onSelect: (text: string) => {
      search.handleChange(text)
      // Optionally focus the search input after selection:
      document.getElementById('hero-search')?.focus()
    },
  }))

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Ambient background ─────────────────────────────── */}
      <AmbientBackground />

      {/* ── Hero text + search ─────────────────────────────── */}
      <div className="relative z-10 pt-[100px] pb-10 px-5 sm:px-8 text-center">
        <div className="max-w-[620px] mx-auto flex flex-col items-center">

          <HeroEyebrow />

          <HeroHeadline id="hero-heading" className="mb-4" />

          <p className="text-[15px] sm:text-[16px] text-[#A8B8D8] leading-relaxed mb-8 max-w-[480px]">
            Tell us your goal in plain English. We check your location,
            analyse planning constraints, and give you a free result in
            under&nbsp;2&nbsp;minutes.
          </p>

          {/* <SearchBar
            id="hero-search"
            value={search.query}
            suggestion={search.suggestion}
            isLoading={search.isLoading}
            onChange={search.handleChange}
            onSubmit={() => search.handleSubmit(handleGoalSelect)}
            className="w-full max-w-[540px]"
          /> */}
          <SearchBar
  id="hero-search"
  value={search.query}
  suggestion={search.suggestion}
  isLoading={search.isLoading}
  onChange={search.handleChange}
  onSubmit={() => search.handleSubmit(
    (goalId, actorId) => handleGoalSelect(goalId, actorId)
  )}
  actorChip={search.selectedActorMeta}
  onRemoveActorChip={() => search.selectActor(null)}
  className="w-full max-w-[540px]"
/>
<ActorSelect
  selectedActor={search.selectedActor}
  actorSuggestion={search.actorSuggestion}
  onSelect={search.selectActor}
  onAcceptSuggestion={search.acceptActorSuggestion}
  className="w-full max-w-[740px] mt-3"
/>
<ActorConfirmModal
  actor={search.pendingActorConfirmMeta}
  onConfirm={search.confirmPendingActor}
  onCancel={search.cancelPendingActor}
/>
        </div>
      </div>

      {/* ── Floating physics labels ─────────────────────────── */}
      {/*
        Labels fall from the top and settle at the bottom of the hero.
        Cursor pushes them away. Click to pre-fill the search bar.
      */}
      <FloatingLabels
        items={floatingItemsWithHandlers}
        height={300}
        className="relative z-10"
      />

      {/* ── Marquee scroll ──────────────────────────────────── */}
      {/*
        Infinite horizontal scroll. Hover a label to reveal
        a preview image floating above the cursor.
      */}
      <div className="relative z-10 py-6 border-t border-white/[0.05]">
        <MarqueeScroll
          items={MARQUEE_ITEMS}
          speed={55}
          labelSize="text-3xl sm:text-4xl"
        />
      </div>

      {/* ── Trust bar ───────────────────────────────────────── */}
      <div className="relative z-10 px-5 sm:px-8 pb-10">
        <HeroTrustBar className="max-w-[920px] mx-auto" />
      </div>
    </section>
  )
}

// ── Ambient Background ─────────────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 dot-grid opacity-60" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,232,122,0.10) 0%, rgba(0,232,122,0.04) 40%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />
      <div
        className="absolute top-[15%] right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0E1A)',
        }}
      />
    </div>
  )
}