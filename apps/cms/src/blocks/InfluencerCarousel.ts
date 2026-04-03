import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const InfluencerCarousel: Block = {
  slug: 'influencer-carousel',
  labels: {
    singular: 'Influencer Carousel',
    plural: 'Influencer Carousels',
  },
  fields: [
    ...SectionBase,
    {
      name: 'influencers',
      type: 'relationship',
      relationTo: 'influencers',
      hasMany: true,
      maxDepth: 2,
      admin: {
        description: 'Select influencers to display.',
      },
    },
  ],
}
