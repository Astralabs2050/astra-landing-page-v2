import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const brandRouter = createTRPCRouter({
  getUserBrands: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.brand.findMany({
      where: { ownerId: ctx.session.user.sub },
    })
  }),
})
