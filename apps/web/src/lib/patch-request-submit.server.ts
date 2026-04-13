import { superValidate, fail } from 'sveltekit-superforms'
import { zod4 as zod } from 'sveltekit-superforms/adapters'
import { patchRequestSchema } from '$lib/patch-request-schema'
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'

function payloadUrl() {
  return env.PAYLOAD_INTERNAL_URL || publicEnv.PUBLIC_PAYLOAD_URL
}

export function emptyPatchRequestForm() {
  return superValidate(zod(patchRequestSchema))
}

export const patchRequestSubmitAction = {
  submitPatchRequest: async ({ request }: { request: Request }) => {
    const form = await superValidate(request, zod(patchRequestSchema))
    if (!form.valid) return fail(400, { form })

    const { name, email, streetAddress, postcode, city, country, imageId, patchId } = form.data

    const res = await fetch(`${payloadUrl()}/api/patch-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        address: { streetAddress, postcode, city, country },
        images: [{ image: parseInt(imageId, 10) }],
        patch: parseInt(patchId, 10),
      }),
    })

    if (!res.ok) {
      return fail(500, { form })
    }

    return { form }
  },
}
