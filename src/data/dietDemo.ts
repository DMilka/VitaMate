import type { Category, Meal, Product } from '../lib/types'

// Przykładowe dane demo. Wartości odżywcze są przybliżone.

export const DIET_CATEGORIES: Category[] = [
  { id: 'zboza', name: 'Produkty zbożowe', accent: 'two' },
  { id: 'nabial', name: 'Nabiał i jaja', accent: 'four' },
  { id: 'owoce', name: 'Owoce', accent: 'five' },
  { id: 'mieso', name: 'Mięso i ryby', accent: 'three' },
  { id: 'warzywa', name: 'Warzywa', accent: 'one' },
]

export const DIET_PRODUCTS: Product[] = [
  { id: 'platki', name: 'Płatki owsiane', categoryId: 'zboza', measure: 'g', kcal: 379, protein: 13.2, fat: 6.5, carbs: 67.7 },
  { id: 'jogurt', name: 'Jogurt naturalny 2%', categoryId: 'nabial', measure: 'g', kcal: 60, protein: 4.3, fat: 2, carbs: 6.2 },
  { id: 'maliny', name: 'Maliny', categoryId: 'owoce', measure: 'g', kcal: 52, protein: 1.2, fat: 0.7, carbs: 11.9 },
  { id: 'banan', name: 'Banan', categoryId: 'owoce', measure: 'szt', kcal: 107, protein: 1.3, fat: 0.4, carbs: 27 },
  { id: 'jajko', name: 'Jajko', categoryId: 'nabial', measure: 'szt', kcal: 78, protein: 6.3, fat: 5.3, carbs: 0.6 },
  { id: 'kurczak', name: 'Pierś z kurczaka', categoryId: 'mieso', measure: 'g', kcal: 99, protein: 21.5, fat: 1.3, carbs: 0 },
  { id: 'bulgur', name: 'Kasza bulgur', categoryId: 'zboza', measure: 'g', kcal: 342, protein: 12.3, fat: 1.3, carbs: 75.9 },
  { id: 'brokul', name: 'Brokuł', categoryId: 'warzywa', measure: 'g', kcal: 34, protein: 2.8, fat: 0.4, carbs: 6.6 },
]

export const DIET_MEALS: Meal[] = [
  {
    id: 'sniadanie',
    name: 'Śniadanie',
    time: '07:30',
    items: [
      { id: 's1', productId: 'platki', amount: 60 },
      { id: 's2', productId: 'jogurt', amount: 150 },
      { id: 's3', productId: 'maliny', amount: 80 },
    ],
  },
  {
    id: 'obiad',
    name: 'Obiad',
    time: '13:30',
    items: [
      { id: 'o1', productId: 'kurczak', amount: 150 },
      { id: 'o2', productId: 'bulgur', amount: 70 },
      { id: 'o3', productId: 'brokul', amount: 200 },
    ],
  },
  {
    id: 'kolacja',
    name: 'Kolacja',
    time: '19:00',
    items: [
      { id: 'k1', productId: 'jajko', amount: 2 },
      { id: 'k2', productId: 'jogurt', amount: 100 },
      { id: 'k3', productId: 'banan', amount: 1 },
    ],
  },
]
