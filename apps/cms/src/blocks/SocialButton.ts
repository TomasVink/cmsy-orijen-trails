import type { Block } from 'payload'

export const SocialButton: Block = {
  slug: 'social-button',
  labels: {
    singular: 'Social Button',
    plural: 'Social Buttons',
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Facebook', value: 'facebook' },
      ],
    },
    {
      name: 'handle',
      type: 'text',
      required: true,
      admin: {
        description: 'Handle without the @ symbol.',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'e.g. "Join the community"',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional section background image.',
      },
    },
  ],
}
