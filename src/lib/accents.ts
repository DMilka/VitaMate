import type { Accent } from './types'

export const ACCENTS: Accent[] = ['one', 'two', 'three', 'four', 'five']

/** Tło (kolor/15) i tekst w kolorze akcentu: chipy, badge, tła ikon. Pełne nazwy klas, żeby Tailwind je wykrył. */
export const accentSoft: Record<Accent, string> = {
  one: 'bg-brand-accent-one/15 text-brand-accent-one',
  two: 'bg-brand-accent-two/15 text-brand-accent-two',
  three: 'bg-brand-accent-three/15 text-brand-accent-three',
  four: 'bg-brand-accent-four/15 text-brand-accent-four',
  five: 'bg-brand-accent-five/15 text-brand-accent-five',
}

/** Pełny kolor akcentu, np. dla próbek koloru i znaczników w kalendarzu. */
export const accentSolid: Record<Accent, string> = {
  one: 'bg-brand-accent-one',
  two: 'bg-brand-accent-two',
  three: 'bg-brand-accent-three',
  four: 'bg-brand-accent-four',
  five: 'bg-brand-accent-five',
}

export const accentNames: Record<Accent, string> = {
  one: 'Kolor 1',
  two: 'Kolor 2',
  three: 'Kolor 3',
  four: 'Kolor 4',
  five: 'Kolor 5',
}
