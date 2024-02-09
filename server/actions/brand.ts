import { trpcCaller } from '../utils'

export async function getBrand() {
  const trpc = await trpcCaller()
  return await trpc.brand.get()
}

export async function getDesigns() {
  const trpc = await trpcCaller()
  return await trpc.brand.getDesigns()
}
