import { Field } from 'payload'

const RelatedContent: Field = {
  name: 'related',
  label: 'Related content',
  type: 'group',
  fields: [
    {
      name: 'influencers',
      type: 'relationship',
      relationTo: 'influencers',
      hasMany: true
    },
    {
      name: 'trails',
      type: 'relationship',
      relationTo: 'trails',
      hasMany: true
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true
    }
  ]
}

export default RelatedContent
