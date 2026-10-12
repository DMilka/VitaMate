import { ChevronDown, ChevronUp, Clock } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import {
  elementColorVars,
  elementHoverClasses,
  elementSelectedClasses,
  type ElementColorProps,
} from '../fieldStyles'
import { PopoverField, type PopoverFieldProps } from '../PopoverField'

type TimePickerProps = PopoverFieldProps &
  ElementColorProps & {
    /** Godzina w formacie GG:MM (zegar 24 h). Pusta pokazuje placeholder, a suwaki startują od 00:00. */
    value: string
    onChange: (value: string) => void
  }

const pad = (n: number) => String(n).padStart(2, '0')

function parseTime(value: string): [number, number] {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  return match ? [Number(match[1]) % 24, Number(match[2]) % 60] : [0, 0]
}

export function TimePicker(props: TimePickerProps) {
  const { value, onChange } = props
  const [hours, minutes] = parseTime(value)

  // Panel ma szerokość pola, więc kolumny się zwężają (do 4rem), żeby zmieścić się nawet w polu 9rem.
  return (
    <PopoverField
      field={props}
      text={value}
      endIcon={() => <Clock size={18} aria-hidden />}
      panelClassName="p-2"
      panelStyle={elementColorVars(props)}
    >
      {() => (
        <div className="grid grid-cols-[minmax(0,4rem)_auto_minmax(0,4rem)] items-center justify-center gap-0.5 font-brand-font-secondary tabular-nums">
          <TimeWheel count={24} value={hours} onChange={(h) => onChange(`${pad(h)}:${pad(minutes)}`)} />
          <span className="text-lg font-semibold text-brand-text-secondary">:</span>
          <TimeWheel count={60} value={minutes} onChange={(m) => onChange(`${pad(hours)}:${pad(m)}`)} />
        </div>
      )}
    </PopoverField>
  )
}

type TimeWheelProps = {
  /** Liczba wartości w kółku: 24 dla godzin, 60 dla minut. Po ostatniej wraca pierwsza. */
  count: number
  value: number
  onChange: (value: number) => void
}

// Nad wybraną wartością są wyższe, pod nią niższe. Każda dalsza jest mniejsza, a druga od środka rozmyta.
const OFFSETS = [2, 1, 0, -1, -2]
const neighbourClasses: Record<number, string> = {
  1: 'h-7 text-sm text-brand-text-secondary',
  2: 'h-5 text-xs text-brand-text-tertiary blur-[1px]',
}

// Rogi pastylki: rounded-2xl panelu minus p-2.
const stepClasses = 'flex w-full cursor-pointer items-center justify-center rounded-lg transition-colors'

// Kółko myszy i touchpad: jeden krok co tyle pikseli przewinięcia.
const WHEEL_STEP = 40
// Przeciąganie: jeden krok co tyle pikseli. Krótszy ruch to zwykły klik w strzałkę lub wartość.
const DRAG_STEP = 24
const DRAG_THRESHOLD = 4

/**
 * Kolumna z wybraną wartością na środku. Zmiana: strzałki, klik w sąsiednią wartość,
 * przeciąganie palcem lub myszą, kółko myszy, strzałki na klawiaturze.
 */
function TimeWheel({ count, value, onChange }: TimeWheelProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Zdarzenia kółka i przeciągania przychodzą szybciej niż render, więc liczymy od ostatnio wysłanej wartości.
  const latest = useRef(value)
  const wheelDelta = useRef(0)
  const drag = useRef({ pressed: false, active: false, dragged: false, lastY: 0, startY: 0, delta: 0 })

  useEffect(() => {
    latest.current = value
  }, [value])

  const shift = useCallback(
    (delta: number) => {
      const next = (((latest.current + delta) % count) + count) % count
      latest.current = next
      onChange(next)
    },
    [count, onChange],
  )

  // Natywny listener, bo React podpina wheel jako pasywny i nie da się zablokować scrolla strony.
  useEffect(() => {
    const wheel = ref.current
    if (!wheel) return
    function handleWheel(event: WheelEvent) {
      event.preventDefault()
      wheelDelta.current += event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 16 : event.deltaY
      const steps = Math.trunc(wheelDelta.current / WHEEL_STEP)
      if (steps === 0) return
      wheelDelta.current -= steps * WHEEL_STEP
      // Przewijanie w dół pokazuje niższe wartości, bo leżą pod wybraną.
      shift(-steps)
    }
    wheel.addEventListener('wheel', handleWheel, { passive: false })
    return () => wheel.removeEventListener('wheel', handleWheel)
  }, [shift])

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { pressed: true, active: false, dragged: false, lastY: event.clientY, startY: event.clientY, delta: 0 }
  }

  // Ruch w dół wsuwa na środek wyższe wartości (są nad wybraną), ruch w górę niższe.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current
    if (!state.pressed) return
    if (!state.active) {
      if (Math.abs(event.clientY - state.startY) < DRAG_THRESHOLD) return
      // Przechwycenie dopiero po ruchu, żeby zwykły klik nadal trafiał w strzałkę lub wartość.
      state.active = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    state.delta += event.clientY - state.lastY
    state.lastY = event.clientY
    const steps = Math.trunc(state.delta / DRAG_STEP)
    if (steps === 0) return
    state.delta -= steps * DRAG_STEP
    shift(steps)
  }

  function handlePointerEnd() {
    drag.current.dragged = drag.current.active
    drag.current.pressed = false
    drag.current.active = false
  }

  // Puszczenie po przeciągnięciu nad strzałką lub wartością nie może jej jeszcze kliknąć.
  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!drag.current.dragged) return
    drag.current.dragged = false
    event.stopPropagation()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    event.preventDefault()
    shift(event.key === 'ArrowUp' ? 1 : -1)
  }

  return (
    // TODO: dodaj role="spinbutton", aria-valuenow, aria-valuemin, aria-valuemax i aria-label ("Godziny", "Minuty")
    // touch-none: przeciąganie palcem przesuwa wartości zamiast przewijać stronę.
    <div
      ref={ref}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={handleClickCapture}
      className="flex min-w-0 touch-none flex-col items-center rounded-lg select-none"
    >
      <button type="button" tabIndex={-1} onClick={() => shift(1)} className={`h-6 ${stepClasses} text-brand-text-tertiary ${elementHoverClasses}`}>
        <ChevronUp size={16} aria-hidden />
      </button>
      {OFFSETS.map((offset) => {
        const shown = pad((((value + offset) % count) + count) % count)
        if (offset === 0) {
          return (
            <span
              key={offset}
              className={`flex h-9 w-full items-center justify-center rounded-lg text-lg font-semibold ${elementSelectedClasses}`}
            >
              {shown}
            </span>
          )
        }
        return (
          <button
            key={offset}
            type="button"
            tabIndex={-1}
            onClick={() => shift(offset)}
            className={`${stepClasses} ${neighbourClasses[Math.abs(offset)]} ${elementHoverClasses}`}
          >
            {shown}
          </button>
        )
      })}
      <button type="button" tabIndex={-1} onClick={() => shift(-1)} className={`h-6 ${stepClasses} text-brand-text-tertiary ${elementHoverClasses}`}>
        <ChevronDown size={16} aria-hidden />
      </button>
    </div>
  )
}
