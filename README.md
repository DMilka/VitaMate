# VitaMate - aplikacja webowa

React 19 + TypeScript + Vite, Tailwind CSS v4, ikony lucide-react, fonty Outfit i Geist (Fontsource, hostowane lokalnie).

## Uruchomienie

```bash
npm install
npm run dev      # serwer deweloperski
npm run build    # build produkcyjny do dist/
npm run lint
npm test         # testy logiki (Vitest)
```

## Motyw jasny i ciemny

Motyw ustawia wpis `vita-mate-theme` w localStorage: `"light"` albo `"dark"`.
Bez wpisu strona używa ustawień systemu. Po zmianie wpisu odśwież stronę.

```js
localStorage.setItem('vita-mate-theme', 'dark')
```

## Kolory

Wszystkie kolory są w `src/index.css` jako tokeny `brand-*` (wartości dla motywu jasnego w `@theme`,
dla ciemnego pod `:root[data-theme='dark']`). W komponentach używaj wyłącznie klas z tymi tokenami,
np. `bg-brand-bg-primary`, `text-brand-text-primary`, `bg-brand-accent-one/15 text-brand-accent-one`.

## Struktura

- `src/siteConfig.ts` - trasy, nawigacja, dane kontaktowe, social media, tematy formularza
- `src/components/home` - sekcje strony głównej
- `src/components/demo` - interaktywne dema modułów Dieta i Trening (bez zapisu danych)
- `src/lib` - typy i logika (makroskładniki, lista zakupów, objętość treningu) z testami
- `src/data` - przykładowe dane dla dem

## Do zrobienia (TODO w kodzie)

- Zakup planów (`PricingSection.tsx`) i prawdziwe ceny
- Wysyłka formularza kontaktowego (`ContactSection.tsx`)
- Prawdziwe dane kontaktowe i linki do profili (`siteConfig.ts`)
- Zrzuty ekranu aplikacji zamiast wymyślonych paneli w hero (`HeroStack.tsx`)
- Strony rejestracji i logowania
