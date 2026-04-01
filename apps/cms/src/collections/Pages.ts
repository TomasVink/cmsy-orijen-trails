import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero'
import { CampaignSteps } from '../blocks/CampaignSteps'
import { TopTrails } from '../blocks/TopTrails'
import { TrailsOverview } from '../blocks/TrailsOverview'
import { SubmitTrail } from '../blocks/SubmitTrail'
import { BlogBlock } from '../blocks/BlogBlock'
import { SocialButton } from '../blocks/SocialButton'
import { InfluencerCarousel } from '../blocks/InfluencerCarousel'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const webURL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:5173'
        const slug = data?.slug as string | undefined
        return `${webURL}/${slug ?? ''}`
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier. Use "home" for the home page.',
      },
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
        SocialButton,
        InfluencerCarousel,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
