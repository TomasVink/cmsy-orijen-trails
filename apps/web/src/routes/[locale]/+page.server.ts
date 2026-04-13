import { getPageBySlug, getEvents } from '$lib/payload.server'
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
  const events = hasEventsBlock ? await getEvents(fetch, params.locale) : []

  return { page, form, signUpForm, patchRequestForm, events }
}

export const actions = { ...trailSubmitAction, ...eventSignUpAction, ...patchRequestSubmitAction }
