import { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    create: () => true
  },
  admin: {
    group: 'Events',
    defaultColumns: ['event', 'slot', 'name']
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
      name: 'phone',
      type: 'text'
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true
    },
    {
      name: 'slot',
      type: 'text',
      admin: { description: 'The chosen time slot, e.g. "10:00" or "10:00 – 11:00".' }
    }
  ]
}
