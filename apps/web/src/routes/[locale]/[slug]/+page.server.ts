import { getPageBySlug, getEvents } from '$lib/payload.server'
import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'
import { emptyTrailForm, trailSubmitAction } from '$lib/trail-submit.server'
import { emptySignUpForm, eventSignUpAction } from '$lib/events-signup.server'

export const load = async ({
  params,
  fetch
}: {
  params: { locale: Locale; slug: string }
  fetch: typeof globalThis.fetch
}) => {
  const [page, form, signUpForm] = await Promise.all([
    getPageBySlug(params.slug, fetch, params.locale),
    emptyTrailForm(),
    emptySignUpForm()
  ])

  if (!page) {
    error(404, `Page not found`)
  }

  const hasEventsBlock = page.layout?.some((b) => b.blockType === 'events') ?? false
  const events = hasEventsBlock ? await getEvents(fetch, params.locale) : []

  return { page, form, signUpForm, events }
}

export const actions = { ...trailSubmitAction, ...eventSignUpAction }
