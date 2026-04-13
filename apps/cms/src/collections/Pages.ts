import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero'
import { CampaignSteps } from '../blocks/CampaignSteps'
import { TopTrails } from '../blocks/TopTrails'
import { TrailsOverview } from '../blocks/TrailsOverview'
import { SubmitTrail } from '../blocks/SubmitTrail'
import { BlogBlock } from '../blocks/BlogBlock'
import { InfluencerCarousel } from '../blocks/InfluencerCarousel'
import { EventsBlock } from '../blocks/EventsBlock'
import { CTABlock } from '@/blocks/CTABlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  admin: {
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
        SubmitTrail,
        BlogBlock,
        InfluencerCarousel,
        EventsBlock,
        CTABlock
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
