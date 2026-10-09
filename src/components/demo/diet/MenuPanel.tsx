import { Clock, Plus, Trash2, UtensilsCrossed } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatAmount, formatNumber, parseNumber } from '../../../lib/format'
import { energySplit, macrosFor, mealMacros, sumMacros, type Macros } from '../../../lib/nutrition'
import type { Category, Meal, Product } from '../../../lib/types'
import { Button } from '../../../library/Buttons/Button/Button'
import { Disclosure } from '../../ui/Disclosure'
import { Field } from '../../ui/Field'
import { fieldA11y, inputClasses, selectClasses } from '../../ui/styles'

type MenuPanelProps = {
  meals: Meal[]
  products: Product[]
  categories: Category[]
  onAddItem: (mealId: string, productId: string, amount: number) => void
  onRemoveItem: (mealId: string, itemId: string) => void
  onAddMeal: (name: string, time: string) => void
}

export function MenuPanel({ meals, products, categories, onAddItem, onRemoveItem, onAddMeal }: MenuPanelProps) {
  const productsById = new Map(products.map((p) => [p.id, p]))
  const sortedMeals = [...meals].sort((a, b) => a.time.localeCompare(b.time))
  const dayTotal = sumMacros(meals.map((meal) => mealMacros(meal, productsById)))

  return (
    <div className="grid gap-5">
      <DaySummary total={dayTotal} />

      <ol className="grid gap-3">
        {sortedMeals.map((meal) => {
          const total = mealMacros(meal, productsById)
          return (
            <li key={meal.id} className="rounded-2xl border border-brand-text-tertiary/25 p-4 motion-safe:animate-pop-in">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 text-base font-semibold">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-text-secondary">
                    <Clock size={14} aria-hidden />
                    {meal.time}
                  </span>
                  <span className="truncate">{meal.name}</span>
                </h3>
                <span className="shrink-0 text-sm font-medium whitespace-nowrap text-brand-text-primary">
                  {formatNumber(Math.round(total.kcal))} kcal
                </span>
              </div>

              {meal.items.length === 0 ? (
                <p className="mt-2 text-sm text-brand-text-secondary">Brak produktów. Dodaj pierwszy w formularzu poniżej.</p>
              ) : (
                <ul className="mt-2 grid gap-1">
                  {meal.items.map((item) => {
                    const product = productsById.get(item.productId)
                    if (!product) return null
                    return (
                      <li key={item.id} className="flex items-center gap-3 text-sm motion-safe:animate-pop-in">
                        <span className="min-w-0 flex-1 truncate text-brand-text-primary">{product.name}</span>
                        <span className="shrink-0 whitespace-nowrap text-brand-text-secondary">{formatAmount(item.amount, product.measure)}</span>
                        <span className="min-w-[4.5rem] shrink-0 text-right whitespace-nowrap text-brand-text-secondary">
                          {formatNumber(Math.round(macrosFor(product, item.amount).kcal))} kcal
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(meal.id, item.id)}
                          className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-brand-text-secondary transition-colors hover:bg-brand-error/15 hover:text-brand-error"
                          aria-label={`Usuń ${product.name} z posiłku ${meal.name}`}
                        >
                          <Trash2 size={15} aria-hidden />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ol>

      <AddItemForm meals={sortedMeals} products={products} categories={categories} onAdd={onAddItem} />

      <Disclosure title="Nowy posiłek" icon={UtensilsCrossed}>
        <AddMealForm onAdd={onAddMeal} />
      </Disclosure>
    </div>
  )
}

const MACRO_PARTS = [
  { key: 'protein', label: 'Białko', bar: 'bg-brand-accent-four' },
  { key: 'fat', label: 'Tłuszcze', bar: 'bg-brand-accent-two' },
  { key: 'carbs', label: 'Węglowodany', bar: 'bg-brand-accent-one' },
] as const

function DaySummary({ total }: { total: Macros }) {
  const split = energySplit(total)
  return (
    <div className="rounded-2xl bg-brand-bg-secondary p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm text-brand-text-secondary">Poniedziałek, suma dnia</p>
          <p className="font-display text-3xl font-semibold text-brand-primary">
            {formatNumber(Math.round(total.kcal))} <span className="text-lg font-medium">kcal</span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full" aria-hidden>
        {MACRO_PARTS.map(({ key, bar }) => (
          <span key={key} className={`${bar} transition-[width] duration-500`} style={{ width: `${split[key] * 100}%` }} />
        ))}
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {MACRO_PARTS.map(({ key, label, bar }) => (
          <div key={key}>
            <dt className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
              <span className={`size-2 rounded-full ${bar}`} aria-hidden />
              {label}
            </dt>
            <dd className="font-medium text-brand-text-primary">{formatNumber(Math.round(total[key]))} g</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

type AddItemFormProps = {
  meals: Meal[]
  products: Product[]
  categories: Category[]
  onAdd: (mealId: string, productId: string, amount: number) => void
}

function AddItemForm({ meals, products, categories, onAdd }: AddItemFormProps) {
  const [mealId, setMealId] = useState(meals[0]?.id ?? '')
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string>()

  const product = products.find((p) => p.id === productId)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const parsed = parseNumber(amount)
    if (parsed === null || parsed <= 0) return setError('Wpisz ilość większą od zera.')
    onAdd(mealId, productId, parsed)
    setAmount('')
    setError(undefined)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-primary/60 p-4"
    >
      <p className="text-sm font-medium text-brand-text-primary">Dodaj produkt do posiłku</p>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_7rem]">
        <Field id="item-meal" label="Posiłek">
          <select id="item-meal" className={selectClasses} value={mealId} onChange={(e) => setMealId(e.target.value)}>
            {meals.map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.time} {meal.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="item-product" label="Produkt">
          <select
            id="item-product"
            className={selectClasses}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {categories.map((category) => {
              const inCategory = products.filter((p) => p.categoryId === category.id)
              if (inCategory.length === 0) return null
              return (
                <optgroup key={category.id} label={category.name}>
                  {inCategory.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </Field>
        <Field id="item-amount" label={product?.measure === 'szt' ? 'Sztuki' : 'Gramy'} error={error}>
          <input
            {...fieldA11y('item-amount', error)}
            className={inputClasses}
            inputMode="decimal"
            value={amount}
            placeholder={product?.measure === 'szt' ? '1' : '100'}
            onChange={(e) => {
              setAmount(e.target.value)
              setError(undefined)
            }}
          />
        </Field>
      </div>
      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Dodaj do posiłku"
          startIcon={<Plus size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-secondary"
        />
      </div>
    </form>
  )
}

function AddMealForm({ onAdd }: { onAdd: (name: string, time: string) => void }) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('16:00')
  const [errors, setErrors] = useState<{ name?: string; time?: string }>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = {
      name: name.trim() ? undefined : 'Wpisz nazwę posiłku.',
      time: /^\d{2}:\d{2}$/.test(time) ? undefined : 'Wybierz godzinę.',
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.time) return
    onAdd(name.trim(), time)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_9rem]">
        <Field id="meal-name" label="Nazwa posiłku" error={errors.name}>
          <input
            {...fieldA11y('meal-name', errors.name)}
            className={inputClasses}
            value={name}
            placeholder="Podwieczorek"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value)
              setErrors((v) => ({ ...v, name: undefined }))
            }}
          />
        </Field>
        <Field id="meal-time" label="Godzina" error={errors.time}>
          <input
            {...fieldA11y('meal-time', errors.time)}
            type="time"
            className={inputClasses}
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
              setErrors((v) => ({ ...v, time: undefined }))
            }}
          />
        </Field>
      </div>
      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Dodaj posiłek"
          startIcon={<Plus size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-secondary"
        />
      </div>
    </form>
  )
}
