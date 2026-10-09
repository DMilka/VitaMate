import { ArrowLeft, Hammer } from 'lucide-react'
import { Link } from 'react-router'
import { Logo } from '../components/ui/Logo'
import { buttonClasses } from '../components/ui/styles'
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
          <Link to={ROUTES.home} className={buttonClasses('primary', 'mt-8')}>
            <ArrowLeft size={16} aria-hidden />
            Wróć na stronę główną
          </Link>
        </div>
      </main>
    </div>
  )
}
