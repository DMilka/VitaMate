import { ArrowLeft, Hammer } from 'lucide-react'
import { Logo } from '../components/ui/Logo'
import { LinkButton } from '../library/Buttons/LinkButton/LinkButton'
import { ROUTES } from '../siteConfig'

/** Tymczasowa strona dla podstron, które powstaną w kolejnych etapach (rejestracja, logowanie). */
export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-brand-text-tertiary/25 bg-brand-bg-tertiary p-8 text-center shadow-xl shadow-brand-primary/10 dark:shadow-black/40">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-brand-accent-two/15 text-brand-accent-two">
            <Hammer size={22} aria-hidden />
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-brand-text-secondary">{description}</p>
          {/* TODO: dodaj do LinkButton props className ("mt-8"), wtedy wrapper nie będzie potrzebny */}
          <div className="mt-8">
            <LinkButton
              redirectPath={ROUTES.home}
              label="Wróć na stronę główną"
              startIcon={<ArrowLeft size={16} aria-hidden />}
              color="brand-text-button"
              colorBackground="brand-primary"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
