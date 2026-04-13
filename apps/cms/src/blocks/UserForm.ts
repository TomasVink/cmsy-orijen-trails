import type { Block } from 'payload'
import SectionBase from './SectionBase'
import { ICON_OPTIONS } from '@/icons'

export const UserForm: Block = {
  slug: 'user-form',
  labels: {
    singular: 'User Form',
    plural: 'User Form'
  },
  fields: [
    {
      name: 'requestType',
      type: 'select',
      defaultValue: 'trail',
      required: true,
      options: [
        { label: 'Submit Trail', value: 'trail' },
        { label: 'Patch Request', value: 'patch-request' }
      ]
    },
    ...SectionBase,
    {
      name: 'icon',
      type: 'select',
      options: [...ICON_OPTIONS]
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label.' }
    },
    {
      name: 'successTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Thank you!',
      admin: { description: 'Heading shown after a successful submission.' }
    },
    {
      name: 'successMessage',
      type: 'text',
      localized: true,
      defaultValue: 'Your trail has been submitted and will be reviewed shortly.',
      admin: { description: 'Body text shown after a successful submission.' }
    }
  ]
}
