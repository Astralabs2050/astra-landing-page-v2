import React, { Fragment } from 'react'
import { JobTarget } from '@prisma/client'
import { trpcCaller } from '@/server/utils'
import { notFound, redirect } from 'next/navigation'
import { BackButton } from '@/components/common/back-button'
import { Information } from '@/components/brand/create/information'
import { Sketches } from '@/components/brand/create/sketches'
import { Job } from '@/components/brand/create/job'
import { Params } from '@/types/design-forms'
import { routes } from '@/constants/app-routes'

async function getDesign({ id, target }: Params['searchParams']) {
  if (!target || !JobTarget[target]) {
    return null
  }

  if (!id) {
    return undefined
  }

  const trpc = await trpcCaller()
  return await trpc.design.get({ id })
}

export default async function Create({
  searchParams: { id, target, step },
}: Params) {
  const progress = step ?? 1
  const design = await getDesign({ id, target, step })

  if (design === null) {
    return notFound()
  }

  if (!!design?.txHash) {
    return redirect(routes.dashboard.designs)
  }

  return (
    <Fragment>
      <div className="mb-12 grid grid-cols-[20rem,1fr,20rem] place-items-start items-center">
        <BackButton />

        <div className="w-full shrink-0 space-y-1 text-center">
          <h1 className="text-[1.7rem] font-medium">
            {
              [
                !design ? 'Add a new look' : 'Additional information',
                'Any sketches or samples?',
                target == 'MANUFACTURER'
                  ? 'Pay to manufacture your idea'
                  : 'Create a design job',
              ][progress - 1]
            }
          </h1>
          <p hidden={progress === 3} className="tracking-wide text-gray-3">
            {
              [
                'Select Piece Type and Number of available stock',
                'Uploading sketches/samples would help improve your output',
              ][progress - 1]
            }
          </p>
        </div>

        <p className="ml-auto bg-blue-radial bg-clip-text pr-4 text-base font-medium text-transparent">
          {progress}/3
        </p>
      </div>

      <div className="mx-auto">
        {
          {
            1: <Information target={target} design={design} />,
            2: <Sketches target={target} design={design} />,
            3: <Job target={target} design={design} />,
          }[progress]
        }
      </div>
    </Fragment>
  )
}
