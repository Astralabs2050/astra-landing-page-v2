'use client'

import React, { Fragment } from 'react'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { useDesignForm } from '@/hooks/use-design-form'
import Trash from '@/public/svgs/trash.svg'
import { DesignPiece, PieceType } from '@prisma/client'
import { Plus, X } from 'lucide-react'
import { newPiece } from '@/store/design'
import { cn } from '@/lib/utils'

export const Information = () => {
  const { pieces, updateState, updatePiece } = useDesignForm()

  return (
    <form>
      <Input
        required
        placeholder="Give your outfit a name"
        label="Name of Outfit"
        className="px-4"
      />

      {pieces.map((piece, index) => (
        <Fragment key={`piece-${index}`}>
          <div className="mb-6 mt-8 h-[1px] bg-gray-6" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Piece {index + 1}</h3>
              {pieces.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="hover:text-destructive"
                  onClick={() => {
                    const data = [...pieces]

                    data.splice(index, 1)
                    updateState('pieces', data)
                  }}>
                  <Trash className="size-5" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Select
                required
                value={pieces[index].type}
                onValueChange={value => updatePiece(index, 'type', value)}>
                <SelectTrigger className="w-full px-4 font-medium capitalize">
                  <SelectValue
                    placeholder="Select piece type"
                    className="text-base capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PieceType).map(type => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {pieces[index].type && (
                <div className="mx-10 flex items-center justify-between rounded-lg bg-neutral-50 p-5">
                  <div>
                    <p className="text-lg font-semibold capitalize">
                      {pieces[index].type.toLowerCase()}
                    </p>
                    <p className="text-sm text-gray-3">
                      Modelling Price: $50/Piece
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="fit"
                    type="button"
                    className="mr-1"
                    onClick={() => updatePiece(index, 'type', null)}>
                    <X className="size-5" />
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                required
                type="number"
                placeholder="Enter number of available stock"
                value={!piece.pieceCount ? '' : piece.pieceCount}
                onChange={e => {
                  updatePiece(index, 'pieceCount', Number(e.target.value))
                }}
                label={
                  <span className="font-medium">
                    How many of this do you wish to make?
                  </span>
                }
              />
              <Input
                required
                placeholder="1.00"
                type="number"
                value={!piece.pricePerPiece ? '' : piece.pricePerPiece}
                onChange={e => {
                  updatePiece(index, 'pricePerPiece', Number(e.target.value))
                }}
                prepend={
                  <span
                    className={cn('-mr-1', {
                      'text-gray-3': !piece.pricePerPiece,
                    })}>
                    $
                  </span>
                }
                append={
                  <span className="shrink-0 text-xs text-gray-3">
                    ≈0.025 ASTRAS
                  </span>
                }
                label={
                  <span className="font-medium">Enter Price per Piece</span>
                }
              />
            </div>
          </div>
        </Fragment>
      ))}

      <div className="mt-10 flex flex-col">
        <div className="my-4 h-[1px] bg-gray-6" />
        <Button
          type="button"
          variant="secondary"
          className="ml-auto"
          onClick={() => {
            updateState('pieces', [...pieces, newPiece as DesignPiece])
          }}>
          <Plus className="mr-2 size-4" />
          Add New Piece
        </Button>
        <div className="my-4 h-[1px] bg-gray-6" />
      </div>

      <div className="mt-6 grid place-items-center">
        <Button size="lg" radii="pill" className="min-w-72">
          Next
        </Button>
      </div>
    </form>
  )
}
