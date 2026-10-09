import type { LucideIcon } from 'lucide-react'
import { useRef, type KeyboardEvent, type ReactNode } from 'react'

export type TabItem<T extends string> = {
  id: T
  label: string
  /** Krótsza etykieta na wąskie ekrany. */
  shortLabel?: string
  icon: LucideIcon
}

type TabsProps<T extends string> = {
  idPrefix: string
  label: string
  tabs: TabItem<T>[]
  value: T
  onChange: (value: T) => void
}

export function Tabs<T extends string>({ idPrefix, label, tabs, value, onChange }: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className="flex gap-1 rounded-full bg-brand-bg-primary p-1">
      {tabs.map((tab, index) => {
        const selected = tab.id === value
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[index] = el
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium whitespace-nowrap transition-colors ${
              selected
                ? 'bg-brand-bg-tertiary text-brand-primary shadow-sm shadow-brand-primary/10 dark:shadow-black/40'
                : 'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            <Icon size={16} aria-hidden className="hidden shrink-0 sm:block" />
            <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

type TabPanelProps = { idPrefix: string; id: string; active: boolean; children: ReactNode }

/** Nieaktywne panele są ukryte, ale zostają w DOM, więc wpisane dane w formularzach nie znikają. */
export function TabPanel({ idPrefix, id, active, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${id}`}
      aria-labelledby={`${idPrefix}-tab-${id}`}
      hidden={!active}
      className="mt-5"
    >
      {children}
    </div>
  )
}
