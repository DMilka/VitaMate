import { ContactSection } from '../components/home/ContactSection'
import { DietSection } from '../components/home/DietSection'
import { Hero } from '../components/home/Hero'
import { PricingSection } from '../components/home/PricingSection'
import { TrainingSection } from '../components/home/TrainingSection'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function HomePage() {
  return (
    <>
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-brand-text-button"
      >
        Przejdź do treści
      </a>
      <SiteHeader />
      <main id="tresc">
        <Hero />
        <DietSection />
        <TrainingSection />
        <PricingSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
