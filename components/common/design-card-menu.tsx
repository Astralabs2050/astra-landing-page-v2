'use client'

import React from 'react'
import ShirtFolded from '@/public/svgs/shirt-folded.svg'
import Trash from '@/public/svgs/trash.svg'
import Cube from '@/public/svgs/cube.svg'
import { routes } from '@/constants/app-routes'
import { Design } from '@/types/models'
import { CreatorType } from '@prisma/client'
import { useRouter } from 'next-nprogress-bar'
import { Fragment } from 'react'
import { Button, DropdownMenuItem, DropdownMenuSeparator } from '../ui'
import { Link } from 'lucide-react'
import { OnChainCert } from './on-chain-cert'

export const DesignCardMenu = (props: Partial<Design>) => {
  const { push } = useRouter()
  const { DESIGNER, MANUFACTURER } = CreatorType

  const isDesignJob =
    props.jobs?.[0]?.target === 'DESIGNER' ||
    props.jobs?.[1]?.target === 'DESIGNER'

  return (
    <Fragment>
      {(!props.txHash || !isDesignJob) && (
        <DropdownMenuItem
          onClick={() => {
            push(`${routes.dashboard.create}?target=${DESIGNER}&id=${props.id}`)
          }}>
          <Cube className="mr-2 size-5" />
          <span>Turn to 3D</span>
        </DropdownMenuItem>
      )}

      {(!props.txHash || isDesignJob) && (
        <DropdownMenuItem
          onClick={() => {
            const url = `${routes.dashboard.create}?target=${MANUFACTURER}&id=${props.id}`
            push(url)
          }}>
          <ShirtFolded className="mr-2 size-5" />
          <span>Make it Real</span>
        </DropdownMenuItem>
      )}

      {props.txHash && (
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <OnChainCert {...props}>
            <Button variant="ghost" size="fit" className="text-sm font-normal">
              <Link className="mr-2 size-5 scale-90" />
              <span>View Certificate</span>
            </Button>
          </OnChainCert>
        </DropdownMenuItem>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-white">
        <Trash className="mr-2 size-5" />
        <span>Delete</span>
      </DropdownMenuItem>
    </Fragment>
  )
}
