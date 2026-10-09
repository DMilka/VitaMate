import { Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatNumber, parseNumber } from '../../../lib/format'
import { DAYS, totalSets, totalVolume } from '../../../lib/training'
import type { Category, DayKey, Exercise, PlanEntry } from '../../../lib/types'
import { Button } from '../../../library/Buttons/Button/Button'
import { Badge } from '../../ui/Badge'
import { Field } from '../../ui/Field'
import { fieldA11y, inputClasses, selectClasses } from '../../ui/styles'

type PlanPanelProps = {
  plan: PlanEntry[]
  exercises: Exercise[]
  categories: Category[]
  day: DayKey
  onSelectDay: (day: DayKey) => void
  onAddEntry: (entry: Omit<PlanEntry, 'id'>) => void
  onRemoveEntry: (id: string) => void
}

export function PlanPanel({ plan, exercises, categories, day, onSelectDay, onAddEntry, onRemoveEntry }: PlanPanelProps) {
  const exercisesById = new Map(exercises.map((e) => [e.id, e]))
  const categoriesById = new Map(categories.map((c) => [c.id, c]))
  const entries = plan.filter((entry) => entry.day === day)
  const dayLabel = DAYS.find((d) => d.key === day)?.label ?? ''

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-7 gap-1.5" role="group" aria-label="Dzień tygodnia">
        {DAYS.map((d) => {
          const selected = d.key === day
          const hasTraining = plan.some((entry) => entry.day === d.key)
          return (
            <button
              key={d.key}
              type="button"
              aria-pressed={selected}
              aria-label={`${d.label}${hasTraining ? ', zaplanowany trening' : ''}`}
              onClick={() => onSelectDay(d.key)}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-sm font-medium transition-colors ${
                selected
                  ? 'bg-brand-primary text-brand-text-button'
                  : 'bg-brand-bg-primary text-brand-text-primary hover:bg-brand-text-primary/5'
              }`}
            >
              {d.short}
              <span
                aria-hidden
                className={`size-1.5 rounded-full ${hasTraining ? (selected ? 'bg-brand-text-button' : 'bg-brand-accent-one') : 'bg-transparent'}`}
              />
            </button>
          )
        })}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-semibold">{dayLabel}</h3>
          <p className="flex gap-4 text-sm text-brand-text-secondary">
            <span>
              Serie: <strong className="font-medium text-brand-text-primary">{totalSets(entries)}</strong>
            </span>
            <span>
              Objętość:{' '}
              <strong className="font-medium text-brand-text-primary">{formatNumber(totalVolume(entries))} kg</strong>
            </span>
          </p>
        </div>

        {entries.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-brand-text-tertiary/50 p-6 text-center text-sm text-brand-text-secondary">
            Dzień bez treningu. Dodaj ćwiczenie w formularzu poniżej.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {entries.map((entry) => {
              const exercise = exercisesById.get(entry.exerciseId)
              const category = exercise && categoriesById.get(exercise.categoryId)
              if (!exercise) return null
              return (
                <li
                  key={entry.id}
                  className="flex items-center gap-3 rounded-2xl border border-brand-text-tertiary/25 py-2.5 pr-2 pl-4 motion-safe:animate-pop-in"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-brand-text-primary">{exercise.name}</p>
                    {category && (
                      <div className="mt-1">
                        <Badge accent={category.accent}>{category.name}</Badge>
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display font-semibold text-brand-text-primary">
                      {entry.sets} × {entry.reps}
                    </p>
                    <p className="text-xs text-brand-text-secondary">
                      {entry.weight > 0 ? `${formatNumber(entry.weight)} kg` : 'masa ciała'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveEntry(entry.id)}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-brand-text-secondary transition-colors hover:bg-brand-error/15 hover:text-brand-error"
                    aria-label={`Usuń ${exercise.name} z planu`}
                  >
                    <Trash2 size={15} aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <AddEntryForm day={day} dayLabel={dayLabel} exercises={exercises} categories={categories} onAdd={onAddEntry} />
    </div>
  )
}

type AddEntryFormProps = {
  day: DayKey
  dayLabel: string
  exercises: Exercise[]
  categories: Category[]
  onAdd: (entry: Omit<PlanEntry, 'id'>) => void
}

type EntryErrors = { sets?: string; reps?: string; weight?: string }

function AddEntryForm({ day, dayLabel, exercises, categories, onAdd }: AddEntryFormProps) {
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id ?? '')
  const [sets, setSets] = useState('3')
  const [reps, setReps] = useState('10')
  const [weight, setWeight] = useState('')
  const [errors, setErrors] = useState<EntryErrors>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const parsedSets = parseNumber(sets)
    const parsedReps = parseNumber(reps)
    const parsedWeight = weight.trim() === '' ? 0 : parseNumber(weight)
    const nextErrors: EntryErrors = {
      sets: parsedSets !== null && Number.isInteger(parsedSets) && parsedSets >= 1 && parsedSets <= 20 ? undefined : 'Od 1 do 20.',
      reps: parsedReps !== null && Number.isInteger(parsedReps) && parsedReps >= 1 && parsedReps <= 100 ? undefined : 'Od 1 do 100.',
      weight: parsedWeight !== null && parsedWeight >= 0 ? undefined : 'Liczba 0 lub większa.',
    }
    setErrors(nextErrors)
    if (nextErrors.sets || nextErrors.reps || nextErrors.weight) return
    onAdd({ exerciseId, day, sets: parsedSets!, reps: parsedReps!, weight: parsedWeight! })
  }

  const numberField = (id: string, label: string, value: string, set: (v: string) => void, key: keyof EntryErrors, placeholder?: string) => (
    <Field id={id} label={label} error={errors[key]}>
      <input
        {...fieldA11y(id, errors[key])}
        className={inputClasses}
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          set(e.target.value)
          setErrors((v) => ({ ...v, [key]: undefined }))
        }}
      />
    </Field>
  )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-primary/60 p-4"
    >
      <p className="text-sm font-medium text-brand-text-primary">Dodaj ćwiczenie: {dayLabel.toLocaleLowerCase('pl')}</p>
      <Field id="entry-exercise" label="Ćwiczenie">
        <select
          id="entry-exercise"
          className={selectClasses}
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
        >
          {categories.map((category) => {
            const inCategory = exercises.filter((e) => e.categoryId === category.id)
            if (inCategory.length === 0) return null
            return (
              <optgroup key={category.id} label={category.name}>
                {inCategory.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>
      </Field>
      <div className="grid grid-cols-3 gap-3">
        {numberField('entry-sets', 'Serie', sets, setSets, 'sets')}
        {numberField('entry-reps', 'Powtórzenia', reps, setReps, 'reps')}
        {numberField('entry-weight', 'Ciężar (kg)', weight, setWeight, 'weight', '0')}
      </div>
      <p className="-mt-2 text-xs text-brand-text-secondary">Puste pole ciężaru oznacza ćwiczenie z masą ciała.</p>
      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Dodaj do planu"
          startIcon={<Plus size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-secondary"
        />
      </div>
    </form>
  )
}
