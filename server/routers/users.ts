import { z } from 'zod'
import {
  createTRPCRouter,
  publicProcedure,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { serverError } from '@/constants/errors'
import { prisma } from '../db'

const getUser = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}

export const userRouter = createTRPCRouter({
  // getUser: authenticatedProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const { session } = ctx

  //     const user = await getUser(input.id)

  //     if (user) {
  //       return user
  //     }

  //     return await ctx.prisma.user.create({
  //       data: {
  //         id: ctx.session.sub,
  //       },
  //     })
  //   }),

  /** only authenticated users can access */
  getUser: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.session
  }),
})
