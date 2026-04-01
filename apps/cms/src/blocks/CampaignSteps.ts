import type { Block } from 'payload'
import { ICON_OPTIONS } from '../icons'
import SectionBase from './SectionBase'

// "De vier stappen" / how the campaign works
export const CampaignSteps: Block = {
  slug: 'campaign-steps',
  labels: {
    singular: 'Campaign Steps',
    plural: 'Campaign Steps',
  },
  fields: [
    ...SectionBase,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [...ICON_OPTIONS],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
