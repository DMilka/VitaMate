import type { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react'
import type { BrandColor } from '../../colors'
import { FieldFrame, IconSlot } from '../FieldParts'
import {
  fieldControlClasses,
  fieldSidePadding,
  fieldSizes,
  fieldWrapperClasses,
  slotEnd,
  slotStart,
  type FieldSize,
} from '../fieldStyles'

// Pola daty, godziny i listy wyboru to osobne komponenty (DatePicker, TimePicker, SelectInput).
type FieldInputType = 'text' | 'number' | 'email'

type FieldInputProps = {
  id: string
  label?: string
  /** number: przyjmuje tylko liczbę (minus, cyfry, przecinek lub kropka), na telefonie klawiatura numeryczna. Wartość trzeba sparsować w formularzu. */
  type?: FieldInputType
  /** Wysokość samego pola (bez labela i caption), jak w Button. Domyślnie md. */
  size?: FieldSize
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

// Liczba: opcjonalny minus na początku, cyfry i jeden separator (przecinek lub kropka).
const NUMBER_PATTERN = /^-?\d*[.,]?\d*$/

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
  captionColor,
  respectLabelGap,
  respectCaptionGap,
}: FieldInputProps) {
  const { control, slot } = fieldSizes[size]

  // type="number" nie przyjmuje przecinka w części przeglądarek i nie zawsze respektuje inputMode,
  // więc liczba to tekst z inputMode decimal: na telefonie klawiatura numeryczna z przecinkiem.
  const isNumber = type === 'number'

  // Zmiana, która nie jest liczbą, nie trafia do stanu, więc kontrolowane pole zostaje bez zmian.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isNumber && !NUMBER_PATTERN.test(event.target.value)) return
    onChange(event)
  }

  return (
    <FieldFrame
      id={id}
      label={label}
      caption={caption}
      captionColor={captionColor}
      respectLabelGap={respectLabelGap}
      respectCaptionGap={respectCaptionGap}
    >
      {/* TODO: dodaj aria-invalid, aria-describedby (powiązanie z caption przez `${id}-caption`) i aria-label, gdy nie ma labela */}
      <div className={fieldWrapperClasses}>
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
            paddingLeft: fieldSidePadding(size, startIcon, startIconColorBackground),
            paddingRight: fieldSidePadding(size, endIcon, endIconColorBackground),
          }}
          className={`${fieldControlClasses} ${control}`}
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
    </FieldFrame>
  )
}
