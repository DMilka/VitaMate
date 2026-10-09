import { CalendarDays, Dumbbell, ListChecks } from 'lucide-react'
import { useState } from 'react'
import { TRAINING_CATEGORIES, TRAINING_EXERCISES, TRAINING_PLAN } from '../../../data/trainingDemo'
import { createId } from '../../../lib/id'
import type { Category, DayKey, Exercise, PlanEntry } from '../../../lib/types'
import { TabPanel, Tabs, type TabItem } from '../../ui/Tabs'
import { DemoFrame } from '../DemoFrame'
import { ExercisesPanel } from './ExercisesPanel'
import { PlanPanel } from './PlanPanel'

type TrainingTab = 'plan' | 'exercises'

const TABS: TabItem<TrainingTab>[] = [
  { id: 'plan', label: 'Plan tygodnia', shortLabel: 'Plan', icon: CalendarDays },
  { id: 'exercises', label: 'Ćwiczenia', icon: ListChecks },
]

/** Demo modułu treningów. Stan żyje tylko w pamięci, celowo bez zapisu. */
export function TrainingDemo() {
  const [tab, setTab] = useState<TrainingTab>('plan')
  const [categories, setCategories] = useState<Category[]>(TRAINING_CATEGORIES)
  const [exercises, setExercises] = useState<Exercise[]>(TRAINING_EXERCISES)
  const [plan, setPlan] = useState<PlanEntry[]>(TRAINING_PLAN)
  const [day, setDay] = useState<DayKey>('pn')

  return (
    <DemoFrame title="Trening" icon={Dumbbell}>
      <Tabs idPrefix="training" label="Widoki modułu treningów" tabs={TABS} value={tab} onChange={setTab} />

      <TabPanel idPrefix="training" id="plan" active={tab === 'plan'}>
        <PlanPanel
          plan={plan}
          exercises={exercises}
          categories={categories}
          day={day}
          onSelectDay={setDay}
          onAddEntry={(entry) => setPlan((current) => [...current, { ...entry, id: createId('wpis') }])}
          onRemoveEntry={(id) => setPlan((current) => current.filter((entry) => entry.id !== id))}
        />
      </TabPanel>

      <TabPanel idPrefix="training" id="exercises" active={tab === 'exercises'}>
        <ExercisesPanel
          exercises={exercises}
          categories={categories}
          onAddExercise={(exercise) => setExercises((current) => [...current, exercise])}
          onAddCategory={(category) => setCategories((current) => [...current, category])}
        />
      </TabPanel>
    </DemoFrame>
  )
}
