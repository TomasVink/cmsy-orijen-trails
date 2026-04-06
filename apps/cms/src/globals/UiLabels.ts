import { GlobalConfig } from 'payload'

export const UiLabels: GlobalConfig = {
  slug: 'ui-labels',
  label: 'UI Labels',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'back',
      type: 'text',
      localized: true,
      admin: { description: 'Back navigation button in the top bar.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Terug' : 'Back',
    },
    {
      name: 'continueReading',
      type: 'text',
      localized: true,
      admin: { description: 'Link text on blog post cards.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Lees verder' : 'Continue reading',
    },
    {
      name: 'followOn',
      type: 'text',
      localized: true,
      admin: { description: 'Prefix for social follow button, e.g. "Follow on" → "Follow on Instagram".' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Volg ons op' : 'Follow on',
    },
    {
      name: 'submitting',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label while a form is being submitted.' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Bezig met verzenden…' : 'Submitting…',
    },
    {
      name: 'mapZoomHint',
      type: 'text',
      localized: true,
      admin: { description: 'Overlay hint shown when scrolling the map without Ctrl (non-Mac).' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Houd Ctrl ingedrukt om te zoomen' : 'Hold Ctrl to zoom the map',
    },
    {
      name: 'mapZoomHintMac',
      type: 'text',
      localized: true,
      admin: { description: 'Overlay hint shown when scrolling the map without ⌘ (Mac).' },
      defaultValue: ({ locale }: { locale?: string }) =>
        locale === 'nl' ? 'Houd ⌘ ingedrukt om te zoomen' : 'Hold ⌘ to zoom the map',
    },
  ],
}
