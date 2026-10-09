import type { MouseEventHandler } from 'react'
import { buttonStyle, type ButtonStyleProps } from '../buttonStyles'

type RedirectButtonProps = ButtonStyleProps & {
  /** Adres zewnętrzny, np. profil w serwisie społecznościowym. */
  path?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

/** Przycisk będący linkiem do zewnętrznej strony. */
export function RedirectButton({ path, onClick, ...props }: RedirectButtonProps) {
  const { className, style } = buttonStyle(props)

  return (
    <a href={path} onClick={onClick} style={style} className={className}>
      {props.startIcon}
      {props.label}
      {props.endIcon}
    </a>
  )
}
