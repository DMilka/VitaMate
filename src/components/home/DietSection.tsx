import { CalendarDays, Salad, ScanBarcode, ShoppingBasket, UtensilsCrossed } from 'lucide-react'
import { SECTION_IDS } from '../../siteConfig'
import { DietDemo } from '../demo/diet/DietDemo'

const STEPS = [
  { icon: ScanBarcode, title: 'Produkty', text: 'Dodajesz z formularza albo skanujesz kod kreskowy.' },
  { icon: UtensilsCrossed, title: 'Posiłki', text: 'Makroskładniki produktów sumują się automatycznie.' },
  { icon: CalendarDays, title: 'Jadłospis', text: 'Posiłki trafiają na konkretny dzień i godzinę.' },
  { icon: ShoppingBasket, title: 'Lista zakupów', text: 'Wybierasz dni, a produkty sumują się w jedną listę.' },
]

export function DietSection() {
  return (
    <section id={SECTION_IDS.diet} aria-labelledby="diet-title" className="scroll-mt-16 bg-brand-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:px-8 lg:py-24">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-accent-one/15 text-brand-accent-one">
              <Salad size={22} aria-hidden />
            </span>
            <h2 id="diet-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Dieta
            </h2>
          </div>
          <p className="mt-5 font-display text-xl leading-snug text-brand-text-primary sm:text-2xl">
            Jadłospis z Twoich produktów, a z niego gotowa lista zakupów.
          </p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-brand-text-secondary">
            Każdy produkt ma kategorię, miarę, kalorie i makroskładniki. Resztę policzymy za Ciebie: posiłek, cały dzień i
            zakupy na tydzień.
          </p>

          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {STEPS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-bg-tertiary text-brand-primary shadow-sm shadow-brand-primary/10 dark:shadow-black/40">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-brand-text-secondary">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <DietDemo />
      </div>
    </section>
  )
}
