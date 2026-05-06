import type { RequestEvent } from '@sveltejs/kit'
import { getPreferredLocale } from '$lib/locales'

export const load = ({ request }: RequestEvent) => {
  const locale = getPreferredLocale(request.headers.get('accept-language'))
  return new Response(null, {
    status: 307,
    headers: { Location: `/${locale}`, 'Cache-Control': 'no-store' },
  })
}
