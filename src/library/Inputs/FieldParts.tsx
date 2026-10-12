import type { MouseEventHandler, ReactNode } from 'react'
import { brandColor, type BrandColor } from '../colors'
import { Typography } from '../Typography/Typography'

const slotClasses = 'absolute top-px flex items-center justify-center transition-colors'

type IconSlotProps = {
  icon: ReactNode
  className: string
  color?: BrandColor
  colorBackground?: BrandColor
  callback?: MouseEventHandler<HTMLButtonElement>
}

/** Kwadrat z ikoną wewnątrz pola. Bez koloru ikona ma kolor ramki pola. */
export function IconSlot({ icon, className, color, colorBackground, callback }: IconSlotProps) {
  const style = {
    color: color ? brandColor(color) : 'var(--field-border)',
    backgroundColor: colorBackground ? brandColor(colorBackground) : undefined,
  }

  // Bez callbacku klik przechodzi do pola.
  if (!callback) {
    return (
      <span style={style} className={`${slotClasses} ${className} pointer-events-none`}>
        {icon}
      </span>
    )
  }

  // TODO: dodaj aria-label dla przycisku z samą ikoną
  return (
    <button type="button" onClick={callback} style={style} className={`${slotClasses} ${className} cursor-pointer`}>
      {icon}
    </button>
  )
}

type FieldFrameProps = {
  id: string
  label?: string
  caption?: string
  captionColor?: BrandColor
  respectLabelGap?: boolean
  respectCaptionGap?: boolean
  children: ReactNode
}

/** Label nad polem i caption pod polem. Bez nich z respect*Gap zostaje puste miejsce o ich wysokości. */
export function FieldFrame({
  id,
  label,
  caption,
  captionColor = 'brand-text-secondary',
  respectLabelGap = false,
  respectCaptionGap = false,
  children,
}: FieldFrameProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        // flex: bez niego label ma wysokość linii tekstu strony (24 px), a nie text-sm (20 px).
        <label htmlFor={id} className="flex">
          <Typography variant="small-medium" component="span" color="brand-text-primary">
            {label}
          </Typography>
        </label>
      ) : (
        respectLabelGap && <Typography variant="small-medium" component="span">{' '}</Typography>
      )}
      {children}
      {caption ? (
        <Typography id={`${id}-caption`} variant="caption" color={captionColor}>
          {caption}
        </Typography>
      ) : (
        respectCaptionGap && <Typography variant="caption">{' '}</Typography>
      )}
    </div>
  )
}
