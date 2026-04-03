import { z } from 'zod'

export const trailSubmitSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  title: z.string().min(2, 'Trail name is required'),
  description: z.string().max(120, 'Max 120 characters').optional(),
  distance: z.number({ error: 'Distance is required' }).positive('Must be positive'),
  offLeashArea: z.enum(['fully', 'partial', 'none']).optional(),
  hospitality: z.boolean().default(false),
  water: z.boolean().default(false),
  address: z.string().min(3, 'Address is required so we can pin the trail on the map'),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

export type TrailSubmitSchema = typeof trailSubmitSchema
