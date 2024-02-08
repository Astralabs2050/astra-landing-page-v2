import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { z } from 'zod'
import { prisma } from '../db'
import { getLocationId } from '@/lib/location'

export const brandRouter = createTRPCRouter({
  getUserBrand: authenticatedProcedure.query(async ({ ctx }) => {
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
          zip: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, bio, location } = input

      const locationId = getLocationId({
        name: location.name,
        countryCode: location.countryCode,
        admin1: location.admin1,
      })

      const dbLocation = await ctx.prisma.location.upsert({
        where: { id: locationId },
        update: {},
        create: {
          id: locationId,
          ...location,
        },
      })

      await prisma.brand.upsert({
        where: { ownerId: ctx.session.userId },
        create: {
          name,
          bio,
          email: ctx.session.user.email,
          ownerId: ctx.session.userId,
          locationId: dbLocation.id,
        },
        update: {
          name,
          bio,
          email: input.email,
          ownerId: ctx.session.userId,
          locationId: dbLocation.id,
        },
      })

      await ctx.prisma.user.update({
        where: { id: ctx.session.userId },
        data: { onboarded: true },
      })
    }),
})
