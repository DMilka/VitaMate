import type { MouseEventHandler } from 'react'
import { Link } from 'react-router'
import { buttonStyle, type ButtonStyleProps } from '../buttonStyles'

// sectionPath: pełny href do sekcji, np. "#dieta" (renderuje <a>).
// redirectPath: ścieżka w aplikacji, np. "/rejestracja" (renderuje Link). Nie można podać obu naraz.
type LinkButtonPath = { sectionPath?: string; redirectPath?: never } | { redirectPath?: string; sectionPath?: never }

type LinkButtonProps = ButtonStyleProps &
  LinkButtonPath & {
    onClick?: MouseEventHandler<HTMLAnchorElement>
  }

/** Przycisk będący linkiem wewnątrz aplikacji. */
export function LinkButton({ sectionPath, redirectPath, onClick, ...props }: LinkButtonProps) {
  const { className, style } = buttonStyle(props)
  const content = (
    <>
      {props.startIcon}
      {props.label}
      {props.endIcon}
    </>
  )

  if (redirectPath !== undefined) {
    return (
      <Link to={redirectPath} onClick={onClick} style={style} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a href={sectionPath} onClick={onClick} style={style} className={className}>
      {content}
    </a>
  )
}
