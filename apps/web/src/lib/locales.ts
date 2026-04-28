import { env } from '$env/dynamic/public'

const raw = env.PUBLIC_AVAILABLE_LANGUAGES ?? 'nl,en'
export const LOCALES: string[] = raw
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

export const DEFAULT_LOCALE = LOCALES[0] ?? 'nl'

export function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE
  for (const part of acceptLanguage.split(',')) {
    const lang = part.trim().split(';')[0].split('-')[0].toLowerCase()
    if (LOCALES.includes(lang)) return lang
  }
  return DEFAULT_LOCALE
}
