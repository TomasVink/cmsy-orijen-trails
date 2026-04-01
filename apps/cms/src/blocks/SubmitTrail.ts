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
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { description: 'Submit button label.' },
    },
    // Form fields — collected and POSTed to the Trails collection
    {
      name: 'nameLabel',
      type: 'text',
      defaultValue: 'Your name',
    },
    {
      name: 'emailLabel',
      type: 'text',
      defaultValue: 'Email address',
    },
    {
      name: 'trailNameLabel',
      type: 'text',
      defaultValue: 'Trail name',
    },
    {
      name: 'descriptionLabel',
      type: 'text',
      defaultValue: 'Trail description',
    },
  ],
}
