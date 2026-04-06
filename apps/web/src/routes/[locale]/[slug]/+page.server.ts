import { getPageBySlug } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'
import { emptyTrailForm, trailSubmitAction } from '$lib/trail-submit.server'

export const load = async ({
  params,
  fetch,
}: {
  params: { locale: Locale; slug: string }
  fetch: typeof globalThis.fetch
}) => {
  const [page, form] = await Promise.all([
    getPageBySlug(params.slug, fetch, params.locale),
    emptyTrailForm(),
  ])

  if (!page) {
    error(404, `Page not found`)
  }

  return { page, form }
}

export const actions = trailSubmitAction
