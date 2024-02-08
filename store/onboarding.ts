import { string } from 'zod'
import { map } from 'nanostores'
import { City } from '@/types/models'

export const $onboarding = map({
  name: string()._input,
  bio: string()._input,
  submitted: false,
  location: null as City | null,
})
