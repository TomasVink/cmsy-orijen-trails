import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const TrailsOverview: Block = {
  slug: 'trails-overview',
  imageURL: '/admin/blocks/TrailsOverview.webp',
  labels: {
    singular: 'Trails Overview',
    plural: 'Trails Overviews',
  },
  fields: SectionBase,
}
