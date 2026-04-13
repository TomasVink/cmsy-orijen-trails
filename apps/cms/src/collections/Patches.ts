import { CollectionConfig } from 'payload'

export const Patches: CollectionConfig = {
  slug: 'patches',
  access: {
    read: () => true
  },
  admin: {
    group: 'Patches',
    useAsTitle: 'patch'
  },
  fields: [
    {
      name: 'patch',
      type: 'text',
      required: true
    }
  ]
}
