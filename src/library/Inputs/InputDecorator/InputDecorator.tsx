import type { ReactNode } from 'react'
import { InputDecorationContext, useInputDecoration, type InputDecoration } from './inputDecoration'

type InputDecoratorProps = InputDecoration & {
  children: ReactNode
}

/**
 * Kolory dla wszystkich pól wewnątrz (FieldInput, SelectInput, DatePicker, TimePicker), na dowolnej głębokości.
 * Nie renderuje żadnego elementu. Zagnieżdżony dekorator nadpisuje tylko podane przez siebie kolory.
 */
export function InputDecorator({ children, ...decoration }: InputDecoratorProps) {
  const parent = useInputDecoration()
  return <InputDecorationContext value={{ ...parent, ...decoration }}>{children}</InputDecorationContext>
}
