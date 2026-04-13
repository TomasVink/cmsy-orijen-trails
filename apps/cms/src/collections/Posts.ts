import { CollectionConfig } from 'payload'
import RelatedContent from './RelatedContent'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt']
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "trail-hero-of-the-week".'
      }
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short summary shown in blog block cards.'
      }
    },
    {
      name: 'header',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'content',
      type: 'richText',
      localized: true
    },
    RelatedContent,
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true
        }
      ]
    }
  ]
}
