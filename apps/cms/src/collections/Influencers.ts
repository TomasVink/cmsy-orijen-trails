import { CollectionConfig } from 'payload'

export const Influencers: CollectionConfig = {
  slug: 'influencers',
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'handle', 'platform', 'updatedAt']
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'bio',
      type: 'textarea'
    },
    {
      name: 'accounts',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Website', value: 'website' }
          ]
        },
        { name: 'handle', type: 'text' },
        { name: 'url', type: 'text', required: true, admin: { placeholder: 'https://...' } }
      ]
    }
  ]
}
