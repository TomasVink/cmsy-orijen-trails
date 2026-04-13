import { Block } from 'payload'
import { sanitizeSlugId, validateSlugId } from '../lib/sectionId'
import SectionBase from './SectionBase'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ'
  },
  fields: [
    ...SectionBase,
    {
      name: 'faq',
      type: 'array',
      fields: [
        {
          name: 'itemId',
          type: 'text',
          required: true,
          validate: validateSlugId,
          hooks: {
            beforeValidate: [({ value }) => (value ? sanitizeSlugId(value) : value)]
          }
        },
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          localized: true
        }
      ]
    }
  ]
}
