import { Design } from '@/types/models'
import { DesignPiece, Sketch } from '@prisma/client'
import { map } from 'nanostores'
import { z } from 'zod'

export const $design = map({
  prompt: z.string()._input,
  imagePrompt: z.string()._input,
  inspiration: null as Omit<Design, 'pieces'> | null,
})

export const newPiece = { pieceCount: 1, pricePerPiece: 0 }
export const $designform = map({
  name: '',
  prints: ['', '', ''],
  pieces: [newPiece] as Omit<
    DesignPiece,
    'key' | 'id' | 'createdAt' | 'updatedAt'
  >[],
  sketches: [
    { view: 'FRONT' },
    { view: 'SIDE1' },
    { view: 'SIDE2' },
    { view: 'BACK' },
  ] as Omit<Sketch, 'key' | 'id'>[],
  processing: false,
})
