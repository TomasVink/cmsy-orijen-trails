import type { Block } from 'payload'

export const TrailsOverview: Block = {
  slug: 'trails-overview',
  labels: {
    singular: 'Trails Overview',
    plural: 'Trails Overviews',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
  ],
}
