type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'inverse'
type ButtonSize = 'sm' | 'md' | 'lg'

const buttonBase =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[filter,background-color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

// Rozmiar jako osobny parametr, żeby w className nie nadpisywać h-*/px-* (kolejność klas w CSS nie jest gwarantowana).
const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

// Hover: przycisk ciemnieje w jasnym motywie i jaśnieje w ciemnym, co podnosi kontrast napisu.
const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-brand-text-button hover:brightness-90 dark:hover:brightness-110',
  secondary: 'bg-brand-secondary text-brand-text-button hover:brightness-90 dark:hover:brightness-110',
  tertiary: 'bg-brand-tertiary text-brand-text-button hover:brightness-90 dark:hover:brightness-110',
  outline: 'border border-brand-text-tertiary text-brand-text-primary hover:bg-brand-text-primary/5',
  // Na tle brand-primary (np. wyróżniona karta w cenniku).
  inverse: 'bg-brand-text-button text-brand-primary hover:brightness-95 dark:hover:brightness-110',
}

export function buttonClasses(variant: ButtonVariant = 'primary', className = '', size: ButtonSize = 'md'): string {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`
}

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
