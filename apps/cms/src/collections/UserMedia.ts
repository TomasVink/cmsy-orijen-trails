import type { CollectionConfig } from 'payload'

export const UserMedia: CollectionConfig = {
  slug: 'user-media',
  access: {
    create: () => true,
    read: () => true
  },
  labels: {
    singular: 'User Media',
    plural: 'User Media'
  },
  admin: {
    group: 'Patches'
  },
  upload: {
    staticDir: '../public/user-media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre'
      }
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
  },
  fields: []
}
