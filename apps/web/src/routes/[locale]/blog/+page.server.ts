import { getPosts } from '$lib/payload.server'
import type { Locale } from '$lib/payload'

const LIMIT = 12

export const load = async ({
  params,
  url,
  fetch
}: {
  params: { locale: Locale }
  url: URL
  fetch: typeof globalThis.fetch
}) => {
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
  const result = await getPosts(page, LIMIT, fetch, params.locale)

  return { posts: result.docs, page: result.page, totalPages: result.totalPages }
}
