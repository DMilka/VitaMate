import { Leaf } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '../../siteConfig'

export function Logo() {
  return (
    <Link to={ROUTES.home} className="inline-flex items-center gap-2.5 rounded-xl" aria-label="VitaMate, strona główna">
      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-primary text-brand-text-button">
        <Leaf size={18} strokeWidth={2} aria-hidden />
      </span>
      <span className="font-brand-font-secondary text-xl font-semibold tracking-tight text-brand-primary">VitaMate</span>
    </Link>
  )
}
