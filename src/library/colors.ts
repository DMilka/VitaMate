/** Tokeny kolorów z index.css (--color-brand-*). Wartości zmieniają się z motywem. */
export type BrandColor =
  | 'brand-bg-primary'
  | 'brand-bg-secondary'
  | 'brand-bg-tertiary'
  | 'brand-bg-quaternary'
  | 'brand-text-primary'
  | 'brand-text-secondary'
  | 'brand-text-tertiary'
  | 'brand-text-button'
  | 'brand-primary'
  | 'brand-secondary'
  | 'brand-tertiary'
  | 'brand-success'
  | 'brand-warning'
  | 'brand-error'
  | 'brand-info'
  | 'brand-accent-one'
  | 'brand-accent-two'
  | 'brand-accent-three'
  | 'brand-accent-four'
  | 'brand-accent-five'

/** Wartość CSS tokenu. cover (0-100) to krycie w %, liczone jak /N w Tailwindzie. */
export function brandColor(token: BrandColor, cover?: number): string {
  const color = `var(--color-${token})`
  return cover === undefined ? color : `color-mix(in oklab, ${color} ${cover}%, transparent)`
}
