import { Dumbbell, Plus, Tags } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { accentSoft } from '../../../lib/accents'
import { createId } from '../../../lib/id'
import type { Category, Exercise } from '../../../lib/types'
import { Button } from '../../../library/Buttons/Button/Button'
import { Typography } from '../../../library/Typography/Typography'
import { Badge } from '../../ui/Badge'
import { Disclosure } from '../../ui/Disclosure'
import { Field } from '../../ui/Field'
import { fieldA11y, inputClasses, selectClasses } from '../../ui/styles'
import { CategoryForm } from '../CategoryForm'

type ExercisesPanelProps = {
  exercises: Exercise[]
  categories: Category[]
  onAddExercise: (exercise: Exercise) => void
  onAddCategory: (category: Category) => void
}

export function ExercisesPanel({ exercises, categories, onAddExercise, onAddCategory }: ExercisesPanelProps) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => {
          const inCategory = exercises.filter((e) => e.categoryId === category.id)
          return (
            <section
              key={category.id}
              aria-label={category.name}
              className="rounded-2xl border border-brand-text-tertiary/25 p-4 motion-safe:animate-pop-in"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge accent={category.accent}>{category.name}</Badge>
                <Typography variant="caption" component="span" color="brand-text-secondary">
                  {String(inCategory.length)}
                </Typography>
              </div>
              {inCategory.length === 0 ? (
                <div className="mt-3">
                  <Typography variant="small" color="brand-text-secondary">
                    Brak ćwiczeń w tej kategorii.
                  </Typography>
                </div>
              ) : (
                <ul className="mt-3 grid gap-2">
                  {inCategory.map((exercise) => (
                    <li key={exercise.id} className="flex items-center gap-2.5 text-sm text-brand-text-primary">
                      <span
                        className={`inline-flex size-7 shrink-0 items-center justify-center rounded-lg ${accentSoft[category.accent]}`}
                      >
                        <Dumbbell size={14} aria-hidden />
                      </span>
                      <span className="min-w-0 truncate">{exercise.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>

      <div className="grid gap-3">
        <Disclosure title="Dodaj ćwiczenie" icon={Dumbbell}>
          <ExerciseForm exercises={exercises} categories={categories} onAdd={onAddExercise} />
        </Disclosure>
        <Disclosure title="Dodaj kategorię ćwiczeń" icon={Tags}>
          <CategoryForm idPrefix="training" placeholder="Mobilność" existing={categories} onAdd={onAddCategory} />
        </Disclosure>
      </div>
    </div>
  )
}

type ExerciseFormProps = {
  exercises: Exercise[]
  categories: Category[]
  onAdd: (exercise: Exercise) => void
}

function ExerciseForm({ exercises, categories, onAdd }: ExerciseFormProps) {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [error, setError] = useState<string>()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return setError('Wpisz nazwę ćwiczenia.')
    if (exercises.some((e) => e.name.toLocaleLowerCase('pl') === trimmed.toLocaleLowerCase('pl'))) {
      return setError('To ćwiczenie już jest w bibliotece.')
    }
    onAdd({ id: createId('cwiczenie'), name: trimmed, categoryId })
    setName('')
    setError(undefined)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="exercise-name" label="Nazwa ćwiczenia" error={error}>
          <input
            {...fieldA11y('exercise-name', error)}
            className={inputClasses}
            value={name}
            placeholder="Wykroki z hantlami"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value)
              setError(undefined)
            }}
          />
        </Field>
        <Field id="exercise-category" label="Kategoria">
          <select
            id="exercise-category"
            className={selectClasses}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Dodaj ćwiczenie"
          startIcon={<Plus size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-secondary"
        />
      </div>
    </form>
  )
}
