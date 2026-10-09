import { Check, Dumbbell, Megaphone, Salad, Sparkles, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES, SECTION_IDS } from '../../siteConfig'
import { buttonClasses } from '../ui/styles'

type Plan = {
  id: string
  name: string
  icon: LucideIcon
  // TODO: ceny przykładowe, do ustalenia przed startem sprzedaży.
  price: string
  description: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'dieta',
    name: 'Dieta',
    icon: Salad,
    price: '19 zł',
    description: 'Moduł diety z listą zakupów, bez reklam.',
    features: [
      'Produkty z formularza i kodów kreskowych',
      'Posiłki z sumą makroskładników',
      'Jadłospisy na dni i godziny',
      'Listy zakupów z wybranych dni',
    ],
  },
  {
    id: 'pakiet',
    name: 'Dieta i Trening',
    icon: Sparkles,
    price: '29 zł',
    description: 'Oba moduły w jednym planie, bez reklam.',
    features: ['Wszystko z planu Dieta', 'Wszystko z planu Trening', 'Wspólny kalendarz posiłków i treningów'],
    featured: true,
  },
  {
    id: 'trening',
    name: 'Trening',
    icon: Dumbbell,
    price: '19 zł',
    description: 'Moduł planów treningowych, bez reklam.',
    features: [
      'Własne kategorie i ćwiczenia',
      'Plany przypisane do dni tygodnia',
      'Serie, powtórzenia i ciężar',
      'Treningi w kalendarzu',
    ],
  },
]

function handleBuy(planId: string) {
  // TODO: zakup planu. Aktualnie brak funkcjonalności (płatności i konta użytkowników powstaną w kolejnym etapie).
  void planId
}

export function PricingSection() {
  return (
    <section id={SECTION_IDS.pricing} aria-labelledby="pricing-title" className="scroll-mt-16 bg-brand-bg-quaternary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 id="pricing-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Cennik
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-brand-text-primary">
            Darmowe konto daje dostęp do aplikacji z reklamami. Wybierz plan, aby korzystać z modułów bez reklam.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-tertiary/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent-three/15 text-brand-accent-three">
              <Megaphone size={18} aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold">Darmowe konto</h3>
              <p className="text-sm text-brand-text-secondary">Wszystkie moduły z reklamami. Bez opłat.</p>
            </div>
          </div>
          <Link to={ROUTES.register} className={buttonClasses('outline', 'w-full sm:w-auto')}>
            Dołącz do nas
          </Link>
        </div>

        <ul className="mt-6 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => (
            <li key={plan.id} className={plan.featured ? 'lg:-my-3' : undefined}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  const { featured, icon: Icon } = plan
  const muted = featured ? 'text-brand-text-button/80' : 'text-brand-text-secondary'

  return (
    <article
      className={`flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        featured
          ? 'bg-brand-primary text-brand-text-button shadow-2xl shadow-brand-primary/30 dark:shadow-black/40'
          : 'border border-brand-text-tertiary/25 bg-brand-bg-tertiary text-brand-text-primary'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex size-11 items-center justify-center rounded-xl ${
            featured ? 'bg-brand-text-button/15' : 'bg-brand-accent-one/15 text-brand-accent-one'
          }`}
        >
          <Icon size={20} aria-hidden />
        </span>
        {featured && (
          <span className="rounded-full bg-brand-text-button/15 px-3 py-1 text-xs font-medium">Najkorzystniejszy</span>
        )}
      </div>

      <h3 className={`mt-5 text-2xl font-semibold ${featured ? 'text-brand-text-button' : ''}`}>{plan.name}</h3>
      <p className={`mt-1 text-sm ${muted}`}>{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-semibold">{plan.price}</span>
        <span className={`text-sm ${muted}`}>/ miesiąc</span>
      </p>

      <ul className="mt-6 grid gap-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={18} aria-hidden className={`mt-px shrink-0 ${featured ? '' : 'text-brand-success'}`} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => handleBuy(plan.id)}
          className={buttonClasses(featured ? 'inverse' : 'tertiary', 'w-full')}
        >
          Kup plan
        </button>
      </div>
    </article>
  )
}
