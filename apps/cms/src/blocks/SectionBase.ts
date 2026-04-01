import { Field } from 'payload'

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
