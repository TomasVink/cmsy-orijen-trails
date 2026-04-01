import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const TopTrails: Block = {
  slug: 'top-trails',
  labels: {
    singular: 'Top Trails',
    plural: 'Top Trails',
  },
  fields: [
    ...SectionBase,
    {
      name: 'trails',
      type: 'relationship',
      relationTo: 'trails',
      hasMany: true,
      maxDepth: 2,
      admin: {
        description: 'Select trails to be featured. Order determines display order.',
      },
    },
  ],
}
