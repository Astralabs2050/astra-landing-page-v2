import { map } from 'nanostores'
import { City } from '@/types/models'
import { CreatorWork } from '@prisma/client'

export const $onboarding = map({
  name: '',
  bio: '',
  submitted: false,
  location: null as City | null,
  works: [] as Pick<CreatorWork, 'description' | 'shots' | 'title'>[],
})
