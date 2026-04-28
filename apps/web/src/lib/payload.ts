import { env } from '$env/dynamic/public'
import type { Page, Media, Trail, Influencer, Post, Event, Store } from '@repo/payload-types'

export type { Page, Media, Trail, Influencer, Post, Event, Store }

export type Locale = 'nl' | 'en'

// ── Block types extracted from the Page layout union ─────────────
type LayoutBlock = NonNullable<Page['layout']>[number]
export type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
export type CampaignStepsBlock = Extract<LayoutBlock, { blockType: 'campaign-steps' }>
export type TopTrailsBlock = Extract<LayoutBlock, { blockType: 'top-trails' }>
export type TrailsOverviewBlock = Extract<LayoutBlock, { blockType: 'trails-overview' }>
export type UserFormBlock = Extract<LayoutBlock, { blockType: 'user-form' }>
/** @deprecated use UserFormBlock */
export type SubmitTrailBlock = UserFormBlock
export type BlogBlock = Extract<LayoutBlock, { blockType: 'blog' }>
export type SocialButtonBlock = Extract<LayoutBlock, { blockType: 'social-button' }>
export type InfluencerCarouselBlock = Extract<LayoutBlock, { blockType: 'influencer-carousel' }>
export type EventsBlock = Extract<LayoutBlock, { blockType: 'events' }>
export type CTABlock = Extract<LayoutBlock, { blockType: 'cta-block' }>
export type FAQBlock = Extract<LayoutBlock, { blockType: 'faq' }>

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
  baseUrl = env.PUBLIC_PAYLOAD_URL
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
  locale: Locale = 'nl'
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
  locale: Locale = 'nl'
): Promise<Page[]> {
  const url = `${baseUrl}/api/pages?limit=100&locale=${locale}`
  const response = await fetchFn(url)
  if (!response.ok) return []
  const data = (await response.json()) as PaginatedDocs<Page>
  return data.docs
}

