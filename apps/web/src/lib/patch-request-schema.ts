import { z } from 'zod'

export const patchRequestSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  streetAddress: z.string().min(2, 'Street address is required'),
  postcode: z.string().min(2, 'Postcode is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  imageId: z.string().min(1, 'Please upload a photo'),
  patchId: z.string().min(1, 'Please select a patch'),
})

export type PatchRequestSchema = typeof patchRequestSchema
