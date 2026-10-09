import { Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ACCENTS, accentNames, accentSoft, accentSolid } from '../../lib/accents'
import { createId } from '../../lib/id'
import type { Accent, Category } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { Field } from '../ui/Field'
import { buttonClasses, fieldA11y, inputClasses } from '../ui/styles'

type CategoryFormProps = {
  idPrefix: string
  placeholder: string
  existing: Category[]
  onAdd: (category: Category) => void
}

export function CategoryForm({ idPrefix, placeholder, existing, onAdd }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [accent, setAccent] = useState<Accent>('one')
  const [error, setError] = useState<string>()
  const nameId = `${idPrefix}-category-name`

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return setError('Wpisz nazwę kategorii.')
    if (existing.some((c) => c.name.toLocaleLowerCase('pl') === trimmed.toLocaleLowerCase('pl'))) {
      return setError('Taka kategoria już istnieje.')
    }
    onAdd({ id: createId('kategoria'), name: trimmed, accent })
    setName('')
    setError(undefined)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <Field id={nameId} label="Nazwa kategorii" error={error}>
        <input
          {...fieldA11y(nameId, error)}
          className={inputClasses}
          value={name}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setName(e.target.value)
            setError(undefined)
          }}
        />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-brand-text-primary">Kolor kategorii</legend>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {ACCENTS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name={`${idPrefix}-accent`}
                value={option}
                checked={accent === option}
                onChange={() => setAccent(option)}
                className="peer sr-only"
              />
              <span
                className={`flex size-11 items-center justify-center rounded-full ring-brand-primary ring-offset-2 ring-offset-brand-bg-tertiary transition-shadow peer-checked:ring-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand-primary ${accentSoft[option]}`}
              >
                <span className={`size-4 rounded-full ${accentSolid[option]}`} />
              </span>
              <span className="sr-only">{accentNames[option]}</span>
            </label>
          ))}
          <span className="ml-1 text-xs text-brand-text-secondary">
            Podgląd: <Badge accent={accent}>{name.trim() || placeholder}</Badge>
          </span>
        </div>
      </fieldset>

      <button type="submit" className={buttonClasses('secondary', 'w-full sm:w-fit')}>
        <Plus size={16} aria-hidden />
        Dodaj kategorię
      </button>
    </form>
  )
}
