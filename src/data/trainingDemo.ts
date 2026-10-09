import type { Category, Exercise, PlanEntry } from '../lib/types'

// Przykładowe dane demo.

export const TRAINING_CATEGORIES: Category[] = [
  { id: 'nogi', name: 'Nogi', accent: 'one' },
  { id: 'klatka', name: 'Klatka piersiowa', accent: 'two' },
  { id: 'plecy', name: 'Plecy', accent: 'four' },
  { id: 'barki', name: 'Barki', accent: 'five' },
  { id: 'brzuch', name: 'Brzuch', accent: 'three' },
]

export const TRAINING_EXERCISES: Exercise[] = [
  { id: 'przysiad', name: 'Przysiad ze sztangą', categoryId: 'nogi' },
  { id: 'rdl', name: 'Martwy ciąg rumuński', categoryId: 'nogi' },
  { id: 'lawka', name: 'Wyciskanie sztangi na ławce', categoryId: 'klatka' },
  { id: 'pompki', name: 'Pompki', categoryId: 'klatka' },
  { id: 'wioslowanie', name: 'Wiosłowanie hantlem', categoryId: 'plecy' },
  { id: 'podciaganie', name: 'Podciąganie nachwytem', categoryId: 'plecy' },
  { id: 'ohp', name: 'Wyciskanie hantli nad głowę', categoryId: 'barki' },
  { id: 'nogi-zwis', name: 'Unoszenie nóg w zwisie', categoryId: 'brzuch' },
]

export const TRAINING_PLAN: PlanEntry[] = [
  { id: 'p1', exerciseId: 'przysiad', day: 'pn', sets: 4, reps: 8, weight: 60 },
  { id: 'p2', exerciseId: 'lawka', day: 'pn', sets: 4, reps: 8, weight: 50 },
  { id: 'p3', exerciseId: 'wioslowanie', day: 'pn', sets: 3, reps: 10, weight: 22 },
  { id: 'p4', exerciseId: 'rdl', day: 'sr', sets: 3, reps: 10, weight: 50 },
  { id: 'p5', exerciseId: 'podciaganie', day: 'sr', sets: 4, reps: 6, weight: 0 },
  { id: 'p6', exerciseId: 'ohp', day: 'sr', sets: 3, reps: 10, weight: 14 },
  { id: 'p7', exerciseId: 'przysiad', day: 'pt', sets: 5, reps: 5, weight: 65 },
  { id: 'p8', exerciseId: 'pompki', day: 'pt', sets: 3, reps: 15, weight: 0 },
  { id: 'p9', exerciseId: 'nogi-zwis', day: 'pt', sets: 3, reps: 12, weight: 0 },
]
