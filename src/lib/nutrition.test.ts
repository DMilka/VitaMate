import { describe, expect, it } from 'vitest'
import { buildShoppingList, energySplit, macrosFor, mealMacros } from './nutrition'
import type { Meal, Product } from './types'

const oats: Product = { id: 'oats', name: 'Płatki owsiane', categoryId: 'c', measure: 'g', kcal: 380, protein: 13, fat: 7, carbs: 60 }
const banana: Product = { id: 'banana', name: 'Banan', categoryId: 'c', measure: 'szt', kcal: 105, protein: 1.3, fat: 0.4, carbs: 27 }

describe('macrosFor', () => {
  it('przelicza produkt na 100 g proporcjonalnie do gramatury', () => {
    expect(macrosFor(oats, 50)).toEqual({ kcal: 190, protein: 6.5, fat: 3.5, carbs: 30 })
  })

  it('mnoży produkt na sztuki przez liczbę sztuk', () => {
    expect(macrosFor(banana, 2).kcal).toBe(210)
  })
})

describe('mealMacros', () => {
  it('sumuje wszystkie produkty posiłku i pomija nieznane', () => {
    const meal: Meal = {
      id: 'm',
      name: 'Śniadanie',
      time: '07:30',
      items: [
        { id: '1', productId: 'oats', amount: 100 },
        { id: '2', productId: 'banana', amount: 1 },
        { id: '3', productId: 'deleted', amount: 1 },
      ],
    }
    const byId = new Map([oats, banana].map((p) => [p.id, p]))
    expect(mealMacros(meal, byId).kcal).toBe(485)
  })
})

describe('buildShoppingList', () => {
  it('sumuje ten sam produkt z różnych posiłków w jedną pozycję', () => {
    const meals: Meal[] = [
      { id: 'a', name: 'Śniadanie', time: '07:30', items: [{ id: '1', productId: 'oats', amount: 60 }] },
      {
        id: 'b',
        name: 'Kolacja',
        time: '19:00',
        items: [
          { id: '2', productId: 'oats', amount: 40 },
          { id: '3', productId: 'banana', amount: 2 },
        ],
      },
    ]
    expect(buildShoppingList(meals, [oats, banana])).toEqual([
      { productId: 'banana', name: 'Banan', categoryId: 'c', measure: 'szt', amount: 2 },
      { productId: 'oats', name: 'Płatki owsiane', categoryId: 'c', measure: 'g', amount: 100 },
    ])
  })
})

describe('energySplit', () => {
  it('zwraca zera dla pustego posiłku zamiast dzielić przez zero', () => {
    expect(energySplit({ kcal: 0, protein: 0, fat: 0, carbs: 0 })).toEqual({ protein: 0, fat: 0, carbs: 0 })
  })
})
