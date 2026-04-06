import { CollectionConfig } from 'payload'

const hourCheck = (value: string | null | undefined) => {
  if (!value) return true
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) || 'Must be a valid time in HH:mm format'
}

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const trailId = typeof data.trail === 'object' ? data.trail?.id : data.trail
        let trailTitle: string | null = null
        if (trailId) {
          try {
            const trailDoc = await req.payload.findByID({ collection: 'trails', id: trailId })
            trailTitle = trailDoc?.title ?? null
          } catch {
            // ignore
          }
        }
        const date = data.date ? new Date(data.date) : null
        const formatted = date
          ? `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`
          : null
        data.title = trailTitle && formatted ? `${trailTitle} – ${formatted}` : trailTitle ?? formatted ?? 'Event'
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { published: { equals: true } }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only published events are visible to the public.'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true
    },
    {
      name: 'trail',
      type: 'relationship',
      relationTo: 'trails',
      required: true
    },
    {
      name: 'date',
      type: 'date',
      required: true
    },
    {
      name: 'start',
      type: 'text',
      validate: hourCheck,
      admin: {
        description:
          'Either set a global start time for participation without restrictions or at time slots to restrict participation.'
      }
    },
    {
      name: 'slots',
      type: 'array',
      fields: [
        {
          name: 'start',
          type: 'text',
          required: true,
          validate: hourCheck
        },
        {
          name: 'end',
          type: 'text',
          required: true,
          validate: hourCheck
        },
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: true
        }
      ]
    },
    {
      name: 'influencers',
      type: 'relationship',
      relationTo: 'influencers',
      hasMany: true
    }
  ]
}
