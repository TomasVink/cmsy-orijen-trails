import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const SubmitTrail: Block = {
  slug: 'submit-trail',
  labels: {
    singular: 'Submit Trail',
    plural: 'Submit Trail',
  },
  fields: [
    ...SectionBase,
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label.' },
    },
    {
      name: 'successTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Thank you!',
      admin: { description: 'Heading shown after a successful submission.' },
    },
    {
      name: 'successMessage',
      type: 'text',
      localized: true,
      defaultValue: 'Your trail has been submitted and will be reviewed shortly.',
      admin: { description: 'Body text shown after a successful submission.' },
    },
  ],
}
