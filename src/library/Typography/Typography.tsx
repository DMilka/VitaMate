import type { CSSProperties } from 'react'
import { brandColor, type BrandColor } from '../colors'

type TypographyVariant =
  | 'heading-5xl'
  | 'heading-3xl'
  | 'heading-2xl'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-base'
  | 'subtitle'
  | 'lead'
  | 'body'
  | 'body-medium'
  | 'body-semibold'
  | 'small'
  | 'small-relaxed'
  | 'small-medium'
  | 'caption'

type TypographyTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

type FontType = 'brand-font-primary' | 'brand-font-secondary'

type TypographyProps = {
  children: string
  variant?: TypographyVariant
  /** Renderowany tag. Domyślnie wynika z wariantu. */
  component?: TypographyTag
  /** Bez koloru tekst dziedziczy kolor rodzica (nagłówki: brand-primary). */
  color?: BrandColor
  colorCover?: number
  /** Bez fontu tekst dziedziczy font rodzica (nagłówki: brand-font-secondary). */
  fontType?: FontType
  id?: string
}

const variants: Record<TypographyVariant, { classes: string; tag: TypographyTag; heading?: true }> = {
  'heading-5xl': { classes: 'text-4xl font-semibold tracking-tight sm:text-5xl', tag: 'h2', heading: true },
  'heading-3xl': { classes: 'text-3xl font-semibold tracking-tight', tag: 'h1', heading: true },
  'heading-2xl': { classes: 'text-2xl font-semibold', tag: 'h3', heading: true },
  'heading-xl': { classes: 'text-xl font-semibold', tag: 'h3', heading: true },
  'heading-lg': { classes: 'text-lg font-semibold', tag: 'h3', heading: true },
  'heading-base': { classes: 'text-base font-semibold', tag: 'h3', heading: true },
  subtitle: { classes: 'text-xl leading-snug sm:text-2xl', tag: 'p' },
  lead: { classes: 'text-lg leading-relaxed', tag: 'p' },
  body: { classes: 'text-base leading-relaxed', tag: 'p' },
  'body-medium': { classes: 'font-medium', tag: 'p' },
  'body-semibold': { classes: 'font-semibold', tag: 'p' },
  small: { classes: 'text-sm', tag: 'p' },
  'small-relaxed': { classes: 'text-sm leading-relaxed', tag: 'p' },
  'small-medium': { classes: 'text-sm font-medium', tag: 'p' },
  caption: { classes: 'text-xs', tag: 'p' },
}

// Pełne nazwy klas, żeby Tailwind je wykrył.
const fonts: Record<FontType, string> = {
  'brand-font-primary': 'font-brand-font-primary',
  'brand-font-secondary': 'font-brand-font-secondary',
}

export function Typography({ children, variant = 'body', component, color, colorCover, fontType, id }: TypographyProps) {
  const { classes, tag, heading } = variants[variant]
  const Tag = component ?? tag

  // Nagłówki domyślnie: font secondary, kolor brand-primary, równe łamanie linii.
  const font = fontType ?? (heading ? 'brand-font-secondary' : undefined)
  const textColor = color ?? (heading ? 'brand-primary' : undefined)

  const style = textColor ? ({ '--typo-color': brandColor(textColor, colorCover) } as CSSProperties) : undefined
  const className = [
    classes,
    font && fonts[font],
    textColor && 'text-(--typo-color)',
    heading && 'text-balance',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag id={id} style={style} className={className}>
      {children}
    </Tag>
  )
}
