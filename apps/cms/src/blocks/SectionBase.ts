import { Field } from 'payload'
import { sanitizeSlugId, validateSlugId } from '../lib/sectionId'

const SectionBase: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'sectionId',
    type: 'text',
    required: true,
    validate: validateSlugId,
    hooks: {
      beforeValidate: [({ value }) => (value ? sanitizeSlugId(value) : value)],
    },
    admin: {
      description: 'Used for internal linking using CTA buttons',
    },
  },
  {
    name: 'intro',
    type: 'textarea',
    localized: true,
  },
]

export default SectionBase
