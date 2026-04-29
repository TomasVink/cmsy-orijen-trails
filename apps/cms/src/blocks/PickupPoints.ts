import { Block } from 'payload'
import SectionBase from './SectionBase'

export const PickupPoints: Block = {
  slug: 'pickup-points',
  labels: {
    singular: 'Pickup Points',
    plural: 'Pickup Points'
  },
  fields: [...SectionBase]
}
