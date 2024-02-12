import { z } from 'zod'
import { map } from 'nanostores'
import { City } from '@/types/models'

export const $onboarding = map({
  name: z.string()._input,
  bio: z.string()._input,
  submitted: false,
  location: null as City | null,
})
