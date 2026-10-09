import { Info, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { CONTACT, CONTACT_TOPICS, SECTION_IDS, SOCIAL_LINKS } from '../../siteConfig'
import { Button } from '../../library/Buttons/Button/Button'
import { Field } from '../ui/Field'
import { SocialIcon } from '../ui/SocialIcon'
import { fieldA11y, inputClasses, selectClasses, textareaClasses } from '../ui/styles'

export function ContactSection() {
  return (
    <section id={SECTION_IDS.contact} aria-labelledby="contact-title" className="scroll-mt-16 bg-brand-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Kontakt
          </h2>
          <p className="mt-5 font-display text-xl leading-snug text-brand-text-primary sm:text-2xl">
            Masz pytanie? Chętnie odpowiemy.
          </p>
          <p className="mt-4 max-w-[50ch] leading-relaxed text-brand-text-secondary">
            Napisz przez formularz albo skontaktuj się z nami bezpośrednio.
          </p>

          <ul className="mt-8 grid gap-4">
            <ContactRow icon={<Mail size={18} aria-hidden />} label="E-mail">
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-brand-primary underline-offset-4 hover:underline">
                {CONTACT.email}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone size={18} aria-hidden />} label="Telefon">
              <a
                href={`tel:${CONTACT.phone.replaceAll(' ', '')}`}
                className="font-medium text-brand-primary underline-offset-4 hover:underline"
              >
                {CONTACT.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin size={18} aria-hidden />} label="Siedziba">
              <address className="font-medium text-brand-text-primary not-italic">
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactRow>
          </ul>

          <div className="mt-8">
            <p className="text-sm text-brand-text-secondary">Znajdziesz nas też tutaj</p>
            <ul className="mt-3 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  {/* TODO: zamień na przycisk, który jest linkiem */}
                  <a
                    href={social.href}
                    aria-label={`VitaMate: ${social.label}`}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-brand-bg-tertiary text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-text-button"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-bg-tertiary text-brand-primary">
        {icon}
      </span>
      <div>
        <p className="text-sm text-brand-text-secondary">{label}</p>
        {children}
      </div>
    </li>
  )
}

type ContactValues = { firstName: string; lastName: string; email: string; topic: string; message: string }
type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMPTY: ContactValues = { firstName: '', lastName: '', email: '', topic: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.firstName.trim()) errors.firstName = 'Wpisz imię.'
  if (!values.lastName.trim()) errors.lastName = 'Wpisz nazwisko.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Wpisz poprawny adres e-mail.'
  if (!values.topic) errors.topic = 'Wybierz temat wiadomości.'
  if (values.message.trim().length < 10) errors.message = 'Wiadomość powinna mieć co najmniej 10 znaków.'
  return errors
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function update(key: keyof ContactValues, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setSubmitted(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // TODO: wysyłka wiadomości. Aktualnie brak funkcjonalności (potrzebny backend lub usługa e-mail).
    setSubmitted(true)
    setValues(EMPTY)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="grid gap-5 self-start rounded-2xl border border-brand-text-tertiary/25 bg-brand-bg-tertiary p-5 shadow-xl shadow-brand-primary/10 dark:shadow-black/40 sm:p-8"
    >
      <h3 id="contact-form-title" className="text-xl font-semibold">
        Napisz do nas
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-first-name" label="Imię" error={errors.firstName}>
          <input
            {...fieldA11y('contact-first-name', errors.firstName)}
            name="firstName"
            autoComplete="given-name"
            className={inputClasses}
            value={values.firstName}
            onChange={(e) => update('firstName', e.target.value)}
          />
        </Field>
        <Field id="contact-last-name" label="Nazwisko" error={errors.lastName}>
          <input
            {...fieldA11y('contact-last-name', errors.lastName)}
            name="lastName"
            autoComplete="family-name"
            className={inputClasses}
            value={values.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </Field>
      </div>

      <Field id="contact-email" label="E-mail" error={errors.email}>
        <input
          {...fieldA11y('contact-email', errors.email)}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="anna.kowalczyk@poczta.pl"
          className={inputClasses}
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </Field>

      <Field id="contact-topic" label="Temat" error={errors.topic}>
        <select
          {...fieldA11y('contact-topic', errors.topic)}
          name="topic"
          className={selectClasses}
          value={values.topic}
          onChange={(e) => update('topic', e.target.value)}
        >
          <option value="" disabled>
            Wybierz najczęściej zadawane pytanie
          </option>
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="Wiadomość" error={errors.message}>
        <textarea
          {...fieldA11y('contact-message', errors.message)}
          name="message"
          rows={5}
          placeholder="Opisz, w czym możemy pomóc."
          className={textareaClasses}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </Field>

      {submitted && (
        <p role="status" className="flex items-start gap-2 rounded-xl bg-brand-info/15 px-3.5 py-3 text-sm text-brand-info">
          <Info size={18} aria-hidden className="mt-px shrink-0" />
          Formularz działa poprawnie, ale wysyłka wiadomości nie jest jeszcze podłączona.
        </p>
      )}

      {/* TODO: dodaj do Button props type ("submit") i className ("w-full sm:w-fit"), wtedy wrapper nie będzie potrzebny */}
      <div className="flex flex-col sm:items-start">
        <Button
          label="Wyślij"
          startIcon={<Send size={16} aria-hidden />}
          color="brand-text-button"
          colorBackground="brand-primary"
        />
      </div>
    </form>
  )
}
