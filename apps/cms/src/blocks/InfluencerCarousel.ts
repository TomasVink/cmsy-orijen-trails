import type { Block } from 'payload'

export const InfluencerCarousel: Block = {
  slug: 'influencer-carousel',
  labels: {
    singular: 'Influencer Carousel',
    plural: 'Influencer Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'influencers',
      type: 'relationship',
      relationTo: 'influencers',
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: 'Select influencers to display in the carousel.',
      },
    },
  ],
}
