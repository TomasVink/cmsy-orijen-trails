import type { Block } from 'payload'

export const BlogBlock: Block = {
  slug: 'blog',
  labels: {
    singular: 'Blog',
    plural: 'Blog Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
