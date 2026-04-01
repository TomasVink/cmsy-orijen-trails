import { getPageBySlug } from '$lib/payload.server'
import type { Locale } from '$lib/payload'

export const load = async ({ fetch, params }: { fetch: typeof globalThis.fetch; params: { locale: Locale } }) => {
  const page = await getPageBySlug('home', fetch, params.locale)
  return { page }
}
