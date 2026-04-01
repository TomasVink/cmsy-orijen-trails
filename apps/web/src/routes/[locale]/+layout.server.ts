import { error } from '@sveltejs/kit'
import type { Locale } from '$lib/payload'

const LOCALES: Locale[] = ['nl', 'en']

export const load = ({ params }: { params: { locale: string } }) => {
  if (!LOCALES.includes(params.locale as Locale)) {
    error(404, 'Not found')
  }
  return { locale: params.locale as Locale }
}
