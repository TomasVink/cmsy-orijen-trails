import type { Block } from 'payload'
import { ICON_OPTIONS } from '../icons'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes'
  },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Background video (max 10 MB). Keep it under 10 s, use H.264/MP4, 1080p or lower, 24-30 fps, and strip audio.'
      }
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'subheadline',
      type: 'text',
      localized: true
    },
    {
      name: 'cta',
      label: 'CTA',
      type: 'array',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          admin: { description: 'Call-to-action button label.' }
        },
        {
          name: 'ctaUrl',
          type: 'text',
          admin: { description: 'Call-to-action button URL or anchor.' }
        },
        {
          name: 'outline',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Appearance of the CTA button'
          }
        },
        {
          name: 'icon',
          type: 'select',
          options: [...ICON_OPTIONS],
          admin: { description: 'Optional icon shown left of the button label.' }
        }
      ]
    }
  ]
}
