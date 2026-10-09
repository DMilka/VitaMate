import { describe, expect, it } from 'vitest'
import { totalSets, totalVolume } from './training'
import type { PlanEntry } from './types'

const entries: PlanEntry[] = [
  { id: '1', exerciseId: 'squat', day: 'pn', sets: 4, reps: 8, weight: 60 },
  { id: '2', exerciseId: 'pullup', day: 'pn', sets: 3, reps: 6, weight: 0 },
]

describe('training', () => {
  it('liczy serie i objętość, pomijając ciężar ciała w objętości', () => {
    expect(totalSets(entries)).toBe(7)
    expect(totalVolume(entries)).toBe(1920)
  })
})
