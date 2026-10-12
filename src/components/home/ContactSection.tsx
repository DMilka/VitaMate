import { Info, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { CONTACT, CONTACT_TOPICS, SECTION_IDS, SOCIAL_LINKS } from '../../siteConfig'
import { Button } from '../../library/Buttons/Button/Button'
import { RedirectButton } from '../../library/Buttons/RedirectButton/RedirectButton'
import { FieldInput } from '../../library/Inputs/FieldInput/FieldInput'
import { SelectInput } from '../../library/Inputs/SelectInput/SelectInput'
import { Typography } from '../../library/Typography/Typography'
import { Field } from '../ui/Field'
import { SocialIcon } from '../ui/SocialIcon'
import { fieldA11y, textareaClasses } from '../ui/styles'

export function ContactSection() {
  return (
    <section id={SECTION_IDS.contact} aria-labelledby="contact-title" className="scroll-mt-16 bg-brand-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <Typography variant="heading-5xl" id="contact-title">
            Kontakt
          </Typography>
          <div className="mt-5">
            <Typography variant="subtitle" fontType="brand-font-secondary" color="brand-text-primary">
              Masz pytanie? Chętnie odpowiemy.
            </Typography>
          </div>
          <div className="mt-4 max-w-[50ch]">
            <Typography variant="body" color="brand-text-secondary">
              Napisz przez formularz albo skontaktuj się z nami bezpośrednio.
            </Typography>
          </div>

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
            <Typography variant="small" color="brand-text-secondary">
              Znajdziesz nas też tutaj
            </Typography>
            <ul className="mt-3 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  {/* TODO: dodaj do RedirectButton props aria-label ({`VitaMate: ${social.label}`}) */}
                  <RedirectButton
                    path={social.href}
                    startIcon={<SocialIcon icon={social.icon} />}
                    color="brand-primary"
                    colorBackground="brand-bg-tertiary"
                    colorHover="brand-text-button"
                    colorBackgroundHover="brand-primary"
                  />
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
        <Typography variant="small" color="brand-text-secondary">
          {label}
        </Typography>
        {children}
      </div>
    </li>
  )
}

type ContactValues = { firstName: string; lastName: string; email: string; topic: string; message: string }
type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMPTY: ContactValues = { firstName: '', lastName: '', email: '', topic: '', message: '' }

// Po id ustawiamy focus na pierwszym polu z błędem (FieldInput nie ma atrybutu name).
const FIELD_IDS: Record<keyof ContactValues, string> = {
  firstName: 'contact-first-name',
  lastName: 'contact-last-name',
  email: 'contact-email',
  topic: 'contact-topic',
  message: 'contact-message',
}
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
    const firstInvalid = Object.keys(nextErrors)[0] as keyof ContactValues | undefined
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
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
      <Typography variant="heading-xl" id="contact-form-title">
        Napisz do nas
      </Typography>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldInput
          id={FIELD_IDS.firstName}
          label="Imię"
          value={values.firstName}
          caption={errors.firstName}
          captionColor="brand-error"
          onChange={(e) => update('firstName', e.target.value)}
        />
        <FieldInput
          id={FIELD_IDS.lastName}
          label="Nazwisko"
          value={values.lastName}
          caption={errors.lastName}
          captionColor="brand-error"
          onChange={(e) => update('lastName', e.target.value)}
        />
      </div>

      <FieldInput
        id={FIELD_IDS.email}
        label="E-mail"
        type="email"
        value={values.email}
        placeholder="anna.kowalczyk@poczta.pl"
        caption={errors.email}
        captionColor="brand-error"
        onChange={(e) => update('email', e.target.value)}
      />

      <SelectInput
        id={FIELD_IDS.topic}
        label="Temat"
        placeholder="Wybierz najczęściej zadawane pytanie"
        elements={CONTACT_TOPICS.map((topic) => ({ name: topic, value: topic }))}
        value={values.topic}
        onChange={(value) => update('topic', value)}
        caption={errors.topic}
        captionColor="brand-error"
      />

      <Field id={FIELD_IDS.message} label="Wiadomość" error={errors.message}>
        <textarea
          {...fieldA11y(FIELD_IDS.message, errors.message)}
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
