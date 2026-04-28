import { CollectionConfig } from 'payload'
import { purgeAllCache, purgePostCache } from '../lib/bunny'
import RelatedContent from './RelatedContent'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const full = await req.payload.findByID({ collection: 'posts', id: doc.id, locale: 'all', depth: 0, req })
        await purgePostCache(full.slug as unknown as Record<string, string>)
      },
    ],
    afterDelete: [() => purgeAllCache()],
  },
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
