import { Design } from '@/types/models'
import { DesignPiece, Sketch } from '@prisma/client'
import { map } from 'nanostores'
import { z } from 'zod'

export const $design = map({
  prompt: z.string()._input,
  imagePrompt: z.string()._input,
  inspiration: null as Omit<Design, 'pieces'> | null,
})

export const newPiece = { pieceCount: 1 }
export const $designform = map({
  name: z.string(),
  pieces: [newPiece] as Omit<DesignPiece, 'key' | 'id'>[],
  sketches: [] as Omit<Sketch, 'key' | 'id'>[],
  prints: z.array(z.string()),
})
