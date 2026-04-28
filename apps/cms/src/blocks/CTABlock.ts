import { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta-block',
  labels: {
    singular: 'CTA Block',
    plural: 'CTA Blocks'
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'cta',
      type: 'text',
      label: 'CTA',
      localized: true,
      required: true
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        placeholder: 'https://...'
      },
      localized: true,
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true
    }
  ]
}
