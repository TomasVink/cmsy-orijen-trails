import { getPageBySlug } from '$lib/payload.server'
import type { Locale } from '$lib/payload'
import { superValidate, fail } from 'sveltekit-superforms'
import { zod4 as zod } from 'sveltekit-superforms/adapters'
import { trailSubmitSchema } from '$lib/trail-submit-schema'
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'

function payloadUrl() {
  return env.PAYLOAD_INTERNAL_URL || publicEnv.PUBLIC_PAYLOAD_URL
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = publicEnv.PUBLIC_HERE_API_KEY
  if (!apiKey) return null
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json() as { items?: { position?: { lat: number; lng: number } }[] }
  return data.items?.[0]?.position ?? null
}

export const load = async ({ fetch, params }: { fetch: typeof globalThis.fetch; params: { locale: Locale } }) => {
  const [page, form] = await Promise.all([
    getPageBySlug('home', fetch, params.locale),
    superValidate(zod(trailSubmitSchema)),
  ])
  return { page, form }
}

export const actions = {
  submitTrail: async ({ request }) => {
    const form = await superValidate(request, zod(trailSubmitSchema))
    if (!form.valid) return fail(400, { form })

    const { address, name, email, lat, lng, ...trailData } = form.data

    const coordinates = (lat !== undefined && lng !== undefined)
      ? { lat, lng }
      : await geocodeAddress(address)

    const body: Record<string, unknown> = {
      ...trailData,
      community: true,
      published: false,
      description: [
        trailData.description,
        `Submitted by: ${name} <${email}>`,
        `Address: ${address}`,
      ].filter(Boolean).join('\n\n'),
    }

    if (coordinates) {
      body.coordinates = coordinates
    }

    const res = await fetch(`${payloadUrl()}/api/trails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return fail(500, { form })
    }

    return { form }
  },
}
