import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** Rozwijana sekcja na natywnym <details>, np. dla formularzy dodawania w demo. */
export function Disclosure({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <details className="group rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-primary/60">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 text-sm font-medium text-brand-text-primary [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <Icon size={16} aria-hidden className="text-brand-primary" />
          {title}
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          className="text-brand-text-secondary transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-brand-text-tertiary/20 p-4">{children}</div>
    </details>
  )
}
