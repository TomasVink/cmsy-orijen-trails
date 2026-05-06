import type { Handle } from '@sveltejs/kit'
import { LOCALES, getPreferredLocale } from '$lib/locales'

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url
  const firstSegment = pathname.split('/')[1]

  if (!LOCALES.includes(firstSegment)) {
    const locale = getPreferredLocale(event.request.headers.get('accept-language'))
    return new Response(null, {
      status: 307,
      headers: {
        Location: `/${locale}${pathname}`,
        'Cache-Control': 'no-store',
      },
    })
  }

  const response = await resolve(event)

  if (response.status >= 400) {
    response.headers.set('Cache-Control', 'no-store')
  }

  return response
}
