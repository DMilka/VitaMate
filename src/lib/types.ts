export type Accent = 'one' | 'two' | 'three' | 'four' | 'five'

export type Category = {
  id: string
  name: string
  accent: Accent
}

/** 'g' - wartości podane na 100 g, 'szt' - wartości podane na 1 sztukę. */
export type Measure = 'g' | 'szt'

export type Product = {
  id: string
  name: string
  categoryId: string
  measure: Measure
  kcal: number
  protein: number
  fat: number
  carbs: number
}

export type MealItem = {
  id: string
  productId: string
  /** Gramy dla miary 'g', sztuki dla miary 'szt'. */
  amount: number
}

export type Meal = {
  id: string
  name: string
  /** Godzina w formacie HH:MM. */
  time: string
  items: MealItem[]
}

export type DayKey = 'pn' | 'wt' | 'sr' | 'cz' | 'pt' | 'so' | 'nd'

export type Exercise = {
  id: string
  name: string
  categoryId: string
}

export type PlanEntry = {
  id: string
  exerciseId: string
  day: DayKey
  sets: number
  reps: number
  /** Ciężar w kg. 0 oznacza ćwiczenie z masą ciała. */
  weight: number
}
