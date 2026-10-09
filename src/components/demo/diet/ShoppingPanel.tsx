import { CalendarRange } from 'lucide-react'
import { formatAmount } from '../../../lib/format'
import { buildShoppingList } from '../../../lib/nutrition'
import type { Category, Meal, Product } from '../../../lib/types'
import { Typography } from '../../../library/Typography/Typography'
import { Badge } from '../../ui/Badge'

type ShoppingPanelProps = {
  meals: Meal[]
  products: Product[]
  categories: Category[]
  checked: Set<string>
  onToggle: (productId: string) => void
}

export function ShoppingPanel({ meals, products, categories, checked, onToggle }: ShoppingPanelProps) {
  const items = buildShoppingList(meals, products)
  const inBasket = items.filter((item) => checked.has(item.productId)).length

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Typography variant="body-medium" color="brand-text-primary">
          Lista na poniedziałek
        </Typography>
        <div aria-live="polite">
          <Typography variant="small" color="brand-text-secondary">
            {`W koszyku ${inBasket} z ${items.length}`}
          </Typography>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-brand-text-tertiary/50 p-6 text-center text-sm text-brand-text-secondary">
          Lista jest pusta. Dodaj produkty do posiłków w zakładce Jadłospis.
        </p>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => {
            const inCategory = items.filter((item) => item.categoryId === category.id)
            if (inCategory.length === 0) return null
            return (
              <section key={category.id} aria-label={category.name}>
                <Badge accent={category.accent}>{category.name}</Badge>
                <ul className="mt-2 grid gap-1">
                  {inCategory.map((item) => {
                    const isChecked = checked.has(item.productId)
                    return (
                      <li key={item.productId}>
                        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 transition-colors hover:bg-brand-text-primary/5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onToggle(item.productId)}
                            className="size-5 shrink-0 accent-brand-primary"
                          />
                          <span
                            className={`min-w-0 flex-1 truncate ${isChecked ? 'text-brand-text-secondary line-through' : 'text-brand-text-primary'}`}
                          >
                            {item.name}
                          </span>
                          <div className="shrink-0">
                            <Typography variant="small-medium" color="brand-text-secondary">
                              {formatAmount(item.amount, item.measure)}
                            </Typography>
                          </div>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      )}

      <p className="flex items-start gap-2 rounded-xl bg-brand-info/15 px-3.5 py-3 text-sm text-brand-info">
        <CalendarRange size={18} aria-hidden className="mt-px shrink-0" />
        W aplikacji wybierasz dni, zakresy dni lub całe tygodnie. Produkty ze wszystkich jadłospisów sumują się w jedną listę.
      </p>
    </div>
  )
}
