import type { CSSProperties, ReactNode } from 'react'
import { brandColor, type BrandColor } from '../colors'

type ButtonSize = 'sm' | 'md' | 'lg'

/** Wygląd wspólny dla Button, LinkButton i RedirectButton. */
export type ButtonStyleProps = {
  size?: ButtonSize
  label?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  /** Kolor tekstu i ikon. */
  color: BrandColor
  colorCover?: number
  colorBackground?: BrandColor
  colorBackgroundCover?: number
  /** Bez obramowania przyjmuje kolor tła, więc wymiary są takie same w każdym wariancie. */
  colorBorder?: BrandColor
  colorBorderCover?: number
  /** Kolory na hover. Bez nich kolor bazowy jest przyciemniany o 10% (w ciemnym motywie rozjaśniany). */
  colorHover?: BrandColor
  colorHoverCover?: number
  colorBackgroundHover?: BrandColor
  colorBackgroundHoverCover?: number
  colorBorderHover?: BrandColor
  colorBorderHoverCover?: number
  fullWidth?: boolean
}

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

// Kolory przez zmienne CSS ustawiane w style, żeby klasy były stałe i Tailwind je wykrył.
// --btn-shade: w jasnym motywie hover ciemnieje, w ciemnym jaśnieje.
const colors =
  'text-(--btn-fg) bg-(--btn-bg) border-(--btn-border) hover:text-(--btn-fg-hover) hover:bg-(--btn-bg-hover) hover:border-(--btn-border-hover) [--btn-shade:black] dark:[--btn-shade:white]'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

// Przycisk z samą ikoną jest kwadratowy.
const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'size-10',
  md: 'size-11',
  lg: 'size-12',
}

/** To samo co brightness-90 (brightness-110 w ciemnym motywie), ale dla pojedynczego koloru. */
const shade = (color: string) => `color-mix(in srgb, ${color} 90%, var(--btn-shade))`

/** Klasy i zmienne CSS z kolorami dla elementu przycisku. */
export function buttonStyle({
  size = 'md',
  label,
  color,
  colorCover,
  colorBackground,
  colorBackgroundCover,
  colorBorder,
  colorBorderCover,
  colorHover,
  colorHoverCover,
  colorBackgroundHover,
  colorBackgroundHoverCover,
  colorBorderHover,
  colorBorderHoverCover,
  fullWidth = false,
}: ButtonStyleProps): { className: string; style: CSSProperties } {
  const fg = brandColor(color, colorCover)
  const bg = colorBackground ? brandColor(colorBackground, colorBackgroundCover) : 'transparent'
  const border = colorBorder ? brandColor(colorBorder, colorBorderCover) : bg

  const fgHover = colorHover ? brandColor(colorHover, colorHoverCover) : shade(fg)
  const bgHover = colorBackgroundHover
    ? brandColor(colorBackgroundHover, colorBackgroundHoverCover)
    : colorBackground
      ? shade(bg)
      : 'transparent'
  const borderHover = colorBorderHover
    ? brandColor(colorBorderHover, colorBorderHoverCover)
    : colorBorder
      ? shade(border)
      : bgHover

  const style = {
    '--btn-fg': fg,
    '--btn-bg': bg,
    '--btn-border': border,
    '--btn-fg-hover': fgHover,
    '--btn-bg-hover': bgHover,
    '--btn-border-hover': borderHover,
  } as CSSProperties

  const sizeClasses = label ? sizes[size] : iconOnlySizes[size]

  return { className: `${base} ${colors} ${sizeClasses} ${fullWidth ? 'w-full' : ''}`, style }
}
