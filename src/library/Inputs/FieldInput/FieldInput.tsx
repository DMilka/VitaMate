import type { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react'
import { brandColor, type BrandColor } from '../../colors'
import { Typography } from '../../Typography/Typography'

// Pola daty, godziny i listy wyboru to osobne komponenty (DatePicker, TimePicker, SelectInput).
type FieldInputType = 'text' | 'number' | 'email'

type FieldInputSize = 'sm' | 'md' | 'lg'

type FieldInputProps = {
  id: string
  label?: string
  /** number: przyjmuje tylko liczbę (minus, cyfry, przecinek lub kropka), na telefonie klawiatura numeryczna. Wartość trzeba sparsować w formularzu. */
  type?: FieldInputType
  /** Wysokość samego pola (bez labela i caption), jak w Button. Domyślnie md. */
  size?: FieldInputSize
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  /** Ikony wewnątrz pola, przed i za tekstem (np. lucide z size={18}). */
  startIcon?: ReactNode
  /** Bez koloru ikona ma kolor ramki pola. */
  startIconColor?: BrandColor
  /** Bez koloru tła ikona nie ma tła. */
  startIconColorBackground?: BrandColor
  /** Bez callbacku klik w ikonę ustawia focus w polu. */
  startIconCallback?: MouseEventHandler<HTMLButtonElement>
  endIcon?: ReactNode
  endIconColor?: BrandColor
  endIconColorBackground?: BrandColor
  endIconCallback?: MouseEventHandler<HTMLButtonElement>
  /** Tekst pod polem: podpowiedź, błąd, ostrzeżenie itp. */
  caption?: string
  /** Kolor caption, np. brand-error dla błędu. Domyślnie brand-text-secondary. */
  captionColor?: BrandColor
  /** Bez labela (caption) zostaw puste miejsce o jego wysokości, żeby pola w rzędzie były wyrównane. */
  respectLabelGap?: boolean
  respectCaptionGap?: boolean
}

// Kwadrat pod ikoną przylega do ramki (1 px), więc ma bok równy wysokości pola minus 2 px.
const sizes: Record<FieldInputSize, { input: string; slot: string; slotPx: number }> = {
  sm: { input: 'h-10', slot: 'size-9.5', slotPx: 38 },
  md: { input: 'h-11', slot: 'size-10.5', slotPx: 42 },
  lg: { input: 'h-12', slot: 'size-11.5', slotPx: 46 },
}

// --field-border to kolor ramki, z którego biorą też ikony bez własnego koloru.
const wrapperClasses =
  'relative [--field-border:var(--color-brand-text-tertiary)] hover:[--field-border:var(--color-brand-text-secondary)]'

// text-base (16 px), żeby iOS nie powiększał strony przy fokusie.
const inputClasses =
  'w-full rounded-xl border border-(--field-border) bg-brand-bg-primary text-base text-brand-text-primary transition-colors placeholder:text-brand-text-tertiary aria-[invalid=true]:border-brand-error'

// Liczba: opcjonalny minus na początku, cyfry i jeden separator (przecinek lub kropka).
const NUMBER_PATTERN = /^-?\d*[.,]?\d*$/

const slotClasses = 'absolute top-px flex items-center justify-center transition-colors'

// Zewnętrzne rogi kwadratu: 11 px, czyli rounded-xl pola minus ramka. Od strony tekstu rogi są proste.
const slotStart = 'left-px rounded-l-[11px]'
const slotEnd = 'right-px rounded-r-[11px]'

type IconSlotProps = {
  icon: ReactNode
  className: string
  color?: BrandColor
  colorBackground?: BrandColor
  callback?: MouseEventHandler<HTMLButtonElement>
}

function IconSlot({ icon, className, color, colorBackground, callback }: IconSlotProps) {
  const style = {
    color: color ? brandColor(color) : 'var(--field-border)',
    backgroundColor: colorBackground ? brandColor(colorBackground) : undefined,
  }

  // Bez callbacku klik przechodzi do pola: focus i kursor tekstowy.
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

export function FieldInput({
  id,
  label,
  type = 'text',
  size = 'md',
  value,
  onChange,
  placeholder,
  startIcon,
  startIconColor,
  startIconColorBackground,
  startIconCallback,
  endIcon,
  endIconColor,
  endIconColorBackground,
  endIconCallback,
  caption,
  captionColor = 'brand-text-secondary',
  respectLabelGap = false,
  respectCaptionGap = false,
}: FieldInputProps) {
  const { input, slot, slotPx } = sizes[size]

  // type="number" nie przyjmuje przecinka w części przeglądarek i nie zawsze respektuje inputMode,
  // więc liczba to tekst z inputMode decimal: na telefonie klawiatura numeryczna z przecinkiem.
  const isNumber = type === 'number'

  // Zmiana, która nie jest liczbą, nie trafia do stanu, więc kontrolowane pole zostaje bez zmian.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isNumber && !NUMBER_PATTERN.test(event.target.value)) return
    onChange(event)
  }

  // Tekst zaczyna się za kwadratem ikony, a przy tle o 8 px dalej, żeby go nie dotykał.
  const sidePadding = (icon: ReactNode, background?: BrandColor) =>
    icon ? 1 + slotPx + (background ? 8 : 0) : 14

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
      {/* TODO: dodaj aria-invalid, aria-describedby (powiązanie z caption przez `${id}-caption`) i aria-label, gdy nie ma labela */}
      <div className={wrapperClasses}>
        {startIcon && (
          <IconSlot
            icon={startIcon}
            className={`${slot} ${slotStart}`}
            color={startIconColor}
            colorBackground={startIconColorBackground}
            callback={startIconCallback}
          />
        )}
        <input
          id={id}
          type={isNumber ? 'text' : type}
          inputMode={isNumber ? 'decimal' : undefined}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          style={{
            paddingLeft: sidePadding(startIcon, startIconColorBackground),
            paddingRight: sidePadding(endIcon, endIconColorBackground),
          }}
          className={`${inputClasses} ${input}`}
        />
        {endIcon && (
          <IconSlot
            icon={endIcon}
            className={`${slot} ${slotEnd}`}
            color={endIconColor}
            colorBackground={endIconColorBackground}
            callback={endIconCallback}
          />
        )}
      </div>
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
