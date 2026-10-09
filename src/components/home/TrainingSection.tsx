import { CalendarDays, Dumbbell, Library, Tags } from 'lucide-react'
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
            <h2 id="training-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Trening
            </h2>
          </div>
          <p className="mt-5 font-display text-xl leading-snug text-brand-text-primary sm:text-2xl">
            Ćwiczenia, serie i ciężar rozpisane na dni tygodnia.
          </p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-brand-text-secondary">
            Tworzysz kategorie i ćwiczenia, a potem składasz z nich plan. Każdemu dniu przypisujesz serie, powtórzenia i
            ciężar.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <TrainingDemo />
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl bg-brand-bg-secondary p-5">
                <Icon size={20} aria-hidden className="text-brand-primary" />
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-text-secondary">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
