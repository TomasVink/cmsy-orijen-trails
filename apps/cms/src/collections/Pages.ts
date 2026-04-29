import type { CollectionConfig } from 'payload'
import { purgeAllCache, purgePageCache } from '../lib/bunny'

import { Hero } from '../blocks/Hero'
import { CampaignSteps } from '../blocks/CampaignSteps'
import { TopTrails } from '../blocks/TopTrails'
import { TrailsOverview } from '../blocks/TrailsOverview'
import { UserForm } from '../blocks/UserForm'
import { BlogBlock } from '../blocks/BlogBlock'
import { InfluencerCarousel } from '../blocks/InfluencerCarousel'
import { EventsBlock } from '../blocks/EventsBlock'
import { CTABlock } from '../blocks/CTABlock'
import { FAQ } from '../blocks/FAQ'
import { TextBlock } from '../blocks/TextBlock'
import { PickupPoints } from '../blocks/PickupPoints'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const full = await req.payload.findByID({
          collection: 'pages',
          id: doc.id,
          locale: 'all',
          depth: 0,
          req
        })
        await purgePageCache(full.slug as unknown as Record<string, string>)
      }
    ],
    afterDelete: [() => purgeAllCache()]
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const webURL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:5173'
        const loc = (locale as unknown as string | undefined) ?? 'nl'
        const slug = data?.slug as string | undefined
        return slug === 'home' ? `${webURL}/${loc}` : `${webURL}/${loc}/${slug ?? ''}`
      }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
      admin: {
        description: 'URL-friendly identifier. Use "home" for the home page.'
      }
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        CampaignSteps,
        TopTrails,
        TrailsOverview,
        UserForm,
        BlogBlock,
        InfluencerCarousel,
        EventsBlock,
        CTABlock,
        FAQ,
        TextBlock,
        PickupPoints
      ]
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true
        }
      ]
    }
  ]
}
