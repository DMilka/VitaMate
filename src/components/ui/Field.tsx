import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { Typography } from '../../library/Typography/Typography'

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

/** Etykieta nad polem, podpowiedź i błąd pod polem. Pole ustawia aria-invalid i aria-describedby samo. */
export function Field({ id, label, error, hint, className = '', children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-brand-text-primary">
        {label}
      </label>
      {children}
      {hint && !error && (
        <Typography id={`${id}-hint`} variant="caption" color="brand-text-secondary">
          {hint}
        </Typography>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs font-medium text-brand-error">
          <CircleAlert size={14} aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
