import { Typography } from '../../library/Typography/Typography'
import { NAV_LINKS } from '../../siteConfig'
import { Logo } from '../ui/Logo'

export function SiteFooter() {
  const links = NAV_LINKS.filter((link) => link.label !== 'Jak to działa?')

  return (
    <footer className="border-t border-brand-text-tertiary/20 bg-brand-bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="grid gap-2">
          <Logo />
          <Typography variant="small" color="brand-text-secondary">
            Dieta, zakupy i treningi w jednym planie.
          </Typography>
        </div>
        <nav aria-label="Stopka">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-brand-text-primary transition-colors hover:text-brand-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-brand-text-tertiary/20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Typography variant="caption" color="brand-text-secondary">
            {`© ${new Date().getFullYear()} VitaMate`}
          </Typography>
        </div>
      </div>
    </footer>
  )
}
