import { trpcCaller } from '../utils'

export async function getUser() {
  const trpc = await trpcCaller()
  const user = await trpc.user.get()

  return user
}
