import { getTrailsPaginated, getTrailLabels } from '$lib/payload.server'
import type { Locale, TrailFilters } from '$lib/payload.server'

const LIMIT = 12

export const load = async ({
  params,
  url,
  fetch,
}: {
  params: { locale: Locale }
  url: URL
  fetch: typeof globalThis.fetch
}) => {
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))

  const filters: TrailFilters = {}

  const difficulty = url.searchParams.get('difficulty')
  if (difficulty) filters.difficulty = difficulty as TrailFilters['difficulty']

  const offLeashArea = url.searchParams.get('offLeashArea')
  if (offLeashArea) filters.offLeashArea = offLeashArea as TrailFilters['offLeashArea']

  if (url.searchParams.get('hospitality') === '1') filters.hospitality = true
  if (url.searchParams.get('water') === '1') filters.water = true
  if (url.searchParams.get('community') === '1') filters.community = true

  const distanceMin = url.searchParams.get('distanceMin')
  if (distanceMin) filters.distanceMin = Number(distanceMin)

  const distanceMax = url.searchParams.get('distanceMax')
  if (distanceMax) filters.distanceMax = Number(distanceMax)

  const [result, trailLabels] = await Promise.all([
    getTrailsPaginated(page, LIMIT, filters, fetch, params.locale),
    getTrailLabels(fetch, params.locale),
  ])

  return { trails: result.docs, page: result.page, totalPages: result.totalPages, trailLabels, filters }
}
