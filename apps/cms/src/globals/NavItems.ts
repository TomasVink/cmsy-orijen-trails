import { Field, GlobalConfig } from 'payload'
import { purgeAllCache } from '../lib/bunny'

const admin = {
  description:
    'Use /page-slug to navigate to an intrnal page, add #section-id to scroll directly to a specific section. Use https://... to navigate to an external web page.',
  placeholder: '/page-slug OR /page-slug#section-id OR https://...'
}

const fields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    localized: true
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    admin
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false
  }
]

export const NavItems: GlobalConfig = {
  slug: 'nav-items',
  label: 'Nav and footer',
  hooks: {
    afterChange: [() => purgeAllCache()]
  },
  access: { read: () => true },
  admin: {
    group: 'Settings'
  },
  fields: [
    {
      name: 'logoLink',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'https://emea.orijenpetfoods.com/',
      admin
    },
    {
      name: 'highlightedLink',
      type: 'group',
      fields
    },
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      fields
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            {
              label: 'Instagram',
              value: 'instagram'
            },
            {
              label: 'Facebook',
              value: 'facebook'
            },
            {
              label: 'Youtube',
              value: 'youtube'
            },
            {
              label: 'TikTok',
              value: 'tiktok'
            }
          ],
          required: true
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://...'
          }
        }
      ]
    }
  ]
}
