import { CalendarDays, Check, Clock, Dumbbell, ShoppingBasket } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { accentSoft, accentSolid } from '../../lib/accents'
import type { Accent } from '../../lib/types'

// Tło sekcji hero: warstwy modułów aplikacji ułożone poziomo jak "exploded view".
// Warstwy są obrócone wokół osi Y, więc odstęp na osi Z rozkłada je w poziomie.
// Panel główny jest z przodu po prawej, pozostałe moduły wychodzą zza niego w lewo (widać ich nagłówki).
// TODO: podmienić wymyślone panele na zrzuty ekranu prawdziwych podstron aplikacji.

function Layer({ index, children }: { index: number; children: ReactNode }) {
  // Opóźnienie rośnie z odległością od środka stosu: najpierw rozchodzą się warstwy środkowe.
  const delay = 100 + Math.abs(index - 1.5) * 80
  return (
    <div
      className="vm-layer absolute inset-0 overflow-hidden rounded-2xl border border-brand-text-tertiary/30 bg-brand-bg-tertiary p-4 shadow-2xl shadow-brand-primary/20 dark:shadow-black/40"
      style={{ '--layer-index': index, '--layer-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

function LayerHeader({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 font-display text-sm font-semibold text-brand-primary">
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-brand-primary text-brand-text-button">
          {icon}
        </span>
        {title}
      </span>
      <span className="text-[11px] text-brand-text-secondary">{meta}</span>
    </div>
  )
}

const SHOPPING = [
  { name: 'Płatki owsiane', amount: '420 g', done: true },
  { name: 'Jogurt naturalny', amount: '1,1 kg', done: true },
  { name: 'Maliny', amount: '560 g', done: false },
  { name: 'Pierś z kurczaka', amount: '1,05 kg', done: false },
  { name: 'Brokuł', amount: '1,4 kg', done: false },
]

const WORKOUT: { name: string; sets: string; weight: string; accent: Accent }[] = [
  { name: 'Przysiad ze sztangą', sets: '4 × 8', weight: '60 kg', accent: 'one' },
  { name: 'Wyciskanie na ławce', sets: '4 × 8', weight: '50 kg', accent: 'two' },
  { name: 'Wiosłowanie hantlem', sets: '3 × 10', weight: '22 kg', accent: 'four' },
]

const WEEK: { day: string; blocks: Accent[] }[] = [
  { day: 'Pn', blocks: ['one', 'four'] },
  { day: 'Wt', blocks: ['one'] },
  { day: 'Śr', blocks: ['one', 'four'] },
  { day: 'Cz', blocks: ['one'] },
  { day: 'Pt', blocks: ['one', 'four'] },
  { day: 'So', blocks: ['one', 'five'] },
  { day: 'Nd', blocks: ['one'] },
]

/**
 * split    - panele w prawej kolumnie obok tekstu (układ zaakceptowany wcześniej)
 * backdrop - od lg większe panele jako tło sekcji, częściowo pod napisem
 */
export type HeroVariant = 'split' | 'backdrop'

const LAYOUT: Record<HeroVariant, { outer: string; wrapper: string }> = {
  split: {
    outer:
      'relative mx-auto mt-4 h-[240px] w-full max-w-[640px] sm:mt-8 sm:h-[320px] md:h-[400px] lg:mt-0 lg:h-[520px]',
    wrapper:
      'top-[calc(50%+0.75rem)] left-[calc(50%-4rem)] scale-[0.62] [--stack-gap:95px] sm:left-[calc(50%-8rem)] sm:scale-[0.85] sm:[--stack-gap:130px] md:left-[calc(50%-8.5rem)] md:scale-100 lg:top-[calc(50%+2.5rem)] lg:left-[calc(50%-8rem)] lg:scale-[0.78] lg:[--stack-gap:150px] xl:left-[calc(50%-10rem)] xl:scale-[0.97]',
  },
  // Tylko od lg (na węższych ekranach Hero używa układu split).
  // Przesunięcie "left" kompensuje to, że zestaw rośnie w prawo od punktu zaczepienia.
  backdrop: {
    outer: 'absolute inset-0',
    wrapper:
      'top-[calc(50%+2.6rem)] left-[calc(66%-190px)] scale-[1.05] [--stack-gap:150px] xl:top-[calc(50%+3.2rem)] xl:left-[calc(64%-175px)] xl:scale-[1.3]',
  },
}

export function HeroStack({ variant = 'split' }: { variant?: HeroVariant }) {
  const layout = LAYOUT[variant]
  return (
    <div aria-hidden className={`pointer-events-none select-none ${layout.outer}`}>
      <div
        className={`absolute h-[230px] w-[340px] -translate-x-1/2 -translate-y-1/2 [perspective:2200px] [--stack-lift:26px] ${layout.wrapper}`}
      >
        <div className="relative h-full w-full [transform:rotateX(4deg)_rotateY(38deg)] [transform-style:preserve-3d]">
          <Layer index={0}>
            <LayerHeader icon={<ShoppingBasket size={13} />} title="Lista zakupów" meta="Pn - Nd" />
            <ul className="mt-3 grid gap-1.5">
              {SHOPPING.map((item) => (
                <li key={item.name} className="flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex size-4 items-center justify-center rounded ${item.done ? 'bg-brand-primary text-brand-text-button' : 'border border-brand-text-tertiary'}`}
                  >
                    {item.done && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className={`flex-1 ${item.done ? 'text-brand-text-secondary line-through' : 'text-brand-text-primary'}`}>
                    {item.name}
                  </span>
                  <span className="text-brand-text-secondary">{item.amount}</span>
                </li>
              ))}
            </ul>
          </Layer>

          <Layer index={1}>
            <LayerHeader icon={<Dumbbell size={13} />} title="Trening" meta="Poniedziałek" />
            <ul className="mt-3 grid gap-2">
              {WORKOUT.map((row) => (
                <li key={row.name} className="flex items-center gap-2.5 rounded-xl bg-brand-bg-primary px-2.5 py-2 text-xs">
                  <span className={`inline-flex size-6 items-center justify-center rounded-md ${accentSoft[row.accent]}`}>
                    <Dumbbell size={12} />
                  </span>
                  <span className="flex-1 font-medium text-brand-text-primary">{row.name}</span>
                  <span className="text-brand-text-secondary">{row.sets}</span>
                  <span className="w-11 text-right font-medium text-brand-text-primary">{row.weight}</span>
                </li>
              ))}
            </ul>
          </Layer>

          <Layer index={2}>
            <LayerHeader icon={<Clock size={13} />} title="Śniadanie" meta="07:30" />
            <p className="mt-3 font-display text-2xl font-semibold text-brand-primary">
              486 <span className="text-sm font-medium">kcal</span>
            </p>
            <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
              <span className="w-[22%] bg-brand-accent-four" />
              <span className="w-[24%] bg-brand-accent-two" />
              <span className="w-[54%] bg-brand-accent-one" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Płatki owsiane 60 g', 'Jogurt 150 g', 'Maliny 80 g'].map((chip) => (
                <span key={chip} className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${accentSoft.two}`}>
                  {chip}
                </span>
              ))}
            </div>
          </Layer>

          <Layer index={3}>
            <LayerHeader icon={<CalendarDays size={13} />} title="Panel główny" meta="Ten tydzień" />
            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {WEEK.map(({ day, blocks }) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-medium text-brand-text-secondary">{day}</span>
                  <div className="flex h-24 w-full flex-col gap-1 rounded-lg bg-brand-bg-primary p-1">
                    {blocks.map((accent, index) => (
                      <span key={index} className={`h-6 rounded-md ${accentSolid[accent]} opacity-80`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3 text-[11px] text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <span className={`size-2 rounded-full ${accentSolid.one}`} />
                Dieta
              </span>
              <span className="flex items-center gap-1">
                <span className={`size-2 rounded-full ${accentSolid.four}`} />
                Trening
              </span>
            </div>
          </Layer>
        </div>
      </div>
    </div>
  )
}
