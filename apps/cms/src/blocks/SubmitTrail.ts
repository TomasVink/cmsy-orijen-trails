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
    {
      name: 'addressLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Address / start point',
    },
    {
      name: 'distanceLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Distance (km)',
    },
    {
      name: 'offLeashAreaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Off-leash area',
    },
    {
      name: 'hospitalityLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Hospitality nearby (café, restaurant, etc.)',
    },
    {
      name: 'waterLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Natural water on route (river, lake, sea)',
    },
    {
      name: 'offLeashAreaPlaceholder',
      type: 'text',
      localized: true,
      defaultValue: '— select —',
    },
    {
      name: 'offLeashAreaFullyLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Fully',
    },
    {
      name: 'offLeashAreaPartialLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Partial',
    },
    {
      name: 'offLeashAreaNoneLabel',
      type: 'text',
      localized: true,
      defaultValue: 'None',
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
