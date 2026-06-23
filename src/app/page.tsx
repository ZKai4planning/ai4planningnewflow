import type { Metadata } from 'next'
import { Navbar }      from '@/components/layout/Navbar'
import { HeroSection } from '@/components/home/HeroSection'

export const metadata: Metadata = {
  title: 'AI4Planning — Smart Planning Permission Advisor',
}

/**
 * Homepage
 * ─────────
 * Renders the Navbar + Hero.
 * Future sections (GoalGrid, HowItWorks, Testimonials, etc.)
 * drop in below <HeroSection /> as separate async components.
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
    </main>
  )
}
