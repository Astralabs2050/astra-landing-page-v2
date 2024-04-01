import { z } from 'zod'

export const basicProfileInput = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().optional(),
  location: z.object({
    name: z.string(),
    lat: z.string(),
    lng: z.string(),
    countryCode: z.string(),
    admin1: z.string().optional(),
    admin2: z.string().optional(),
    zip: z.string().optional(),
  }),
})
