import { CalendarDays, Dumbbell, Library, Tags } from 'lucide-react'
import { Typography } from '../../library/Typography/Typography'
import { SECTION_IDS } from '../../siteConfig'
import { TrainingDemo } from '../demo/training/TrainingDemo'

const POINTS = [
  { icon: Tags, title: 'Własne kategorie', text: 'Nogi, plecy, mobilność. Każdej kategorii nadajesz własny kolor.' },
  { icon: Library, title: 'Biblioteka ćwiczeń', text: 'Raz zdefiniowane ćwiczenie wykorzystasz w każdym planie.' },
  { icon: CalendarDays, title: 'Plan na konkretne dni', text: 'Serie, powtórzenia i ciężar widzisz w kalendarzu obok jadłospisu.' },
]

export function TrainingSection() {
  return (
    <section id={SECTION_IDS.training} aria-labelledby="training-title" className="scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-accent-four/15 text-brand-accent-four">
              <Dumbbell size={22} aria-hidden />
            </span>
            <Typography variant="heading-5xl" id="training-title">
              Trening
            </Typography>
          </div>
          <div className="mt-5">
            <Typography variant="subtitle" fontType="brand-font-secondary" color="brand-text-primary">
              Ćwiczenia, serie i ciężar rozpisane na dni tygodnia.
            </Typography>
          </div>
          <div className="mt-4 max-w-[60ch]">
            <Typography variant="body" color="brand-text-secondary">
              Tworzysz kategorie i ćwiczenia, a potem składasz z nich plan. Każdemu dniu przypisujesz serie, powtórzenia
              i ciężar.
            </Typography>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <TrainingDemo />
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl bg-brand-bg-secondary p-5">
                <Icon size={20} aria-hidden className="text-brand-primary" />
                <div className="mt-3">
                  <Typography variant="heading-base">{title}</Typography>
                </div>
                <div className="mt-1">
                  <Typography variant="small-relaxed" color="brand-text-secondary">
                    {text}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
