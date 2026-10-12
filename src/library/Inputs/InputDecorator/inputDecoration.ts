import { createContext, useContext } from 'react'
import type { BrandColor } from '../../colors'

/** Kolory pól ustawiane przez InputDecorator. Bez dekoratora pola mają kolory domyślne. */
export type InputDecoration = {
  /** Kolory elementu w panelu na hover (opcja listy, dzień kalendarza, godzina). Domyślnie tekst brand-text-primary i tło brand-primary 10%. */
  colorElementHover?: BrandColor
  colorBackgroundElementHover?: BrandColor
  /** Kolory wybranego elementu, bez zmiany na hover. Domyślnie tekst brand-primary i tło brand-primary 15%. */
  colorElement?: BrandColor
  colorBackgroundElement?: BrandColor
  /** Kolory ikon w polu (na końcu też strzałka, kalendarz, zegar). Bez koloru ikona ma kolor ramki pola. */
  startIconColor?: BrandColor
  /** Bez koloru tła ikona nie ma tła. */
  startIconColorBackground?: BrandColor
  endIconColor?: BrandColor
  endIconColorBackground?: BrandColor
}

export const InputDecorationContext = createContext<InputDecoration>({})

/** Kolory z najbliższego InputDecorator (albo puste, gdy pole nie jest opakowane). */
export function useInputDecoration(): InputDecoration {
  return useContext(InputDecorationContext)
}
