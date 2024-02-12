import { z } from 'zod'
import { prisma } from '../db'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const brandRouter = createTRPCRouter({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.brand.findUnique({
      where: { ownerId: ctx.session.userId },
    })
  }),

  update: authenticatedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        email: z.string().optional(),
        location: z.object({
          name: z.string(),
          lat: z.string(),
          lng: z.string(),
          countryCode: z.string(),
          admin1: z.string().optional(),
          admin2: z.string().optional(),
          zip: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, bio, location } = input

      const {
        admin1,
        admin2,
        zip,
        countryCode,
        lat,
        lng,
        name: city,
      } = location

      const data = {
        name,
        bio,
        city,
        zip,
        lat,
        lng,
        countryCode,
        email: ctx.session.user.email,
        ownerId: ctx.session.userId,
        province1: admin1,
        province2: admin2,
      }

      const brand = await prisma.brand.upsert({
        where: { ownerId: ctx.session.userId },
        create: data,
        update: data,
        include: {
          owner: {
            select: {
              onboarded: true,
            },
          },
        },
      })

      if (!brand.owner.onboarded) {
        await ctx.prisma.user.update({
          where: { id: ctx.session.userId },
          data: { onboarded: true },
        })
      }

      return brand
    }),

  getDesigns: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.design.findMany({
      where: {
        brandId: ctx.session.userId,
      },
      orderBy: [
        {
          txHash: { sort: 'desc', nulls: 'last' },
        },
        { createdAt: 'desc' },
      ],
      include: {
        pieces: true,
      },
    })
  }),
})
