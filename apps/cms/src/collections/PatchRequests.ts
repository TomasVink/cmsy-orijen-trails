import { CollectionConfig } from 'payload'

export const PatchRequests: CollectionConfig = {
  slug: 'patch-requests',
  admin: {
    group: 'Patches',
    defaultColumns: ['name', 'status', 'patch']
  },
  access: {
    create: () => true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      type: 'text',
      required: true
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'streetAddress',
          type: 'text',
          required: true
        },
        {
          name: 'postcode',
          type: 'text',
          required: true
        },
        {
          name: 'city',
          type: 'text',
          required: true
        },
        {
          name: 'country',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'user-media',
          required: true
        }
      ]
    },
    {
      name: 'patch',
      type: 'relationship',
      relationTo: 'patches',
      required: true
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft'
        },
        {
          value: 'requested',
          label: 'Requested'
        },
        {
          value: 'send',
          label: 'Send'
        }
      ],
      defaultValue: 'requested'
    }
  ]
}
