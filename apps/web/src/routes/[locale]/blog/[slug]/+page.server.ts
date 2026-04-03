import { getPostBySlug } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'

export const load = async ({
  params,
  fetch,
}: {
  params: { locale: Locale; slug: string }
  fetch: typeof globalThis.fetch
}) => {
  const post = await getPostBySlug(params.slug, fetch, params.locale)

  if (!post) {
    error(404, `Post not found`)
  }

  return { post }
}
