import { LogIn, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../library/Buttons/Button/Button'
import { LinkButton } from '../../library/Buttons/LinkButton/LinkButton'
import { NAV_LINKS, ROUTES } from '../../siteConfig'
import { Logo } from '../ui/Logo'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-brand-text-tertiary/20 bg-brand-bg-primary/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Główna nawigacja" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-brand-text-primary transition-colors hover:bg-brand-text-primary/5 hover:text-brand-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LinkButton
              redirectPath={ROUTES.login}
              size="sm"
              label="Zaloguj się"
              startIcon={<LogIn size={16} aria-hidden />}
              color="brand-text-primary"
              colorBorder="brand-text-tertiary"
              colorHover="brand-text-primary"
              colorBorderHover="brand-text-tertiary"
              colorBackgroundHover="brand-text-primary"
              colorBackgroundHoverCover={5}
            />
          </div>
          {/* TODO: dodaj do Button props type ("button"), aria-expanded ({menuOpen}), aria-controls ("mobile-menu"),
              aria-label (menuOpen ? 'Zamknij menu' : 'Otwórz menu') i className ("lg:hidden"), wtedy wrapper nie będzie potrzebny */}
          <div className="lg:hidden">
            <Button
              startIcon={menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
              color="brand-text-primary"
              colorHover="brand-text-primary"
              colorBackgroundHover="brand-text-primary"
              colorBackgroundHoverCover={5}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-brand-text-tertiary/20 lg:hidden motion-safe:animate-pop-in">
          <nav aria-label="Menu" className="mx-auto max-w-7xl px-4 pt-2 pb-4 sm:px-6">
            <ul className="grid">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-brand-text-primary transition-colors hover:bg-brand-text-primary/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* TODO: dodaj do LinkButton props className ("mt-3"), wtedy wrapper nie będzie potrzebny */}
            <div className="mt-3">
              <LinkButton
                redirectPath={ROUTES.login}
                label="Zaloguj się"
                startIcon={<LogIn size={16} aria-hidden />}
                color="brand-text-button"
                colorBackground="brand-primary"
                fullWidth
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
