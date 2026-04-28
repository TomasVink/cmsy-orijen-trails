import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'
import { getTrailLabels, getUiLabels, getSignUpLabels } from '$lib/payload.server'
import { LOCALES } from '$lib/locales'

export const load = async ({
  params,
  fetch,
}: {
  params: { locale: string }
  fetch: typeof globalThis.fetch
}) => {
  if (!LOCALES.includes(params.locale)) {
    error(404, 'Not found')
  }
  const locale = params.locale as Locale
  const [trailLabels, uiLabels, signUpLabels] = await Promise.all([
    getTrailLabels(fetch, locale),
    getUiLabels(fetch, locale),
    getSignUpLabels(fetch, locale),
  ])
  return { locale, trailLabels, uiLabels, signUpLabels }
}
