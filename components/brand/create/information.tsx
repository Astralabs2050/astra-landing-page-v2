'use client'

import React, { Fragment } from 'react'
import Image from 'next/image'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/ui'
import { useDesignForm } from '@/hooks/use-design-form'
import Trash from '@/public/svgs/trash.svg'
import { DesignPiece, PieceMaterial, PieceType } from '@prisma/client'
import { Plus } from 'lucide-react'
import { newPiece } from '@/store/design'
import { cn } from '@/lib/utils'
import { FormPageProps } from '@/types/design-forms'

export const Information = ({ target, design }: FormPageProps) => {
  const {
    name,
    pieces,
    updateState,
    updatePiece,
    saveInformation,
    loading,
    generated,
  } = useDesignForm(target, design)

  return (
    <form
      className="mx-auto w-[60%]"
      onSubmit={e => {
        e.preventDefault()
        saveInformation()
      }}>
      {generated?.length && (
        <div className="mb-6 grid grid-cols-4 gap-4">
          {generated?.map((item, index) => (
            <Image
              key={index}
              alt={`Result for: ${prompt}`}
              src={item}
              width={896}
              height={1152}
              className="w-full rounded-md"
            />
          ))}
        </div>
      )}

      <Input
        required
        placeholder="Give your outfit a name"
        className="px-4"
        value={name}
        onChange={e => updateState('name', e.target.value)}
        label={<span className="font-medium">Name of Outfit</span>}
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
              <div className="grid gap-2">
                <p className="text-base tracking-wide">Select Piece Type</p>
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
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize">
                        {type.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <p className="text-base tracking-wide">
                What material is this piece made of?
              </p>
              <Select
                required
                value={pieces[index].material}
                onValueChange={value => updatePiece(index, 'material', value)}>
                <SelectTrigger className="w-full px-4 font-medium capitalize">
                  <SelectValue
                    placeholder="Select piece Material"
                    className="text-base capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PieceMaterial).map(material => (
                    <SelectItem
                      key={material}
                      value={material}
                      className="capitalize">
                      {material.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <Button
          disabled={loading}
          type="submit"
          size="lg"
          radii="pill"
          className="min-w-72">
          {loading ? (
            <Spinner text="Just a moment" spinnerClass="fill-black w-5 h-5" />
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </form>
  )
}
