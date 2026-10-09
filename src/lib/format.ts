import type { Measure } from './types'

const numberFormat = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 1 })

export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

export function formatAmount(amount: number, measure: Measure): string {
  if (measure === 'szt') return `${formatNumber(amount)} szt.`
  return amount >= 1000 ? `${formatNumber(amount / 1000)} kg` : `${formatNumber(amount)} g`
}

export function measureLabel(measure: Measure): string {
  return measure === 'g' ? 'na 100 g' : 'na 1 szt.'
}

/** Parsuje liczbę wpisaną przez użytkownika; akceptuje przecinek dziesiętny. */
export function parseNumber(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '') return null
  const parsed = Number(trimmed.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}
