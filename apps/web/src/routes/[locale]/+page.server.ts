import { getPageBySlug } from '$lib/payload.server'
import type { Locale } from '$lib/payload'
import { emptyTrailForm, trailSubmitAction } from '$lib/trail-submit.server'

export const load = async ({ fetch, params }: { fetch: typeof globalThis.fetch; params: { locale: Locale } }) => {
  const [page, form] = await Promise.all([
    getPageBySlug('home', fetch, params.locale),
    emptyTrailForm(),
  ])
  return { page, form }
}

export const actions = trailSubmitAction
