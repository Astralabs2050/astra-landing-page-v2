import { map } from 'nanostores'
import { User } from '@prisma/client'
import { UserProfile } from '@auth0/nextjs-auth0/client'

export const $auth = map({
  loading: false,
  initialising: true,
  user: null as User | null,
  idToken: null as string | null,
  authUser: null as UserProfile | null | undefined,
})
