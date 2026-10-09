import { FlaskConical, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** Ramka "okna aplikacji" dla interaktywnych dem na stronie głównej. */
export function DemoFrame({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-text-tertiary/25 bg-brand-bg-tertiary shadow-xl shadow-brand-primary/10 dark:shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-brand-text-tertiary/20 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-brand-text-button">
            <Icon size={16} aria-hidden />
          </span>
          <span className="truncate font-display text-lg font-semibold text-brand-primary">{title}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-info/15 px-2.5 py-1 text-xs font-medium text-brand-info">
          <FlaskConical size={13} aria-hidden />
          Demo
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      <p className="border-t border-brand-text-tertiary/20 px-4 py-3 text-xs text-brand-text-secondary sm:px-5">
        Zmiany w demo nie są zapisywane. Po odświeżeniu strony wrócą przykładowe dane.
      </p>
    </div>
  )
}
