import type { Block } from 'payload'
import SectionBase from './SectionBase'

export const EventsBlock: Block = {
  slug: 'events',
  labels: {
    singular: 'Events',
    plural: 'Events',
  },
  fields: [
    ...SectionBase,
  ],
}
