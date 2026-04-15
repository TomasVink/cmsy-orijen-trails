import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  admin: {
    group: 'Content'
  },
  upload: {
    // Local dev: files served from /media on the Next.js server.
    // Production: overridden by @payloadcms/storage-s3 when S3_BUCKET is set.
    staticDir: '../public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre'
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre'
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/quicktime'
    ]
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          if (req.file.size > 10 * 1024 * 1024) {
            throw new Error('File size must not exceed 10 MB.')
          }
        }
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true
    }
  ]
}
