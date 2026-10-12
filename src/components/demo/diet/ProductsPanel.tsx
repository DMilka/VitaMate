import { PackagePlus, ScanBarcode, Tags } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatNumber, measureLabel, parseNumber } from '../../../lib/format'
import { createId } from '../../../lib/id'
import type { Category, Measure, Product } from '../../../lib/types'
import { Button } from '../../../library/Buttons/Button/Button'
import { FieldInput } from '../../../library/Inputs/FieldInput/FieldInput'
import { SelectInput } from '../../../library/Inputs/SelectInput/SelectInput'
import { Typography } from '../../../library/Typography/Typography'
import { Badge } from '../../ui/Badge'
import { Disclosure } from '../../ui/Disclosure'
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
                {/* Ellipsis działa, gdy tekst jest elementem inline wewnątrz bloku z truncate. */}
                <div className="truncate">
                  <Typography variant="body-medium" component="span" color="brand-text-primary">
                    {product.name}
                  </Typography>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {category && <Badge accent={category.accent}>{category.name}</Badge>}
                  <Typography variant="caption" component="span" color="brand-text-secondary">
                    {measureLabel(product.measure)}
                  </Typography>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <Typography variant="body-semibold" fontType="brand-font-secondary" color="brand-text-primary">
                  {`${formatNumber(product.kcal)} kcal`}
                </Typography>
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

const MEASURE_ELEMENTS: { name: string; value: Measure }[] = [
  { name: 'Wartości na 100 g', value: 'g' },
  { name: 'Wartości na 1 sztukę', value: 'szt' },
]

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
      <FieldInput
        id="product-name"
        label="Nazwa produktu"
        value={values.name}
        placeholder="Serek wiejski"
        caption={errors.name}
        captionColor="brand-error"
        onChange={(e) => update('name', e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          id="product-category"
          label="Kategoria"
          elements={categories.map((c) => ({ name: c.name, value: c.id }))}
          value={values.categoryId}
          onChange={(value) => update('categoryId', value)}
        />
        <SelectInput
          id="product-measure"
          label="Miara"
          elements={MEASURE_ELEMENTS}
          value={values.measure}
          onChange={(value) => update('measure', value as Measure)}
        />
      </div>

      <fieldset>
        <legend className="text-sm text-brand-text-secondary">Wartości odżywcze na {unit}</legend>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NUTRIENT_FIELDS.map(({ key, label, placeholder }) => (
            <FieldInput
              key={key}
              id={`product-${key}`}
              label={label}
              type="number"
              value={values[key]}
              placeholder={placeholder}
              caption={errors[key]}
              captionColor="brand-error"
              onChange={(e) => update(key, e.target.value)}
            />
          ))}
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
