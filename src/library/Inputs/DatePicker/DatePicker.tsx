import { Calendar } from 'lucide-react'
import { useState } from 'react'
import {
  elementColorVars,
  elementIdleClasses,
  elementSelectedClasses,
  type ElementColorProps,
} from '../fieldStyles'
import { PopoverField, type PopoverFieldProps } from '../PopoverField'
import { SelectInput } from '../SelectInput/SelectInput'

type DatePickerProps = PopoverFieldProps &
  ElementColorProps & {
    /** Data w formacie RRRR-MM-DD. Pusta pokazuje placeholder, a kalendarz otwiera się na bieżącym miesiącu. */
    value: string
    onChange: (value: string) => void
  }

const MONTHS = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
]
const MONTH_ELEMENTS = MONTHS.map((name, index) => ({ name, value: String(index) }))
const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd']

// Siedem kolumn dni po ok. 40 px, niezależnie od szerokości pola.
const PANEL_MIN_WIDTH = 320

// TODO: dodaj do DatePicker props z zakresem dat (np. minDate, maxDate). Na razie lata od -100 do +10 od bieżącego.
const YEARS_BACK = 100
const YEARS_AHEAD = 10

const pad = (n: number) => String(n).padStart(2, '0')
const toIsoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** Data lokalna z RRRR-MM-DD (new Date("RRRR-MM-DD") liczyłby ją w UTC). */
function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null
}

/** Pełne tygodnie od poniedziałku do niedzieli, razem z dniami sąsiednich miesięcy. */
function calendarDays(year: number, month: number): Date[] {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const count = Math.ceil((offset + daysInMonth) / 7) * 7
  return Array.from({ length: count }, (_, i) => new Date(year, month, 1 - offset + i))
}

const dayClasses = 'flex h-10 items-center justify-center rounded-[10px] transition-colors'

export function DatePicker(props: DatePickerProps) {
  const { id, value, onChange, colorElementHover, colorBackgroundElementHover, colorElement, colorBackgroundElement } =
    props
  const colors = { colorElementHover, colorBackgroundElementHover, colorElement, colorBackgroundElement }

  const selected = parseDate(value)
  const today = new Date()
  // Miesiąc widoczny w kalendarzu. Po zamknięciu wraca do miesiąca wybranej daty (bez niej: bieżącego).
  const [view, setView] = useState<{ year: number; month: number } | null>(null)
  const year = view?.year ?? (selected ?? today).getFullYear()
  const month = view?.month ?? (selected ?? today).getMonth()

  const firstYear = Math.min(today.getFullYear() - YEARS_BACK, year)
  const lastYear = Math.max(today.getFullYear() + YEARS_AHEAD, year)
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
    const y = String(firstYear + i)
    return { name: y, value: y }
  })

  const text = selected ? `${pad(selected.getDate())}.${pad(selected.getMonth() + 1)}.${selected.getFullYear()}` : ''

  return (
    <PopoverField
      field={props}
      text={text}
      endIcon={() => <Calendar size={18} aria-hidden />}
      panelClassName="p-3"
      panelStyle={elementColorVars(props)}
      panelMinWidth={PANEL_MIN_WIDTH}
      onToggle={(open) => !open && setView(null)}
    >
      {(close) => (
        <div>
          {/* TODO: dodaj aria-label dla wyboru roku i miesiąca */}
          <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2">
            <SelectInput
              id={`${id}-year`}
              size="sm"
              elements={years}
              value={String(year)}
              onChange={(y) => setView({ year: Number(y), month })}
              {...colors}
            />
            <SelectInput
              id={`${id}-month`}
              size="sm"
              elements={MONTH_ELEMENTS}
              value={String(month)}
              onChange={(m) => setView({ year, month: Number(m) })}
              {...colors}
            />
          </div>
          {/* TODO: dodaj role="grid", aria-selected i nawigację strzałkami po dniach */}
          <div className="mt-3 grid grid-cols-7 gap-1 text-sm">
            {WEEKDAYS.map((day) => (
              <span key={day} className="flex h-7 items-center justify-center text-xs font-medium text-brand-text-tertiary">
                {day}
              </span>
            ))}
            {calendarDays(year, month).map((date) => {
              const iso = toIsoDate(date)
              // Dni spoza wybranego miesiąca są wyszarzone i nie da się ich wybrać.
              if (date.getMonth() !== month) {
                return (
                  <button key={iso} type="button" disabled className={`${dayClasses} text-brand-text-tertiary opacity-50`}>
                    {date.getDate()}
                  </button>
                )
              }
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => {
                    onChange(iso)
                    close()
                  }}
                  className={`${dayClasses} cursor-pointer ${iso === value ? elementSelectedClasses : elementIdleClasses}`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </PopoverField>
  )
}
