import type { CSSProperties, ReactNode } from 'react'
import { brandColor, type BrandColor } from '../colors'

/** Wygląd wspólny dla pól w Inputs (FieldInput, SelectInput, DatePicker, TimePicker). */
export type FieldSize = 'sm' | 'md' | 'lg'

// Kwadrat pod ikoną przylega do ramki (1 px), więc ma bok równy wysokości pola minus 2 px.
export const fieldSizes: Record<FieldSize, { control: string; slot: string; slotPx: number }> = {
  sm: { control: 'h-10', slot: 'size-9.5', slotPx: 38 },
  md: { control: 'h-11', slot: 'size-10.5', slotPx: 42 },
  lg: { control: 'h-12', slot: 'size-11.5', slotPx: 46 },
}

// --field-border to kolor ramki, z którego biorą też ikony bez własnego koloru.
export const fieldWrapperClasses =
  'relative [--field-border:var(--color-brand-text-tertiary)] hover:[--field-border:var(--color-brand-text-secondary)]'

// text-base (16 px), żeby iOS nie powiększał strony przy fokusie.
export const fieldControlClasses =
  'w-full rounded-xl border border-(--field-border) bg-brand-bg-primary text-base text-brand-text-primary transition-colors placeholder:text-brand-text-tertiary aria-[invalid=true]:border-brand-error'

// Zewnętrzne rogi kwadratu: 11 px, czyli rounded-xl pola minus ramka. Od strony tekstu rogi są proste.
export const slotStart = 'left-px rounded-l-[11px]'
export const slotEnd = 'right-px rounded-r-[11px]'

/** Tekst zaczyna się za kwadratem ikony, a przy tle o 8 px dalej, żeby go nie dotykał. */
export function fieldSidePadding(size: FieldSize, icon: ReactNode, background?: BrandColor): number {
  return icon ? 1 + fieldSizes[size].slotPx + (background ? 8 : 0) : 14
}

// Panel pod polem (lista SelectInput, kalendarz, wybór godziny): wygląd jak Disclosure, ale z pełnym tłem
// i cieniem, bo leży nad treścią. m-0 i inset-auto zdejmują domyślne style popovera (wyśrodkowanie na ekranie).
// Panel nie może dostać klasy display (flex, grid), bo nadpisałaby ukrywanie popovera; układ robimy w środku.
// Rozwijanie: panel odsłania się od góry (clip-path) i pojawia (opacity), zamknięcie odwrotnie i szybciej.
// Ujemne boki i dół clip-path zostawiają miejsce na cień. transition-discrete z display i overlay animuje też zamknięcie.
export const fieldPanelClasses =
  'm-0 inset-auto rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-primary text-brand-text-primary shadow-xl shadow-brand-primary/10 dark:shadow-black/40 opacity-0 [clip-path:inset(0_-40px_100%_-40px)] transition-[opacity,clip-path,display,overlay] transition-discrete duration-150 ease-out open:opacity-100 open:[clip-path:inset(0_-40px_-60px_-40px)] open:duration-200 starting:open:opacity-0 starting:open:[clip-path:inset(0_-40px_100%_-40px)] motion-reduce:transition-none'

/** Kolory elementów w panelu: opcji listy, dni kalendarza, wybranej godziny i minuty. */
export type ElementColorProps = {
  /** Kolory elementu na hover. Domyślnie tekst brand-text-primary i tło brand-primary 10%. */
  colorElementHover?: BrandColor
  colorBackgroundElementHover?: BrandColor
  /** Kolory wybranego elementu, bez zmiany na hover. Domyślnie tekst brand-primary i tło brand-primary 15%. */
  colorElement?: BrandColor
  colorBackgroundElement?: BrandColor
}

/** Zmienne CSS z kolorami elementów. Ustawiane na panelu, czytają je klasy element*Classes. */
export function elementColorVars({
  colorElementHover,
  colorBackgroundElementHover,
  colorElement,
  colorBackgroundElement,
}: ElementColorProps): CSSProperties {
  return {
    '--element-hover-fg': brandColor(colorElementHover ?? 'brand-text-primary'),
    '--element-hover-bg': colorBackgroundElementHover
      ? brandColor(colorBackgroundElementHover)
      : brandColor('brand-primary', 10),
    '--element-selected-fg': brandColor(colorElement ?? 'brand-primary'),
    '--element-selected-bg': colorBackgroundElement ? brandColor(colorBackgroundElement) : brandColor('brand-primary', 15),
  } as CSSProperties
}

export const elementHoverClasses = 'hover:bg-(--element-hover-bg) hover:text-(--element-hover-fg)'
export const elementIdleClasses = `text-brand-text-primary ${elementHoverClasses}`
export const elementSelectedClasses = 'bg-(--element-selected-bg) text-(--element-selected-fg)'
