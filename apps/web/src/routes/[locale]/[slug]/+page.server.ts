import { getPageBySlug } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'

export const load = async ({
  params,
  fetch,
}: {
  params: { locale: Locale; slug: string }
  fetch: typeof globalThis.fetch
}) => {
  const page = await getPageBySlug(params.slug, fetch, params.locale)

  if (!page) {
    error(404, `Page not found`)
  }

  return { page }
}
