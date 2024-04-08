import { createTRPCRouter } from '@/services/trpc-server'
import { userRouter } from './user'
import { brandRouter } from './brand'
import { designRouter } from './design'
import { jobRouter } from './job'
import { creatorRouter } from './creator'
import { nftRouter } from './nft'

export const appRouter = createTRPCRouter({
  user: userRouter,
  brand: brandRouter,
  creator: creatorRouter,
  design: designRouter,
  job: jobRouter,
  nft: nftRouter,
})

export type AppRouter = typeof appRouter
