import { siFacebook, siInstagram, siTiktok, siYoutube, type SimpleIcon } from 'simple-icons'

export const ROUTES = {
  home: '/',
  register: '/rejestracja',
  login: '/logowanie',
} as const

export const SECTION_IDS = {
  diet: 'dieta',
  training: 'trening',
  pricing: 'cennik',
  contact: 'kontakt',
} as const

export const NAV_LINKS = [
  // "Jak to działa?" prowadzi do pierwszej sekcji, czyli Diety.
  { label: 'Jak to działa?', href: `#${SECTION_IDS.diet}` },
  { label: 'Dieta', href: `#${SECTION_IDS.diet}` },
  { label: 'Trening', href: `#${SECTION_IDS.training}` },
  { label: 'Cennik', href: `#${SECTION_IDS.pricing}` },
  { label: 'Kontakt', href: `#${SECTION_IDS.contact}` },
]

// TODO: dane przykładowe. Podmień na prawdziwe dane kontaktowe firmy.
export const CONTACT = {
  email: 'kontakt@vitamate.pl',
  phone: '+48 512 384 907',
  address: ['ul. Zielna 14/3', '30-418 Kraków'],
}

// TODO: podmień "#" na adresy profili VitaMate.
export const SOCIAL_LINKS: { label: string; href: string; icon: SimpleIcon }[] = [
  { label: 'Facebook', href: '#', icon: siFacebook },
  { label: 'Instagram', href: '#', icon: siInstagram },
  { label: 'TikTok', href: '#', icon: siTiktok },
  { label: 'YouTube', href: '#', icon: siYoutube },
]

export const CONTACT_TOPICS = [
  'Jak działa lista zakupów?',
  'Czy mogę dodać produkt, skanując kod kreskowy?',
  'Czym różnią się plany?',
  'Jak wyłączyć reklamy?',
  'Jak usunąć konto?',
  'Inne pytanie',
]
