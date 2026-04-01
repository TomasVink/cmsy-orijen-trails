import { CollectionConfig } from 'payload'

export const Influencers: CollectionConfig = {
  slug: 'influencers',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'handle', 'platform', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'handle',
      type: 'text',
      required: true,
      admin: {
        description: 'Social media handle without the @ symbol.',
      },
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'profileUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Full URL to their social profile.',
      },
    },
  ],
}
