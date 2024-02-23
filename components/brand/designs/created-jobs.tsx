'use client'
import React, { Fragment } from 'react'
import Suitcase from '@/public/svgs/suitcase.svg'
import { DesignCard, DesignCardMenu } from '@/components/common'
import { EmptyState } from '@/components/common/empty-state'
import { Button, Spinner } from '@/components/ui'
import { api } from '@/services/trpc-client'

export const CreatedJobs = () => {
  const { data, isLoading } = api.job.getPostings.useQuery()

  if (isLoading) {
    return (
      <div className="grid min-h-44 place-items-center">
        <Spinner />
      </div>
    )
  }

  if (data && !data.length) {
    return <EmptyState text="No Items" />
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map(({ key, ...job }) => (
        <DesignCard
          key={key}
          title={job.design.name ?? job.design.prompt ?? 'Outfit'}
          image={job.design.promptResults[0]}
          menuContent={<DesignCardMenu {...job.design} />}
          subtitle={
            <Fragment>
              {job.design.pieces.length} Piece
              {job.design.pieces.length > 1 && 's'}
            </Fragment>
          }
          cta={
            <Button variant="outline" className="w-full text-sm" size="sm">
              <Suitcase className="mr-2 size-4" />
              View Applications
            </Button>
          }
        />
      ))}
    </div>
  )
}
