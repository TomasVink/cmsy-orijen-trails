import { CollectionConfig } from 'payload'

export const Trails: CollectionConfig = {
  slug: 'trails',
  access: { read: () => true },
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
      name: 'featured',
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
    },
    // ── Trail metadata ────────────────────────────────────────────
    {
      name: 'distance',
      type: 'number',
      admin: {
        description: 'Distance in kilometres.',
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
