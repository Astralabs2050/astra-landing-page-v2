import React, { Fragment } from 'react'
import { DesignCard } from '@/components/common/design-card'
import { Design } from '@/types/models'
import { Badge } from '@/components/ui'
import { EmptyState } from '@/components/common/empty-state'

interface MintedProps {
  designs: Design[]
}

export const Minted = ({ designs }: MintedProps) => {
  if (!designs.length) {
    return <EmptyState text="No Items" />
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {designs.map((design, index) => (
        <DesignCard
          key={index}
          title={design.name ?? design.prompt}
          image={design.promptResults[0]}
          hideIcon={!design.pieces.length}
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
  )
}
