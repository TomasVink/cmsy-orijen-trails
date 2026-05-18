import { Block } from 'payload'
import SectionBase from './SectionBase'

export const TextBlock: Block = {
  slug: 'text',
  imageURL: '/admin/blocks/Text.webp',
  fields: [
    ...SectionBase,
    {
      name: 'content',
      type: 'richText',
      localized: true
    }
  ]
}
