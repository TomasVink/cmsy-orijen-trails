import { redirect } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { getPreferredLocale } from '$lib/locales'

export const load = ({ request }: RequestEvent) => {
  const locale = getPreferredLocale(request.headers.get('accept-language'))
  redirect(307, `/${locale}`)
}
