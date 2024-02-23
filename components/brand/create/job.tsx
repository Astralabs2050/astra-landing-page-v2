'use client'

import React from 'react'
import Link from 'next/link'
import { LogoMark, Notice } from '@/components/common'
import { Button, Spinner } from '@/components/ui'
import { useDesignForm } from '@/hooks/use-design-form'
import { FormPageProps } from '@/types/design-forms'
import { routes } from '@/constants/app-routes'
import { useRouter } from 'next-nprogress-bar'

export const Job = ({ target, design }: FormPageProps) => {
  const router = useRouter()

  const { data, loading, mintAndCreateJob, completed } = useDesignForm(
    target,
    design,
  )

  const totalPrice = () => {
    return (
      data?.pieces.reduce((cumm, curr) => {
        return cumm + curr.pricePerPiece
      }, 0) ?? 0
    )
  }

  if (completed) {
    return (
      <Notice
        title="Congratulations!"
        subtitle={`Your outfit has been successfully minted as an NFT, and ${target === 'DESIGNER' ? 'a design job has been created.' : 'has been sent out to manufacturers. You will receive a list of applicants shortly'} `}
        cta={{
          text: 'Proceed',
          action: () => router.push(routes.dashboard.designs),
        }}
      />
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
        <Link href={routes.dashboard.designs} className="inline-block w-full">
          <Button variant="outline" radii="pill" size="lg" className="w-full">
            Cancel
          </Button>
        </Link>

        <Button radii="pill" size="lg" onClick={mintAndCreateJob}>
          {loading ? (
            <Spinner text="Just a moment" spinnerClass="fill-black w-5 h-5" />
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </div>
  )
}
