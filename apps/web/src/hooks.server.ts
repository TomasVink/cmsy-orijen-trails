import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'
import { LOCALES, getPreferredLocale } from '$lib/locales'

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url
  const firstSegment = pathname.split('/')[1]

  if (!LOCALES.includes(firstSegment)) {
    const locale = getPreferredLocale(event.request.headers.get('accept-language'))
    redirect(307, `/${locale}${pathname}`)
  }

  return resolve(event)
}
