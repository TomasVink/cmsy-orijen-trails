import { CollectionConfig } from 'payload'

export const Trails: CollectionConfig = {
  slug: 'trails',
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { published: { equals: true } }
    },
    create: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'distance', 'published', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'community',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'header',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      maxLength: 120,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'distance',
      type: 'number',
      admin: {
        description: 'Distance in kilometres.',
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duration in hours',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
      ],
    },
    {
      name: 'offLeashArea',
      type: 'select',
      options: [
        {
          label: 'Fully',
          value: 'fully',
        },
        {
          label: 'Partial',
          value: 'partial',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
      admin: {
        description: 'What are the off leash rules along this route.',
      },
    },
    {
      name: 'hospitality',
      type: 'checkbox',
      admin: {
        description: 'Is there any hospitality nearby or on the route.',
      },
    },
    {
      name: 'water',
      type: 'checkbox',
      admin: {
        description:
          'Is there any accessible natural water on the route, like a river, lake or sea.',
      },
    },
    {
      name: 'coordinates',
      type: 'group',
      admin: {
        description: 'Trail start point for the map pin.',
      },
      fields: [
        {
          name: 'lat',
          type: 'number',
          admin: { description: 'Latitude' },
        },
        {
          name: 'lng',
          type: 'number',
          admin: { description: 'Longitude' },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
