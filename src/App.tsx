import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { ROUTES } from './siteConfig'

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route
        path={ROUTES.register}
        element={<PlaceholderPage title="Rejestracja" description="Formularz rejestracji powstanie w kolejnym etapie." />}
      />
      <Route
        path={ROUTES.login}
        element={<PlaceholderPage title="Logowanie" description="Logowanie powstanie w kolejnym etapie." />}
      />
      <Route
        path="*"
        element={<PlaceholderPage title="Nie ma takiej strony" description="Sprawdź adres albo wróć na stronę główną." />}
      />
    </Routes>
  )
}
