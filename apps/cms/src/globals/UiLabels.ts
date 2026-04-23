import { GlobalConfig } from 'payload'
import { purgeAllCache } from '../lib/bunny'

export const UiLabels: GlobalConfig = {
  slug: 'ui-labels',
  label: 'UI Labels',
  hooks: {
    afterChange: [() => purgeAllCache()]
  },
  access: { read: () => true },
  admin: {
    group: 'Settings'
  },
  fields: [
    {
      name: 'blogTitle',
      type: 'text',
      localized: true,
      admin: { description: 'Title on the blog overview page' },
      defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Nieuws' : 'News')
    },
    {
      name: 'trailsTitle',
      type: 'text',
      localized: true,
      admin: { description: 'Title on the trails overview page' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Alle trails' : 'All trails'
    },
    {
      name: 'back',
      type: 'text',
      localized: true,
      admin: { description: 'Back navigation button in the top bar.' },
      defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Terug' : 'Back')
    },
    {
      name: 'continueReading',
      type: 'text',
      localized: true,
      admin: { description: 'Link text on blog post cards.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Lees verder' : 'Continue reading'
    },
    {
      name: 'followOn',
      type: 'text',
      localized: true,
      admin: {
        description: 'Prefix for social follow button, e.g. "Follow on" → "Follow on Instagram".'
      },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Volg ons op' : 'Follow on'
    },
    {
      name: 'submitting',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label while a form is being submitted.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Bezig met verzenden…' : 'Submitting…'
    },
    {
      name: 'mapZoomHint',
      type: 'text',
      localized: true,
      admin: { description: 'Overlay hint shown when scrolling the map without Ctrl (non-Mac).' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Houd Ctrl ingedrukt om te zoomen' : 'Hold Ctrl to zoom the map'
    },
    {
      name: 'mapZoomHintMac',
      type: 'text',
      localized: true,
      admin: { description: 'Overlay hint shown when scrolling the map without ⌘ (Mac).' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Houd ⌘ ingedrukt om te zoomen' : 'Hold ⌘ to zoom the map'
    },
    {
      name: 'patchRequestForm',
      type: 'group',
      label: 'Patch Request Form',
      fields: [
        {
          name: 'nameLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Naam' : 'Name')
        },
        {
          name: 'emailLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'E-mailadres' : 'Email address'
        },
        {
          name: 'streetAddressLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Straat en huisnummer' : 'Street address'
        },
        {
          name: 'postcodeLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Postcode' : 'Postcode'
        },
        {
          name: 'cityLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Gemeente' : 'City')
        },
        {
          name: 'countryLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Land' : 'Country')
        },
        {
          name: 'imageLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Foto' : 'Photo')
        },
        {
          name: 'patchLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Patch'
        },
        {
          name: 'submitLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Versturen' : 'Submit'
        }
      ]
    },
    {
      name: 'trailFilters',
      type: 'group',
      label: 'Trail Filters',
      fields: [
        {
          name: 'difficulty',
          type: 'text',
          localized: true,
          admin: { description: 'Section header for the difficulty filter.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Moeilijkheid' : 'Difficulty'
        },
        {
          name: 'offLeash',
          type: 'text',
          localized: true,
          admin: { description: 'Section header for the off-leash filter.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Losloopgebied' : 'Off-leash'
        },
        {
          name: 'distance',
          type: 'text',
          localized: true,
          admin: { description: 'Section header for the distance filter.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Afstand' : 'Distance'
        },
        {
          name: 'features',
          type: 'text',
          localized: true,
          admin: {
            description: 'Section header for the features filter (hospitality, water, community).'
          },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Kenmerken' : 'Features'
        },
        {
          name: 'community',
          type: 'text',
          localized: true,
          admin: { description: 'Label for the community trail filter button.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Community' : 'Community'
        },
        {
          name: 'clear',
          type: 'text',
          localized: true,
          admin: { description: 'Label for the clear filters button.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Wis filters' : 'Clear filters'
        }
      ]
    }
  ]
}
