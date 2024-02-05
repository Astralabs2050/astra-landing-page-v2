import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers/root'

type RouterOutput = inferRouterOutputs<AppRouter>

/**
 * types for db models.
 *
 * since prisma doesn't actually
 * export the complete type data with relations,
 * we have to get them from trpc
 */
export type User = RouterOutput['user']['get'] | null
export type City = {
  name: string
  lat: string
  lng: string
  country: string
  admin1: string
  admin2: string
}
