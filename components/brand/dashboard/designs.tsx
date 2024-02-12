'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { DesignCard, DesignCardMenu } from '@/components/common/design-card'
import { Design } from '@/types/models'
import { Button, Badge } from '@/components/ui'
import { routes } from '@/constants/app-routes'

interface DesignsProps {
  designs?: Design[]
}

export const Designs = ({ designs }: DesignsProps) => {
  if (designs?.length === 0) {
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

  return (
    <Fragment>
      <h2 className="mb-6 text-xl font-medium">Recent Designs</h2>
      <div className="grid grid-cols-4 gap-4">
        {designs?.map(({ key, ...design }) => (
          <DesignCard
            key={key}
            title={design.name ?? design.prompt ?? 'Outfit'}
            image={design.promptResults[0]}
            hideIcon={!design.pieces.length}
            menuContent={<DesignCardMenu {...design} />}
            subtitle={
              <Fragment>
                {!design.txHash ? (
                  <Badge variant="warning">Draft</Badge>
                ) : (
                  <Fragment>`${design.pieces.length} Pieces`</Fragment>
                )}
              </Fragment>
            }
          />
        ))}
      </div>
      <Button className="mx-auto">View All</Button>
    </Fragment>
  )
}
