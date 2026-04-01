import { env } from '$env/dynamic/public'
import type { Page, Media, Trail, Influencer } from '@repo/payload-types'

export type { Page, Media, Trail, Influencer }

export type Locale = 'nl' | 'en'

// ── Block types extracted from the Page layout union ─────────────
type LayoutBlock = NonNullable<Page['layout']>[number]
export type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
export type CampaignStepsBlock = Extract<LayoutBlock, { blockType: 'campaign-steps' }>
export type TopTrailsBlock = Extract<LayoutBlock, { blockType: 'top-trails' }>
export type TrailsOverviewBlock = Extract<LayoutBlock, { blockType: 'trails-overview' }>
export type SubmitTrailBlock = Extract<LayoutBlock, { blockType: 'submit-trail' }>
export type BlogBlock = Extract<LayoutBlock, { blockType: 'blog' }>
export type SocialButtonBlock = Extract<LayoutBlock, { blockType: 'social-button' }>
export type InfluencerCarouselBlock = Extract<LayoutBlock, { blockType: 'influencer-carousel' }>

// ── Pagination wrapper ────────────────────────────────────────────
export type PaginatedDocs<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// ── Media URL helper ──────────────────────────────────────────────
export function mediaUrl(
  media: Media | number | null | undefined,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
): string | null {
  if (!media || typeof media === 'number') return null
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${baseUrl}${media.url}`
  }
  if (media.filename) {
    return `${baseUrl}/api/media/file/${media.filename}`
  }
  return null
}

// ── Pages ─────────────────────────────────────────────────────────
export async function getPageBySlug(
  slug: string,
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl',
): Promise<Page | null> {
  const url = `${baseUrl}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1&locale=${locale}`
  const response = await fetchFn(url)
  if (!response.ok) return null
  const data = (await response.json()) as PaginatedDocs<Page>
  return data.docs[0] ?? null
}

export async function getAllPages(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl',
): Promise<Page[]> {
  const url = `${baseUrl}/api/pages?limit=100&locale=${locale}`
  const response = await fetchFn(url)
  if (!response.ok) return []
  const data = (await response.json()) as PaginatedDocs<Page>
  return data.docs
}

// ── Trails ────────────────────────────────────────────────────────
export type TrailFilters = {
  difficulty?: Trail['difficulty']
  terrain?: string
  region?: string
  featured?: boolean
}

export async function getTrailById(
  id: string,
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl',
): Promise<Trail | null> {
  const response = await fetchFn(`${baseUrl}/api/trails/${id}?depth=1&locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as Trail
}

export async function getTrails(
  filters: TrailFilters = {},
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl',
): Promise<Trail[]> {
  const params = new URLSearchParams()
  params.set('where[published][equals]', 'true')
  params.set('depth', '1')
  params.set('limit', '100')
  params.set('locale', locale)

  if (filters.difficulty) {
    params.set('where[difficulty][equals]', filters.difficulty)
  }
  if (filters.featured) {
    params.set('where[featured][equals]', 'true')
  }

  const response = await fetchFn(`${baseUrl}/api/trails?${params}`)
  if (!response.ok) return []
  const data = (await response.json()) as PaginatedDocs<Trail>
  return data.docs
}
