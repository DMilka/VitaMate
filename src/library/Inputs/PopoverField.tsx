import { useCallback, useEffect, useRef, useState, type MouseEventHandler, type ReactNode } from 'react'
import type { BrandColor } from '../colors'
import { FieldFrame, IconSlot } from './FieldParts'
import {
  elementColorVars,
  fieldControlClasses,
  fieldPanelClasses,
  fieldSidePadding,
  fieldSizes,
  fieldWrapperClasses,
  slotEnd,
  slotStart,
  type FieldSize,
} from './fieldStyles'
import { useInputDecoration } from './InputDecorator/inputDecoration'

/** Propsy wspólne dla pól z panelem pod spodem (SelectInput, DatePicker, TimePicker). */
export type PopoverFieldProps = {
  id: string
  label?: string
  /** Wysokość samego pola (bez labela i caption), jak w Button. Domyślnie md. */
  size?: FieldSize
  /** Tekst w polu, gdy nic nie jest wybrane. */
  placeholder?: string
  /** Ikona wewnątrz pola przed tekstem (np. lucide z size={18}). Kolory ikon ustawia InputDecorator. */
  startIcon?: ReactNode
  /** Bez callbacku klik w ikonę otwiera panel. */
  startIconCallback?: MouseEventHandler<HTMLButtonElement>
  /** Tekst pod polem: podpowiedź, błąd, ostrzeżenie itp. */
  caption?: string
  /** Kolor caption, np. brand-error dla błędu. Domyślnie brand-text-secondary. */
  captionColor?: BrandColor
  /** Bez labela (caption) zostaw puste miejsce o jego wysokości, żeby pola w rzędzie były wyrównane. */
  respectLabelGap?: boolean
  respectCaptionGap?: boolean
}

type PopoverFieldInnerProps = {
  field: PopoverFieldProps
  /** Tekst w polu. Pusty pokazuje placeholder. */
  text: string
  /** Ikona po prawej, np. strzałka obracana przy otwartym panelu. */
  endIcon: (open: boolean) => ReactNode
  panelClassName: string
  /** Bez niej panel ma szerokość pola. */
  panelMinWidth?: number
  onToggle?: (open: boolean, panel: HTMLDivElement) => void
  /** Zawartość panelu. close zamyka panel. */
  children: (close: () => void) => ReactNode
}

const PANEL_GAP = 4
const VIEWPORT_MARGIN = 8

/** Popover leży w górnej warstwie, więc pozycję pod polem liczymy względem okna. Szerszy od pola panel nie wychodzi za prawą krawędź. */
function placePanel(trigger: HTMLElement, panel: HTMLElement, minWidth = 0) {
  const rect = trigger.getBoundingClientRect()
  const width = Math.max(rect.width, minWidth)
  const left = Math.max(VIEWPORT_MARGIN, Math.min(rect.left, window.innerWidth - VIEWPORT_MARGIN - width))
  panel.style.left = `${left}px`
  panel.style.width = `${width}px`
  panel.style.top = `${rect.bottom + PANEL_GAP}px`
}

/** Pole-przycisk z panelem (popover) pod spodem: podstawa SelectInput, DatePicker i TimePicker. */
export function PopoverField({
  field,
  text,
  endIcon,
  panelClassName,
  panelMinWidth,
  onToggle,
  children,
}: PopoverFieldInnerProps) {
  const {
    id,
    label,
    size = 'md',
    placeholder,
    startIcon,
    startIconCallback,
    caption,
    captionColor,
    respectLabelGap,
    respectCaptionGap,
  } = field
  const decoration = useInputDecoration()
  const { control, slot } = fieldSizes[size]
  const panelId = `${id}-panel`

  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const place = useCallback(() => {
    if (triggerRef.current && panelRef.current) placePanel(triggerRef.current, panelRef.current, panelMinWidth)
  }, [panelMinWidth])

  // Otwarty panel idzie za polem przy scrollu (także w przewijanych kontenerach) i zmianie rozmiaru okna.
  useEffect(() => {
    if (!open) return
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  // Po id, nie przez ref: close trafia do children wywoływanego w renderze, a ref wolno czytać tylko w handlerach.
  const close = () => document.getElementById(panelId)?.hidePopover()

  return (
    <FieldFrame
      id={id}
      label={label}
      caption={caption}
      captionColor={captionColor}
      respectLabelGap={respectLabelGap}
      respectCaptionGap={respectCaptionGap}
    >
      {/* TODO: dodaj aria-expanded, aria-haspopup, aria-controls oraz aria-invalid, aria-describedby (caption) i aria-label, gdy nie ma labela */}
      <div className={fieldWrapperClasses}>
        {startIcon && (
          <IconSlot
            icon={startIcon}
            className={`${slot} ${slotStart}`}
            color={decoration.startIconColor}
            colorBackground={decoration.startIconColorBackground}
            callback={startIconCallback}
          />
        )}
        <button
          ref={triggerRef}
          type="button"
          id={id}
          popoverTarget={panelId}
          style={{
            paddingLeft: fieldSidePadding(size, startIcon, decoration.startIconColorBackground),
            paddingRight: fieldSidePadding(size, true, decoration.endIconColorBackground),
          }}
          className={`${fieldControlClasses} ${control} cursor-pointer text-left`}
        >
          <span className={`block truncate ${text ? '' : 'text-brand-text-tertiary'}`}>{text || placeholder}</span>
        </button>
        <IconSlot
          icon={endIcon(open)}
          className={`${slot} ${slotEnd}`}
          color={decoration.endIconColor}
          colorBackground={decoration.endIconColorBackground}
        />
        <div
          ref={panelRef}
          id={panelId}
          popover="auto"
          // W React toggle z zagnieżdżonego panelu (np. lista roku w DatePicker) dochodzi też tutaj, więc reagujemy tylko na własny.
          onBeforeToggle={(event) => event.target === event.currentTarget && event.newState === 'open' && place()}
          onToggle={(event) => {
            if (event.target !== event.currentTarget) return
            const isOpen = event.newState === 'open'
            setOpen(isOpen)
            onToggle?.(isOpen, event.currentTarget)
          }}
          style={elementColorVars(decoration)}
          className={`${fieldPanelClasses} ${panelClassName}`}
        >
          {children(close)}
        </div>
      </div>
    </FieldFrame>
  )
}
