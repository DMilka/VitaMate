import type { Meal, Measure, Product } from './types'

export type Macros = {
  kcal: number
  protein: number
  fat: number
  carbs: number
}

export const EMPTY_MACROS: Macros = { kcal: 0, protein: 0, fat: 0, carbs: 0 }

/** Makroskładniki dla podanej ilości produktu (gramy lub sztuki, zależnie od miary). */
export function macrosFor(product: Product, amount: number): Macros {
  const factor = product.measure === 'g' ? amount / 100 : amount
  return {
    kcal: product.kcal * factor,
    protein: product.protein * factor,
    fat: product.fat * factor,
    carbs: product.carbs * factor,
  }
}

export function sumMacros(list: Macros[]): Macros {
  return list.reduce(
    (total, m) => ({
      kcal: total.kcal + m.kcal,
      protein: total.protein + m.protein,
      fat: total.fat + m.fat,
      carbs: total.carbs + m.carbs,
    }),
    EMPTY_MACROS,
  )
}

export function mealMacros(meal: Meal, productsById: Map<string, Product>): Macros {
  return sumMacros(
    meal.items.flatMap((item) => {
      const product = productsById.get(item.productId)
      return product ? [macrosFor(product, item.amount)] : []
    }),
  )
}

/** Udział energii z białka, tłuszczu i węglowodanów (4 / 9 / 4 kcal na gram). */
export function energySplit(m: Macros) {
  const protein = m.protein * 4
  const fat = m.fat * 9
  const carbs = m.carbs * 4
  const total = protein + fat + carbs
  if (total === 0) return { protein: 0, fat: 0, carbs: 0 }
  return { protein: protein / total, fat: fat / total, carbs: carbs / total }
}

export type ShoppingItem = {
  productId: string
  name: string
  categoryId: string
  measure: Measure
  amount: number
}

/** Sumuje ten sam produkt ze wszystkich posiłków w jedną pozycję listy zakupów. */
export function buildShoppingList(meals: Meal[], products: Product[]): ShoppingItem[] {
  const productsById = new Map(products.map((p) => [p.id, p]))
  const totals = new Map<string, number>()

  for (const meal of meals) {
    for (const item of meal.items) {
      totals.set(item.productId, (totals.get(item.productId) ?? 0) + item.amount)
    }
  }

  return [...totals]
    .flatMap(([productId, amount]) => {
      const product = productsById.get(productId)
      if (!product) return []
      return [{ productId, name: product.name, categoryId: product.categoryId, measure: product.measure, amount }]
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'pl'))
}
