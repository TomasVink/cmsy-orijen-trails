import type { Block } from 'payload'

export const TopTrails: Block = {
  slug: 'top-trails',
  labels: {
    singular: 'Top Trails',
    plural: 'Top Trails',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'campaignText',
      type: 'richText',
      admin: {
        description: 'Campaign copy shown alongside the trail cards.',
      },
    },
    {
      name: 'trails',
      type: 'relationship',
      relationTo: 'trails',
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: 'Select up to 5 trails. Order determines display order.',
      },
    },
  ],
}
