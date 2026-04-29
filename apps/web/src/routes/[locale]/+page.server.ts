import { getPageBySlug, getEvents, getTrailsWithStores } from '$lib/payload.server'
import type { Locale } from '$lib/payload'
import { emptyTrailForm, trailSubmitAction } from '$lib/trail-submit.server'
import { emptySignUpForm, eventSignUpAction } from '$lib/events-signup.server'
import { emptyPatchRequestForm, patchRequestSubmitAction } from '$lib/patch-request-submit.server'

export const load = async ({ fetch, params }: { fetch: typeof globalThis.fetch; params: { locale: Locale } }) => {
  const [page, form, signUpForm, patchRequestForm] = await Promise.all([
    getPageBySlug('home', fetch, params.locale),
    emptyTrailForm(),
    emptySignUpForm(),
    emptyPatchRequestForm(),
  ])

  const hasEventsBlock = page?.layout?.some((b) => (b.blockType as string) === 'events') ?? false
  const hasPickupPointsBlock = page?.layout?.some((b) => (b.blockType as string) === 'pickup-points') ?? false

  const [events, trailsWithStores] = await Promise.all([
    hasEventsBlock ? getEvents(fetch, params.locale) : Promise.resolve([]),
    hasPickupPointsBlock ? getTrailsWithStores(fetch, params.locale) : Promise.resolve([])
  ])

  return { page, form, signUpForm, patchRequestForm, events, trailsWithStores }
}

export const actions = { ...trailSubmitAction, ...eventSignUpAction, ...patchRequestSubmitAction }
