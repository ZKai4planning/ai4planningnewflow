import type { Metadata } from 'next'
import Link from 'next/link'
import { GOALS } from '@/lib/goals'
import { Navbar } from '@/components/layout/Navbar'
import type { GoalId } from '@/types'

interface CheckPageProps {
  params: { goalId: string }
}

export function generateStaticParams() {
  return GOALS.map(g => ({ goalId: g.id }))
}

export async function generateMetadata({ params }: CheckPageProps): Promise<Metadata> {
  const goal = GOALS.find(g => g.id === params.goalId)
  return {
    title: goal ? `${goal.title} — Planning Check` : 'Planning Check',
  }
}

/**
 * /check/[goalId]
 * ────────────────
 * Placeholder page — rendered when a user clicks a goal card or strip,
 * or submits the search bar.
 *
 * Replace this with the full multi-step question engine (Phase 2 build).
 * The goalId param maps directly to the flow archetypes in the workbook.
 */
export default function CheckPage({ params }: CheckPageProps) {
  const goal = GOALS.find(g => g.id === (params.goalId as GoalId))

  return (
    <main className="min-h-screen bg-[#0A0E1A]">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 text-center">
        {/* Goal context */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,232,122,0.25)] bg-[rgba(0,232,122,0.06)]">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#00E87A]">
            {goal?.flowId ?? 'FA-03'} &nbsp;·&nbsp; {goal?.hgId ?? 'HG-008'}
          </span>
        </div>

        {/* Emoji + heading */}
        <span className="text-5xl mb-4 block" aria-hidden="true">
          {goal?.emoji ?? '🔍'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#E8F0FF] tracking-tight mb-3">
          {goal?.title ?? 'Planning check'}
        </h1>
        <p className="text-[15px] text-[#A8B8D8] max-w-[420px] mb-8 leading-relaxed">
          This is where the{' '}
          <strong className="text-[#E8F0FF]">question engine</strong> loads for
          this goal. The auth, address capture, free snapshot, and paid report
          flows will be built here in Phase&nbsp;2.
        </p>

        {/* Goal metadata */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[rgba(0,232,122,0.08)] text-[#00E87A] border border-[rgba(0,232,122,0.2)]">
            Goal ID: {goal?.id ?? params.goalId}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] text-[#A8B8D8] border border-white/[0.10]">
            Flow: {goal?.flowId ?? '—'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] text-[#A8B8D8] border border-white/[0.10]">
            First report: RPT-001 (free)
          </span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-white/[0.16] bg-white/[0.04] text-[#A8B8D8] text-sm font-medium hover:text-[#E8F0FF] hover:bg-white/[0.08] transition-colors duration-150"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  )
}
