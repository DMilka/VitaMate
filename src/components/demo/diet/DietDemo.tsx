import { CalendarDays, Package, Salad, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'
import { DIET_CATEGORIES, DIET_MEALS, DIET_PRODUCTS } from '../../../data/dietDemo'
import { createId } from '../../../lib/id'
import type { Category, Meal, Product } from '../../../lib/types'
import { TabPanel, Tabs, type TabItem } from '../../ui/Tabs'
import { DemoFrame } from '../DemoFrame'
import { MenuPanel } from './MenuPanel'
import { ProductsPanel } from './ProductsPanel'
import { ShoppingPanel } from './ShoppingPanel'

type DietTab = 'products' | 'menu' | 'shopping'

const TABS: TabItem<DietTab>[] = [
  { id: 'products', label: 'Produkty', icon: Package },
  { id: 'menu', label: 'Jadłospis', icon: CalendarDays },
  { id: 'shopping', label: 'Lista zakupów', shortLabel: 'Zakupy', icon: ShoppingBasket },
]

/** Demo modułu diety. Stan żyje tylko w pamięci, celowo bez zapisu. */
export function DietDemo() {
  const [tab, setTab] = useState<DietTab>('menu')
  const [categories, setCategories] = useState<Category[]>(DIET_CATEGORIES)
  const [products, setProducts] = useState<Product[]>(DIET_PRODUCTS)
  const [meals, setMeals] = useState<Meal[]>(DIET_MEALS)
  const [checked, setChecked] = useState<Set<string>>(() => new Set())

  function addItem(mealId: string, productId: string, amount: number) {
    setMeals((current) =>
      current.map((meal) =>
        meal.id === mealId ? { ...meal, items: [...meal.items, { id: createId('pozycja'), productId, amount }] } : meal,
      ),
    )
  }

  function removeItem(mealId: string, itemId: string) {
    setMeals((current) =>
      current.map((meal) =>
        meal.id === mealId ? { ...meal, items: meal.items.filter((item) => item.id !== itemId) } : meal,
      ),
    )
  }

  function toggleChecked(productId: string) {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  return (
    <DemoFrame title="Dieta" icon={Salad}>
      <Tabs idPrefix="diet" label="Widoki modułu diety" tabs={TABS} value={tab} onChange={setTab} />

      <TabPanel idPrefix="diet" id="products" active={tab === 'products'}>
        <ProductsPanel
          products={products}
          categories={categories}
          onAddProduct={(product) => setProducts((current) => [...current, product])}
          onAddCategory={(category) => setCategories((current) => [...current, category])}
        />
      </TabPanel>

      <TabPanel idPrefix="diet" id="menu" active={tab === 'menu'}>
        <MenuPanel
          meals={meals}
          products={products}
          categories={categories}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onAddMeal={(name, time) => setMeals((current) => [...current, { id: createId('posilek'), name, time, items: [] }])}
        />
      </TabPanel>

      <TabPanel idPrefix="diet" id="shopping" active={tab === 'shopping'}>
        <ShoppingPanel
          meals={meals}
          products={products}
          categories={categories}
          checked={checked}
          onToggle={toggleChecked}
        />
      </TabPanel>
    </DemoFrame>
  )
}
