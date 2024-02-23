import React, { Fragment } from 'react'
import { DesignCard } from '@/components/common/design-card'
import { Design } from '@/types/models'
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
          title={design.name ?? design.prompt ?? 'Outfit'}
          image={design.promptResults[0]}
          subtitle={
            <Fragment>
              {design.pieces.length} Piece{design.pieces.length > 1 && 's'}
            </Fragment>
          }
        />
      ))}
    </div>
  )
}
