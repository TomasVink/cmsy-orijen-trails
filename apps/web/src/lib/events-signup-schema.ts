import { z } from 'zod'

export const eventsSignUpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  eventId: z.number({ error: 'Event is required' }),
  slot: z.string().optional(),
  people: z.number().min(1).max(6),
  dogs: z.number().min(0).max(6),
  other: z.number().min(0).max(6)
})

export type EventsSignUpSchema = typeof eventsSignUpSchema
