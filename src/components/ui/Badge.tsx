import type { ReactNode } from 'react'
import { accentSoft } from '../../lib/accents'
import type { Accent } from '../../lib/types'

export function Badge({ accent, children }: { accent: Accent; children: ReactNode }) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-0.5 text-xs font-medium ${accentSoft[accent]}`}
    >
      {children}
    </span>
  )
}
