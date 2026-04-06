import { z } from 'zod'

export const eventsSignUpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  eventId: z.number({ error: 'Event is required' }),
  slot: z.string().optional(),
})

export type EventsSignUpSchema = typeof eventsSignUpSchema
