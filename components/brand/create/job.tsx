'use client'

import { LogoMark } from '@/components/common'
import { Button } from '@/components/ui'
import { useDesignForm } from '@/hooks/use-design-form'
import { JobTarget } from '@prisma/client'
import React from 'react'

export const Job = ({ target, id }: { id?: string; target: JobTarget }) => {
  const { data } = useDesignForm(target, id)

  const totalPrice = () => {
    return (
      data?.pieces.reduce((cumm, curr) => {
        return cumm + curr.pricePerPiece
      }, 0) ?? 0
    )
  }

  return (
    <div className="mx-auto mt-10 w-[55%]">
      <div className="grid gap-4">
        {data?.pieces.map((piece, index) => (
          <div key={index} className="space-y-1 rounded-lg bg-neutral-50 p-5">
            <p className="text-lg font-semibold capitalize">
              <span>{piece.type.toLowerCase()}</span>{' '}
              <span className="ml-0.5 text-base font-normal">
                ({piece.material.toLowerCase()})
              </span>
            </p>

            <div className="flex items-center justify-between text-base text-gray-3">
              <p>
                Price per piece:
                <span className="ml-2 font-medium text-gray-3">
                  ${piece.pricePerPiece}
                </span>
              </p>
              <p>
                Number of Available Stocks:
                <span className="ml-2 font-medium text-gray-3">
                  {piece.pieceCount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-12 h-[1px] bg-gray-6" />

      <div className="flex items-center justify-between">
        <p>Total Price</p>
        <div className="flex items-center space-x-4">
          <LogoMark className="size-8" />
          <div>
            <p className="text-xl font-semibold">
              ${totalPrice()}{' '}
              <span className="text-base font-normal text-gray-3">
                ≈ 143 Astras
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 px-4">
        <Button variant="outline" radii="pill" size="lg">
          Cancel
        </Button>

        <Button radii="pill" size="lg">
          Pay Now
        </Button>
      </div>
    </div>
  )
}
