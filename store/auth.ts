import { map } from 'nanostores'
import { User } from '@prisma/client'
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter'

export const $auth = map({
  loading: false,
  initialising: true,
  user: null as User | null,
  idToken: null as string | null,
  session: null as OpenloginUserInfo | null,
})