// ── Posts ─────────────────────────────────────────────────────────
export async function getPostBySlug(
  slug: string,
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<Post | null> {
  const url = `${baseUrl}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1&locale=${locale}`
  const response = await fetchFn(url)
  if (!response.ok) return null
  const data = (await response.json()) as PaginatedDocs<Post>
  return data.docs[0] ?? null
}

export async function getPosts(
  page = 1,
  limit = 12,
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<PaginatedDocs<Post>> {
  const params = new URLSearchParams()
  params.set('depth', '1')
  params.set('limit', String(limit))
  params.set('page', String(page))
  params.set('locale', locale)
  const response = await fetchFn(`${baseUrl}/api/posts?${params}`)
  if (!response.ok)
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null
    }
  return (await response.json()) as PaginatedDocs<Post>
}

// ── Trail Labels global ───────────────────────────────────────────
export type TrailLabelsData = {
  approvedTrail: string
  communityTrail: string
  difficulty?: {
    easy?: string | null
    moderate?: string | null
    challenging?: string | null
  } | null
  offLeash?: { fully?: string | null; partial?: string | null; none?: string | null } | null
  hospitality?: string | null
  water?: string | null
  allDifficulties?: string | null
  viewTrail?: string | null
  viewAllTrails?: string | null
  form?: {
    nameLabel?: string | null
    emailLabel?: string | null
    trailNameLabel?: string | null
    descriptionLabel?: string | null
    descriptionHint?: string | null
    linkLabel?: string | null
    linkPlaceholder?: string | null
    addressLabel?: string | null
    distanceLabel?: string | null
    offLeashAreaLabel?: string | null
    offLeashAreaPlaceholder?: string | null
    hospitalityLabel?: string | null
    waterLabel?: string | null
  } | null
}

export type UiLabelsData = {
  back?: string | null
  continueReading?: string | null
  followOn?: string | null
  submitting?: string | null
  mapZoomHint?: string | null
  mapZoomHintMac?: string | null
  patchRequestForm?: {
    nameLabel?: string | null
    emailLabel?: string | null
    streetAddressLabel?: string | null
    postcodeLabel?: string | null
    cityLabel?: string | null
    countryLabel?: string | null
    imageLabel?: string | null
    patchLabel?: string | null
    submitLabel?: string | null
  } | null
  trailFilters?: {
    difficulty?: string | null
    offLeash?: string | null
    distance?: string | null
    features?: string | null
    community?: string | null
    clear?: string | null
    distanceRange0to5?: string | null
    distanceRange5to10?: string | null
    distanceRange10to15?: string | null
    distanceRange15plus?: string | null
  } | null
}

export async function getUiLabels(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<UiLabelsData | null> {
  const response = await fetchFn(`${baseUrl}/api/globals/ui-labels?locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as UiLabelsData
}

export async function getTrailLabels(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<TrailLabelsData | null> {
  const response = await fetchFn(`${baseUrl}/api/globals/trail-labels?locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as TrailLabelsData
}

// ── Trails ────────────────────────────────────────────────────────
export type TrailFilters = {
  difficulty?: Trail['difficulty']
  offLeashArea?: Trail['offLeashArea']
  hospitality?: boolean
  water?: boolean
  community?: boolean
  distanceMin?: number
  distanceMax?: number
}

export async function getTrailById(
  id: string,
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<Trail | null> {
  const response = await fetchFn(`${baseUrl}/api/trails/${id}?depth=2&locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as Trail
}

export async function getTrails(
  filters: TrailFilters = {},
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<Trail[]> {
  const params = new URLSearchParams()
  params.set('where[published][equals]', 'true')
  params.set('depth', '1')
  params.set('limit', '100')
  params.set('locale', locale)

  if (filters.difficulty) {
    params.set('where[difficulty][equals]', filters.difficulty)
  }
  if (filters.offLeashArea) {
    params.set('where[offLeashArea][equals]', filters.offLeashArea)
  }
  if (filters.hospitality) {
    params.set('where[hospitality][equals]', 'true')
  }
  if (filters.water) {
    params.set('where[water][equals]', 'true')
  }
  if (filters.community) {
    params.set('where[community][equals]', 'true')
  }
  if (filters.distanceMin !== undefined) {
    params.set('where[distance][greater_than_equal]', String(filters.distanceMin))
  }
  if (filters.distanceMax !== undefined) {
    params.set('where[distance][less_than_equal]', String(filters.distanceMax))
  }

  const response = await fetchFn(`${baseUrl}/api/trails?${params}`)
  if (!response.ok) return []
  const data = (await response.json()) as PaginatedDocs<Trail>
  return data.docs
}

// ── Sign Up Labels global ─────────────────────────────────────────
export type SignUpLabelsData = {
  nameLabel?: string | null
  emailLabel?: string | null
  phoneLabel?: string | null
  phonePlaceholder?: string | null
  submitLabel?: string | null
  successTitle?: string | null
  successMessage?: string | null
  fullyBooked?: string | null
  peopleLabel?: string | null
  dogsLabel?: string | null
  otherLabel?: string | null
}

// ── Nav Items global ──────────────────────────────────────────────
export type NavItemsData = {
  logoLink?: string | null
  highlightedLink?: {
    label?: string | null
    url?: string | null
    openInNewTab?: boolean | null
  } | null
  items?: Array<{
    label?: string | null
    url?: string | null
    openInNewTab?: boolean | null
    id?: string | null
  }> | null
}

export async function getNavItems(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<NavItemsData | null> {
  const response = await fetchFn(`${baseUrl}/api/globals/nav-items?locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as NavItemsData
}

export async function getSignUpLabels(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<SignUpLabelsData | null> {
  const response = await fetchFn(`${baseUrl}/api/globals/sign-up-labels?locale=${locale}`)
  if (!response.ok) return null
  return (await response.json()) as SignUpLabelsData
}

// ── Events ────────────────────────────────────────────────────────
export async function getEvents(
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<Event[]> {
  const today = new Date().toISOString().slice(0, 10)
  const params = new URLSearchParams()
  params.set('where[published][equals]', 'true')
  params.set('where[date][greater_than_equal]', today)
  params.set('depth', '2')
  params.set('limit', '50')
  params.set('sort', 'date')
  params.set('locale', locale)
  const response = await fetchFn(`${baseUrl}/api/events?${params}`)
  if (!response.ok) return []
  const data = (await response.json()) as PaginatedDocs<Event>
  return data.docs
}

export async function getTrailsPaginated(
  page = 1,
  limit = 12,
  filters: TrailFilters = {},
  fetchFn: typeof fetch = fetch,
  baseUrl = env.PUBLIC_PAYLOAD_URL,
  locale: Locale = 'nl'
): Promise<PaginatedDocs<Trail>> {
  const params = new URLSearchParams()
  params.set('where[published][equals]', 'true')
  params.set('depth', '1')
  params.set('limit', String(limit))
  params.set('page', String(page))
  params.set('locale', locale)

  if (filters.difficulty) {
    params.set('where[difficulty][equals]', filters.difficulty)
  }
  if (filters.offLeashArea) {
    params.set('where[offLeashArea][equals]', filters.offLeashArea)
  }
  if (filters.hospitality) {
    params.set('where[hospitality][equals]', 'true')
  }
  if (filters.water) {
    params.set('where[water][equals]', 'true')
  }
  if (filters.community) {
    params.set('where[community][equals]', 'true')
  }
  if (filters.distanceMin !== undefined) {
    params.set('where[distance][greater_than_equal]', String(filters.distanceMin))
  }
  if (filters.distanceMax !== undefined) {
    params.set('where[distance][less_than_equal]', String(filters.distanceMax))
  }

  const response = await fetchFn(`${baseUrl}/api/trails?${params}`)
  if (!response.ok)
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null
    }
  return (await response.json()) as PaginatedDocs<Trail>
}
