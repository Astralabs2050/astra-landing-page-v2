'use client'

import React from 'react'
import { api } from '@/services/trpc-client'
import { DesignCard, DesignCardMenu } from '@/components/common'
import { Badge, Spinner } from '@/components/ui'

export const Drafts = () => {
  const { data, isLoading } = api.brand.getDrafts.useQuery()

  if (isLoading) {
    return (
      <div className="grid min-h-44 place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map(({ key, ...design }) => (
        <DesignCard
          key={key}
          title={design.name ?? design.prompt}
          image={design.promptResults[0]}
          hideIcon={true}
          subtitle={<Badge variant="warning">Draft</Badge>}
          menuContent={<DesignCardMenu {...design} />}
        />
      ))}
    </div>
  )
}
