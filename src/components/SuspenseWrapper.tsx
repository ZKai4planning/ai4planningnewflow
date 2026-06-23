'use client'

import { Suspense, ReactNode } from 'react'

export default function SuspenseWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}