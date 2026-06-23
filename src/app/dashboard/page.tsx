import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

/**
 * /dashboard — placeholder
 * Auth pages redirect here after successful verification.
 * Replace with the full dashboard in a later phase.
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 text-center">

        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(0,232,122,0.12)', boxShadow: '0 0 30px rgba(0,232,122,0.25)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E87A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#E8F0FF] tracking-tight mb-3">
          You're in!
        </h1>
        <p className="text-[15px] text-[#A8B8D8] max-w-[380px] mb-8 leading-relaxed">
          Dashboard coming in Phase 2. Your projects, reports, and cart will live here.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#00E87A] text-[#050A12] text-sm font-semibold hover:bg-[#00FF88] transition-colors"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  )
}
