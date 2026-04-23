import { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  access: {
    read: () => true
  },
  admin: {
    group: 'Patches',
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'address',
      type: 'text',
      label: 'Street + number',
      admin: {
        components: {
          Field: '/src/components/AddressAutocomplete'
        }
      },
      required: true
    },
    { name: 'postcode', type: 'text', label: 'Postcode', required: true },
    { name: 'city', type: 'text', label: 'City', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        placeholder: 'https://...'
      },
      required: true
    },
    {
      name: 'storeMessage',
      type: 'text',
      localized: true,
      admin: { description: 'Text shown at on the store location cards.' },
      defaultValue: ({ locale }) =>
        locale === 'nl' ? 'Haal hier je patch op' : 'Get your patch here'
    }
  ]
}
