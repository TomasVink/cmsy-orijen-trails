/**
 * Server-only Payload client.
 *
 * Uses PAYLOAD_INTERNAL_URL (e.g. http://cms:3000) for SSR fetches so
 * requests stay on the Docker internal network. Falls back to PUBLIC_PAYLOAD_URL
 * in local dev where PAYLOAD_INTERNAL_URL is not set.
 *
 * Import from here in +page.server.ts / +layout.server.ts files.
 * Never import from this module in client-side code.
 */
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import { getAllPages as _getAllPages, getPageBySlug as _getPageBySlug, getTrails as _getTrails } from './payload'

export type { Page, Media, PaginatedDocs, Locale, TrailFilters } from './payload'

function internalUrl(): string {
  return env.PAYLOAD_INTERNAL_URL || publicEnv.PUBLIC_PAYLOAD_URL
}

export function getPageBySlug(slug: string, fetchFn: typeof fetch = fetch, locale: import('./payload').Locale = 'nl') {
  return _getPageBySlug(slug, fetchFn, internalUrl(), locale)
}

export function getAllPages(fetchFn: typeof fetch = fetch, locale: import('./payload').Locale = 'nl') {
  return _getAllPages(fetchFn, internalUrl(), locale)
}

export function getTrails(filters: import('./payload').TrailFilters = {}, fetchFn: typeof fetch = fetch, locale: import('./payload').Locale = 'nl') {
  return _getTrails(filters, fetchFn, internalUrl(), locale)
}
