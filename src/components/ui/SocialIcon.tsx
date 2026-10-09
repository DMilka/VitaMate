import type { SimpleIcon } from 'simple-icons'

/** Logo serwisu z pakietu simple-icons (CC0), w kolorze bieżącego tekstu. */
export function SocialIcon({ icon, size = 18 }: { icon: SimpleIcon; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden focusable="false">
      <path d={icon.path} />
    </svg>
  )
}
w