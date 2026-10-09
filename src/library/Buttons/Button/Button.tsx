import type { MouseEventHandler } from 'react'
import { buttonStyle, type ButtonStyleProps } from '../buttonStyles'

type ButtonProps = ButtonStyleProps & {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({ onClick, ...props }: ButtonProps) {
  const { className, style } = buttonStyle(props)

  return (
    <button onClick={onClick} style={style} className={className}>
      {props.startIcon}
      {props.label}
      {props.endIcon}
    </button>
  )
}
