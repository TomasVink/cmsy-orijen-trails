import { superValidate, fail } from 'sveltekit-superforms'
import { zod4 as zod } from 'sveltekit-superforms/adapters'
import { eventsSignUpSchema } from '$lib/events-signup-schema'
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'

function payloadUrl() {
  return env.PAYLOAD_INTERNAL_URL || publicEnv.PUBLIC_PAYLOAD_URL
}

export function emptySignUpForm() {
  return superValidate(zod(eventsSignUpSchema))
}

export const eventSignUpAction = {
  signUpEvent: async ({ request }: { request: Request }) => {
    const form = await superValidate(request, zod(eventsSignUpSchema))
    if (!form.valid) return fail(400, { form })

    const { name, email, phone, eventId, slot } = form.data

    const body: Record<string, unknown> = { name, email, event: eventId }
    if (phone) body.phone = phone
    if (slot) body.slot = slot

    const res = await fetch(`${payloadUrl()}/api/registrations`, {
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
