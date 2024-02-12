import { z } from 'zod'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { generate } from '@/services/stability'
import { prepareFile, uploadBucketImage } from '@/services/storage'
import { StorageBucket } from '@/services/supabase'
import { nano } from '@/lib/nano'

export const designRouter = createTRPCRouter({
  get: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.design.findUnique({
        where: { id: input.id },
        include: {
          pieces: true,
        },
      })
    }),

  generateInspiration: authenticatedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prompt } = input

      const hasPeriod = prompt.trim().endsWith('.')
      const append = hasPeriod ? '' : '.'
      const tunedPrompt = `${prompt}${append} Full body photo photo to be used as a product image on an e-commerce store, simple background, high detail, avoid blurry or bad images.`

      const images = await generate({
        engineId: 'stable-diffusion-xl-1024-v1-0',
        style_preset: '3d-model',
        width: 896,
        height: 1152,
        samples: 4,
        text_prompts: [
          {
            weight: 1,
            text: tunedPrompt,
          },
        ],
      })

      const id = nano()
      const publicUrls: string[] = []

      for (let index = 0; index < images.length; index++) {
        const image = images[index]

        const { fileBody, fileType } = await prepareFile(image.blob)

        const fileName = `sample-${index + 1}.${fileType ?? 'png'}`
        const uploadPath = `/${id}/inspiration`

        const url = await uploadBucketImage(
          fileBody,
          fileName,
          uploadPath,
          StorageBucket.DESIGNS,
        )

        publicUrls.push(url)
      }

      return await ctx.prisma.design.create({
        data: {
          id,
          prompt,
          brandId: ctx.session.userId,
          promptResults: publicUrls,
        },
      })
    }),
})
