import { getPostBySlug } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'

export const load = async ({
  params,
  fetch,
  setHeaders,
}: {
  params: { locale: Locale; slug: string }
  fetch: typeof globalThis.fetch
  setHeaders: (h: Record<string, string>) => void
}) => {
  setHeaders({
    'Cache-Control': 'no-cache',
    'CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
  })
  const post = await getPostBySlug(params.slug, fetch, params.locale)

  if (!post) {
    error(404, `Post not found`)
  }

  return { post }
}
