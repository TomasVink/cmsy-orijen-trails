import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'

const LOCALES = ['nl', 'en']
const DEFAULT_LOCALE = 'nl'

function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE

  for (const part of acceptLanguage.split(',')) {
    const lang = part.trim().split(';')[0].split('-')[0].toLowerCase()
    if (LOCALES.includes(lang)) return lang
  }

  return DEFAULT_LOCALE
}

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url
  const firstSegment = pathname.split('/')[1]

  if (!LOCALES.includes(firstSegment)) {
    const locale = getPreferredLocale(event.request.headers.get('accept-language'))
    redirect(307, `/${locale}${pathname}`)
  }

  return resolve(event)
}
