let counter = 0

/** Lokalny identyfikator dla danych demo (nie trafiają na serwer). */
export function createId(prefix: string): string {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}-${counter}`
}
