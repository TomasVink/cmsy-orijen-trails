import type { Block } from 'payload'

// "De vier stappen" / how the campaign works
export const CampaignSteps: Block = {
  slug: 'campaign-steps',
  labels: {
    singular: 'Campaign Steps',
    plural: 'Campaign Steps',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
