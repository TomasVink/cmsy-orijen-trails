import { GlobalConfig } from 'payload'
import { purgeAllCache } from '../lib/bunny'

export const SignUpLabels: GlobalConfig = {
  slug: 'sign-up-labels',
  label: 'Sign Up Labels',
  hooks: {
    afterChange: [() => purgeAllCache()],
  },
  access: { read: () => true },
  admin: {
    group: 'Settings'
  },
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
      name: 'phoneLabel',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Telefoonnummer' : 'Phone number'
    },
    {
      name: 'signupCta',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Schrijf je in, kies een slot' : 'Sign up, pick a slot'
    },
    {
      name: 'submitLabel',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) => (locale === 'nl' ? 'Aanmelden' : 'Sign up')
    },
    {
      name: 'successTitle',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Aanmelding ontvangen!' : 'Registration received!'
    },
    {
      name: 'successMessage',
      type: 'text',
      localized: true,
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl'
          ? 'Je ontvangt een bevestiging per e-mail.'
          : 'You will receive a confirmation by email.'
    },
    {
      name: 'fullyBooked',
      type: 'text',
      localized: true,
      admin: { description: 'Label shown when all slots of an event are unavailable.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Volgeboekt' : 'Fully booked'
    }
  ]
}
