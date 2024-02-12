'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { DesignCard } from '@/components/common/design-card'
import { api } from '@/services/trpc-client'
import { Design } from '@/types/models'
import { Button, Badge, Spinner } from '@/components/ui'
import { routes } from '@/constants/app-routes'

interface DesignsProps {
  designs?: Design[]
}

export const Designs = ({ designs }: DesignsProps) => {
  const { data, isLoading } = api.brand.getDrafts.useQuery(
    { count: 4 },
    {
      enabled: !designs?.length,
    },
  )

  function renderWithWrapper(children: React.ReactNode) {
    return (
      <Fragment>
        <h2 className="mb-6 text-xl font-medium">Recent Designs</h2>
        {children}
        <Button className="mx-auto">View All</Button>
      </Fragment>
    )
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <Spinner />
      </div>
    )
  }

  if (designs?.length === 0 && data?.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
        <p className=" text-xl text-gray-3">
          You do not have any uploaded outfits
        </p>
        <Link href={routes.dashboard.space}>
          <Button variant="outline" radii="pill" size="lg">
            Upload New Design
          </Button>
        </Link>
      </div>
    )
  }

  if (designs?.length) {
    return renderWithWrapper(
      <div className="grid grid-cols-4 gap-4">
        {designs.map((design, index) => (
          <DesignCard
            key={index}
            title={design.name}
            subtitle={`${design.pieces.length} Pieces`}
            image={design.inspiration?.promptResults[0] ?? ''}
          />
        ))}
      </div>,
    )
  }

  return renderWithWrapper(
    <div className="grid grid-cols-4 gap-4">
      {data?.map((inspiration, index) => (
        <DesignCard
          key={index}
          title={inspiration.prompt}
          image={inspiration.promptResults[1]}
          subtitle={<Badge variant="warning">Draft</Badge>}
        />
      ))}
    </div>,
  )
}
