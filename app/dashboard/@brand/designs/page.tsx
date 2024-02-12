import React, { Fragment } from 'react'
import { trpcCaller } from '@/server/utils'
import { DesignCard } from '@/components/common/design-card'
import { Badge, Tabs, TabsList, TabsTrigger } from '@/components/ui'

export default async function BrandDashboard() {
  const trpc = await trpcCaller()
  const designs = await trpc.brand.getDesigns()

  return (
    <Tabs defaultValue="minted">
      <TabsList className="flex items-center justify-start">
        <TabsTrigger value="minted">Minted NFTs</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="created-jobs">Created Jobs</TabsTrigger>
        <TabsTrigger value="ongoing-jobs">Ongoing Jobs</TabsTrigger>
      </TabsList>

      <div className="grid grid-cols-4 gap-4">
        {designs.map((design, index) => (
          <DesignCard
            key={index}
            title={design.name ?? design.prompt}
            image={design.promptResults[0]}
            hideIcon={!design.pieces.length}
            subtitle={
              !design.txHash ? (
                <Badge variant="warning">Draft</Badge>
              ) : (
                <Fragment>`${design.pieces.length} Pieces`</Fragment>
              )
            }
          />
        ))}
      </div>
    </Tabs>
  )
}
