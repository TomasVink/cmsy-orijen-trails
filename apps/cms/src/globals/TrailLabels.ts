import { GlobalConfig } from 'payload'
import { purgeAllCache } from '../lib/bunny'

export const TrailLabels: GlobalConfig = {
  slug: 'trail-labels',
  label: 'Trail Labels',
  hooks: {
    afterChange: [() => purgeAllCache()],
  },
  access: { read: () => true },
  admin: {
    group: 'Settings'
  },
  fields: [
    {
      name: 'difficulty',
      type: 'group',
      label: 'Difficulty Labels',
      admin: {
        condition: () => false
      },
      fields: [
        {
          name: 'easy',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Makkelijk' : 'Easy'
        },
        {
          name: 'moderate',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Gemiddeld' : 'Moderate'
        },
        {
          name: 'challenging',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Uitdagend' : 'Challenging'
        },
        {
          name: 'allDifficulties',
          type: 'text',
          localized: true,
          admin: { description: 'Filter button label for showing all difficulties.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Alle moeilijkheden' : 'All difficulties'
        }
      ]
    },
    {
      name: 'offLeash',
      type: 'group',
      label: 'Off-Leash Labels',
      fields: [
        {
          name: 'fully',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Volledig losloopgebied' : 'Fully off-leash'
        },
        {
          name: 'partial',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Gedeeltelijk losloopgebied' : 'Partially off-leash'
        },
        {
          name: 'none',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Geen losloopgebied' : 'On-leash only'
        }
      ]
    },
    {
      name: 'hospitality',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Horeca' : 'Hospitality'
    },
    {
      name: 'water',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Zwemwater' : 'Swimming water'
    },
    {
      name: 'viewTrail',
      type: 'text',
      localized: true,
      admin: { description: 'CTA button on trail cards.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Bekijk route' : 'View trail'
    },
    {
      name: 'viewAllTrails',
      type: 'text',
      localized: true,
      admin: { description: 'Link below the top trails carousel.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Bekijk alle routes' : 'View all trails'
    },
    {
      name: 'form',
      type: 'group',
      label: 'Submit Trail Form Labels',
      fields: [
        {
          name: 'nameLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Jouw naam' : 'Your name'
        },
        {
          name: 'emailLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'E-mailadres' : 'Email address'
        },
        {
          name: 'trailNameLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Naam van de route' : 'Trail name'
        },
        {
          name: 'descriptionLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Omschrijving van de route' : 'Trail description'
        },
        {
          name: 'descriptionHint',
          type: 'text',
          localized: true,
          admin: { description: 'Shown next to the description field label.' },
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? '(max 120 tekens)' : '(max 120 chars)'
        },
        {
          name: 'addressLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Adres / startpunt' : 'Address / start point'
        },
        {
          name: 'distanceLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Afstand (km)' : 'Distance (km)'
        },
        {
          name: 'offLeashAreaLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? 'Losloopgebied' : 'Off-leash area'
        },
        {
          name: 'offLeashAreaPlaceholder',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl' ? '— kies —' : '— select —'
        },
        {
          name: 'hospitalityLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl'
              ? 'Horeca in de buurt (café, restaurant, etc.)'
              : 'Hospitality nearby (café, restaurant, etc.)'
        },
        {
          name: 'waterLabel',
          type: 'text',
          localized: true,
          defaultValue: ({ locale }: { locale?: string }) =>
            locale === 'nl'
              ? 'Natuurlijk water op route (rivier, meer, zee)'
              : 'Natural water on route (river, lake, sea)'
        }
      ]
    }
  ]
}
