const fieldBase =
  'w-full rounded-xl border border-brand-text-tertiary bg-brand-bg-primary px-3.5 text-base text-brand-text-primary transition-colors placeholder:text-brand-text-tertiary hover:border-brand-text-secondary aria-[invalid=true]:border-brand-error'

// text-base (16 px) w polach, żeby iOS nie powiększał strony przy fokusie.
export const inputClasses = `${fieldBase} h-11`
export const selectClasses = `${fieldBase} h-11 pr-3`
export const textareaClasses = `${fieldBase} min-h-32 resize-y py-2.5`

/** Atrybuty dostępności dla pola powiązanego z Field. */
export function fieldA11y(id: string, error?: string, hint?: string) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy }
}
