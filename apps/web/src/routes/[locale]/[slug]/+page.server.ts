import { getPageBySlug, getEvents, getTrailsWithStores } from '$lib/payload.server'
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
  const hasPickupPointsBlock =
    page.layout?.some((b) => (b.blockType as string) === 'pickup-points') ?? false

  const [events, trailsWithStores] = await Promise.all([
    hasEventsBlock ? getEvents(fetch, params.locale) : Promise.resolve([]),
    hasPickupPointsBlock ? getTrailsWithStores(fetch, params.locale) : Promise.resolve([])
  ])

  return { page, form, signUpForm, events, trailsWithStores }
}

export const actions = { ...trailSubmitAction, ...eventSignUpAction }
