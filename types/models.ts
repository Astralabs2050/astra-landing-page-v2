import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers/root'

type RouterOutput = inferRouterOutputs<AppRouter>

export type User = RouterOutput['user']['get'] | null
export type Brand = RouterOutput['brand']['get'] | null

export type City = {
  name: string
  lat: string
  lng: string
  country: string
  admin1: string
  admin2: string
}
