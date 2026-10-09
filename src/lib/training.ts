import type { DayKey, PlanEntry } from './types'

export const DAYS: { key: DayKey; short: string; label: string }[] = [
  { key: 'pn', short: 'Pn', label: 'Poniedziałek' },
  { key: 'wt', short: 'Wt', label: 'Wtorek' },
  { key: 'sr', short: 'Śr', label: 'Środa' },
  { key: 'cz', short: 'Cz', label: 'Czwartek' },
  { key: 'pt', short: 'Pt', label: 'Piątek' },
  { key: 'so', short: 'So', label: 'Sobota' },
  { key: 'nd', short: 'Nd', label: 'Niedziela' },
]

export function totalSets(entries: PlanEntry[]): number {
  return entries.reduce((sum, e) => sum + e.sets, 0)
}

/** Objętość treningu: serie x powtórzenia x ciężar. Ćwiczenia z masą ciała (0 kg) nie wliczają się. */
export function totalVolume(entries: PlanEntry[]): number {
  return entries.reduce((sum, e) => sum + e.sets * e.reps * e.weight, 0)
}
