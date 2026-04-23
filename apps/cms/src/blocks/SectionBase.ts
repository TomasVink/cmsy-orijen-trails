import { Field } from 'payload'
import { sanitizeSlugId, validateSlugId } from '../lib/sectionId'

const SectionBase: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    localized: true
  },
  {
    name: 'sectionId',
    type: 'text',
    required: true,
    validate: validateSlugId,
    hooks: {
      beforeValidate: [({ value }) => (value ? sanitizeSlugId(value) : value)]
    },
    admin: {
      description: 'Used for internal linking using CTA buttons'
    }
  },
  {
    name: 'intro',
    type: 'textarea',
    localized: true
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Optional background image shown behind the title'
    }
  },
  {
    name: 'backgroundColor',
    type: 'select',
    options: [
      {
        label: 'Black',
        value: 'black'
      },
      {
        label: 'White',
        value: 'white'
      },
      {
        label: 'Grey texture',
        value: 'texture'
      }
    ],
    defaultValue: 'black'
  }
]

export default SectionBase
