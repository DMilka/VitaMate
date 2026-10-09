import { ArrowRight } from 'lucide-react'
import { LinkButton } from '../../library/Buttons/LinkButton/LinkButton'
import { Typography } from '../../library/Typography/Typography'
import { ROUTES, SECTION_IDS } from '../../siteConfig'
import { HeroStack, type HeroVariant } from './HeroStack'

// 'backdrop' - aktualny układ (zaakceptowany). 'split' przywraca poprzedni układ z panelami w prawej kolumnie.
const HERO_VARIANT: HeroVariant = 'backdrop'

const GLOW =
  'pointer-events-none absolute top-1/2 right-[-10%] size-[720px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-accent-one)_16%,transparent),transparent)]'

export function Hero() {
  const backdrop = HERO_VARIANT === 'backdrop'

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {!backdrop && <div aria-hidden className={GLOW} />}

      <div
        className={`relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-6 px-4 pt-10 pb-12 sm:px-6 lg:gap-4 lg:px-8 ${
          // backdrop: od lg tekst w górnej części sekcji (140 px pod nawigacją), warstwy wyśrodkowane w pionie.
          backdrop ? 'lg:content-start lg:pt-[140px] lg:pb-16' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:py-16'
        }`}
      >
        {backdrop && (
          // Od lg: panele jako tło sekcji, pod tekstem. Warstwa leży pod treścią (-z-10).
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
            <div className={GLOW} />
            <HeroStack variant="backdrop" />
            {/* Nakładka (kolor tła + lekkie rozmycie) tylko w obszarze tekstu, zanikająca w prawo i w dół. */}
            <div className="vm-hero-veil absolute inset-0 bg-brand-bg-primary backdrop-blur-[3px]" />
          </div>
        )}

        <div className="max-w-xl motion-safe:animate-rise">
          <h1
            id="hero-title"
            className="font-brand-font-secondary text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance text-brand-primary sm:text-6xl lg:text-[4.25rem]"
          >
            Dieta i trening <span className="text-brand-secondary">w jednym planie</span>
          </h1>
          {/* TODO: dodaj do Typography props className ("mt-5 max-w-[46ch]"), wtedy wrapper nie będzie potrzebny.
              text-lg tylko po to, żeby ch liczyło się od rozmiaru tekstu jak wcześniej. */}
          <div className="mt-5 max-w-[46ch] text-lg">
            <Typography variant="lead" color="brand-text-secondary">
              Twórz jadłospisy z własnych produktów, generuj listy zakupów i układaj plany treningowe. Wszystko widzisz w
              jednym kalendarzu.
            </Typography>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              redirectPath={ROUTES.register}
              size="lg"
              label="Dołącz do nas"
              endIcon={<ArrowRight size={18} aria-hidden />}
              color="brand-text-button"
              colorBackground="brand-primary"
            />
            <LinkButton
              sectionPath={`#${SECTION_IDS.diet}`}
              size="lg"
              label="Jak to działa?"
              color="brand-text-primary"
              colorBorder="brand-text-tertiary"
              colorHover="brand-text-primary"
              colorBorderHover="brand-text-tertiary"
              colorBackgroundHover="brand-text-primary"
              colorBackgroundHoverCover={5}
            />
          </div>
        </div>

        {/* W wariancie backdrop na węższych ekranach panele zostają pod tekstem jak w układzie split. */}
        <div className={backdrop ? 'lg:hidden' : undefined}>
          <HeroStack />
        </div>
      </div>
    </section>
  )
}
