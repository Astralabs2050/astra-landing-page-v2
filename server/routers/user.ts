import { z } from 'zod'
import { RoleId } from '@prisma/client'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const userRouter = createTRPCRouter({
  getToken: authenticatedProcedure.mutation(async ({ ctx }) => {
    return ctx.session.idToken
  }),

  getRoles: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.role.findMany()
  }),

  get: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.sub } })
  }),

  create: authenticatedProcedure
    .input(
      z.object({
        role: z.nativeEnum(RoleId),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.sub as string

      return await ctx.prisma.user.create({
        data: {
          id,
          role: input.role,
          email: ctx.session.user.email,
          avatar: ctx.session.user.picture,
          fullname: id.includes('google')
            ? ctx.session.user.name
            : ctx.session.user.nickname,
        },
      })
    }),

  update: authenticatedProcedure
    .input(
      z.object({
        fullname: z.string().optional(),
        avatar: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.sub },
        data: input,
      })
    }),
})
