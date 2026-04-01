import type { Block } from 'payload'

export const SubmitTrail: Block = {
  slug: 'submit-trail',
  labels: {
    singular: 'Submit Trail',
    plural: 'Submit Trail',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label.' },
    },
    // Form fields — collected and POSTed to the Trails collection
    {
      name: 'nameLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Your name',
    },
    {
      name: 'emailLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Email address',
    },
    {
      name: 'trailNameLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Trail name',
    },
    {
      name: 'descriptionLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Trail description',
    },
  ],
}
