import type { Block } from 'payload'

export const PromoBanner: Block = {
  slug: 'promo-banner',
  labels: {
    singular: 'Promo Banner',
    plural: 'Promo Banners'
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Full-width background image (e.g. dog + product shot).'
      }
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos (top left)',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'alt',
          type: 'text',
          localized: true
        }
      ]
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true
    },
    {
      name: 'badge',
      label: 'Info Badge',
      type: 'group',
      admin: {
        description: 'Small badge with icon — e.g. "t.w.v. €69,- / zolang de voorraad strekt".'
      },
      fields: [
        {
          name: 'primaryText',
          type: 'text',
          localized: true,
          admin: { description: 'Bold top line, e.g. "t.w.v. €69,-"' }
        },
        {
          name: 'secondaryText',
          type: 'text',
          localized: true,
          admin: { description: 'Smaller bottom line, e.g. "zolang de voorraad strekt"' }
        }
      ]
    }
  ]
}
