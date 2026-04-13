import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const BlogBlock: Block = {
  slug: 'blog',
  labels: {
    singular: 'Blog',
    plural: 'Blog Blocks'
  },
  fields: [
    ...SectionBase,
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxDepth: 2,
      admin: {
        description: 'Select blog posts to be featured. Order determines display order.'
      }
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Bekijk alle berichten' : 'View all posts'
    }
  ]
}
