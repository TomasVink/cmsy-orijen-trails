import { getTrailById, getTrailLabels } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'

export const load = async ({
  params,
  fetch,
}: {
  params: { locale: Locale; id: string }
  fetch: typeof globalThis.fetch
}) => {
  const [trail, trailLabels] = await Promise.all([
    getTrailById(params.id, fetch, params.locale),
    getTrailLabels(fetch, params.locale),
  ])

  if (!trail) {
    error(404, 'Trail not found')
  }

  return { trail, trailLabels }
}
