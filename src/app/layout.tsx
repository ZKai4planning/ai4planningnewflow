import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

import { CookieConsentBanner } from '@/components/cookie/CookieConsentBanner'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout'

export const metadata: Metadata = {
  title: {
    default: 'AI4Planning — Smart Planning Permission Advisor',
    template: '%s | AI4Planning',
  },
  description:
    'AI-powered UK planning permission advice. Tell us your goal, we check your location, analyse constraints, and give you a free result in under 2 minutes.',
  keywords: [
    'planning permission',
    'householder application',
    'permitted development',
    'LDC',
    'HMO licence',
    'UK planning advice',
    'AI planning',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    title: 'AI4Planning — Smart Planning Permission Advisor',
    description:
      'Free AI-powered planning advice. Know your route in under 2 minutes.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI4Planning',
    description: 'Free AI-powered planning advice. Know your route in 2 minutes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <Navbar />
      <body className="bg-[#0A0E1A] text-[#E8F0FF] antialiased">
        {children}
         {/*
          CookieConsent lives here — outside any Suspense boundary,
          outside any auth shell, rendered on every page automatically.
          Remove once the user has consented (check your cookie/localStorage flag).
        */}
        <Footer/>
        <CookieConsentBanner />

      </body>
    </html>
  )
}


