import { ChevronDown } from 'lucide-react'
import {
  elementColorVars,
  elementIdleClasses,
  elementSelectedClasses,
  type ElementColorProps,
} from '../fieldStyles'
import { PopoverField, type PopoverFieldProps } from '../PopoverField'

export type SelectElement = { name: string; value: string }

type SelectInputBaseProps = PopoverFieldProps &
  ElementColorProps & {
    /** name wyświetla się na liście, value trafia do onChange. */
    elements: SelectElement[]
  }

/** Bez multiple wybór zamyka listę. Z multiple klik przełącza opcję, a lista zostaje otwarta. */
type SelectInputProps = SelectInputBaseProps &
  (
    | { multiple?: false; value: string; onChange: (value: string) => void }
    | { multiple: true; value: string[]; onChange: (value: string[]) => void }
  )

// space-y-1 zamiast flex gap, bo display na popoverze nadpisałby jego ukrywanie.
const listClasses = 'max-h-64 space-y-1 overflow-y-auto p-1.5'

const optionClasses = 'flex min-h-11 w-full cursor-pointer items-center rounded-[10px] px-3 py-2 text-left text-sm transition-colors'

/** Przy otwarciu lista przewija się do zaznaczonej opcji (długie listy, np. lata w DatePicker). */
function scrollToSelected(open: boolean, list: HTMLDivElement) {
  const option = open ? list.querySelector<HTMLElement>('[data-selected]') : null
  if (option) list.scrollTop = option.offsetTop - (list.clientHeight - option.offsetHeight) / 2
}

export function SelectInput(props: SelectInputProps) {
  const { elements } = props

  const selected = props.multiple ? props.value : props.value ? [props.value] : []
  const shown = elements
    .filter((element) => selected.includes(element.value))
    .map((element) => element.name)
    .join(', ')

  function pick(value: string, close: () => void) {
    if (props.multiple) {
      // Wybrane wartości zawsze w kolejności elements.
      const next = elements
        .map((element) => element.value)
        .filter((v) => (v === value ? !selected.includes(v) : selected.includes(v)))
      props.onChange(next)
      return
    }
    props.onChange(value)
    close()
  }

  return (
    // TODO: dodaj role="listbox"/"option", aria-selected i nawigację strzałkami
    <PopoverField
      field={props}
      text={shown}
      endIcon={(open) => (
        <ChevronDown size={18} aria-hidden className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      )}
      panelClassName={listClasses}
      panelStyle={elementColorVars(props)}
      onToggle={scrollToSelected}
    >
      {(close) =>
        elements.map((element) => {
          const isSelected = selected.includes(element.value)
          return (
            <button
              key={element.value}
              type="button"
              data-selected={isSelected || undefined}
              onClick={() => pick(element.value, close)}
              className={`${optionClasses} ${isSelected ? elementSelectedClasses : elementIdleClasses}`}
            >
              {element.name}
            </button>
          )
        })
      }
    </PopoverField>
  )
}
