import { PackagePlus, ScanBarcode, Tags } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatNumber, measureLabel, parseNumber } from '../../../lib/format'
import { createId } from '../../../lib/id'
import type { Category, Measure, Product } from '../../../lib/types'
import { Button } from '../../../library/Buttons/Button/Button'
import { Badge } from '../../ui/Badge'
import { Disclosure } from '../../ui/Disclosure'
import { Field } from '../../ui/Field'
import { fieldA11y, inputClasses, selectClasses } from '../../ui/styles'
import { CategoryForm } from '../CategoryForm'

type ProductsPanelProps = {
  products: Product[]
  categories: Category[]
  onAddProduct: (product: Product) => void
  onAddCategory: (category: Category) => void
}

export function ProductsPanel({ products, categories, onAddProduct, onAddCategory }: ProductsPanelProps) {
  const categoriesById = new Map(categories.map((c) => [c.id, c]))

  return (
    <div className="grid gap-5">
      <ul className="divide-y divide-brand-text-tertiary/20">
        {products.map((product) => {
          const category = categoriesById.get(product.categoryId)
          return (
            <li key={product.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 motion-safe:animate-pop-in">
              <div className="min-w-0">
                <p className="truncate font-medium text-brand-text-primary">{product.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {category && <Badge accent={category.accent}>{category.name}</Badge>}
                  <span className="text-xs text-brand-text-secondary">{measureLabel(product.measure)}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display font-semibold text-brand-text-primary">{formatNumber(product.kcal)} kcal</p>
                <p className="mt-0.5 flex justify-end gap-2 text-xs text-brand-text-secondary">
                  <span>B {formatNumber(product.protein)}</span>
                  <span>T {formatNumber(product.fat)}</span>
                  <span>W {formatNumber(product.carbs)}</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <p className="flex items-start gap-2 rounded-xl bg-brand-info/15 px-3.5 py-3 text-sm text-brand-info">
        <ScanBarcode size={18} aria-hidden className="mt-px shrink-0" />
        W aplikacji produkt dodasz też, skanując kod kreskowy z opakowania.
      </p>

      <div className="grid gap-3">
        <Disclosure title="Dodaj produkt" icon={PackagePlus}>
          <ProductForm categories={categories} onAdd={onAddProduct} />
        </Disclosure>
        <Disclosure title="Dodaj kategorię produktów" icon={Tags}>
          <CategoryForm idPrefix="diet" placeholder="Przekąski" existing={categories} onAdd={onAddCategory} />
        </Disclosure>
      </div>
    </div>
  )
}

type ProductFormValues = {
  name: string
  categoryId: string
  measure: Measure
  kcal: string
  protein: string
  fat: string
  carbs: string
}

const NUTRIENT_FIELDS = [
  { key: 'kcal', label: 'Kalorie (kcal)', placeholder: '120' },
  { key: 'protein', label: 'Białko (g)', placeholder: '4,5' },
  { key: 'fat', label: 'Tłuszcze (g)', placeholder: '2' },
  { key: 'carbs', label: 'Węglowodany (g)', placeholder: '18' },
] as const

type NutrientKey = (typeof NUTRIENT_FIELDS)[number]['key']
type ProductFormErrors = Partial<Record<'name' | NutrientKey, string>>

function ProductForm({ categories, onAdd }: { categories: Category[]; onAdd: (product: Product) => void }) {
  const initial: ProductFormValues = {
    name: '',
    categoryId: categories[0]?.id ?? '',
    measure: 'g',
    kcal: '',
    protein: '',
    fat: '',
    carbs: '',
  }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<ProductFormErrors>({})

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: ProductFormErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Wpisz nazwę produktu.'

    const nutrients = {} as Record<NutrientKey, number>
    for (const { key } of NUTRIENT_FIELDS) {
      const parsed = parseNumber(values[key])
      if (parsed === null || parsed < 0) nextErrors[key] = 'Wpisz liczbę 0 lub większą.'
      else nutrients[key] = parsed
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAdd({
      id: createId('produkt'),
      name: values.name.trim(),
      categoryId: values.categoryId,
      measure: values.measure,
      ...nutrients,
    })
    setValues({ ...initial, categoryId: values.categoryId, measure: values.measure })
  }

  const unit = values.measure === 'g' ? '100 g' : '1 sztukę'

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <Field id="product-name" label="Nazwa produktu" error={errors.name}>
        <input
          {...fieldA11y('product-name', errors.name)}
          className={inputClasses}
          value={values.name}
          placeholder="Serek wiejski"
          autoComplete="off"
          onChange={(e) => update('name', e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="product-category" label="Kategoria">
          <select
            id="product-category"
            className={selectClasses}
            value={values.categoryId}
            onChange={(e) => update('categoryId', e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="product-measure" label="Miara">
          <select
            id="product-measure"
            className={selectClasses}
            value={values.measure}
            onChange={(e) => update('measure', e.target.value as Measure)}
          >
            <option value="g">Wartości na 100 g</option>
            <option value="szt">Wartości na 1 sztukę</option>
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm text-brand-text-secondary">Wartości odżywcze na {unit}</legend>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NUTRIENT_FIELDS.map(({ key, label, placeholder }) => {
            const id = `product-${key}`
            return (
              <Field key={key} id={id} label={label} error={errors[key]}>
                <input
                  {...fieldA11y(id, errors[key])}
                  className={inputClasses}
                  inputMode="decimal"
                  value={values[key]}
                  placeholder={placeholder}
                  onChange={(e) => update(key, e.target.value)}
                />
              </Field>
            )
          })}
        </div>
      </fieldset>

      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Dodaj produkt"
          startIcon={<PackagePlus size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-secondary"
        />
      </div>
    </form>
  )
}
