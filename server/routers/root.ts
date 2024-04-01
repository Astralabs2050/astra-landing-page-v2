import { createTRPCRouter } from '@/services/trpc-server'
import { userRouter } from './user'
import { brandRouter } from './brand'
import { designRouter } from './design'
import { jobRouter } from './job'
import { creatorRouter } from './creator'

export const appRouter = createTRPCRouter({
  user: userRouter,
  brand: brandRouter,
  creator: creatorRouter,
  design: designRouter,
  job: jobRouter,
})

export type AppRouter = typeof appRouter
