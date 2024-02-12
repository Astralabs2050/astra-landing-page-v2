import React, { Fragment } from 'react'
import { JobTarget } from '@prisma/client'
import { trpcCaller } from '@/server/utils'
import { notFound } from 'next/navigation'
import { BackButton } from '@/components/common/back-button'
import { Information } from '@/components/brand/create/information'
import { Sketches } from '@/components/brand/create/sketches'
import { Job } from '@/components/brand/create/job'

type Params = {
  searchParams: {
    id: string | undefined
    target: JobTarget | undefined
    step: number | undefined
  }
}

async function getDesign({ id, target }: Params['searchParams']) {
  if (!id || !target || !JobTarget[target]) {
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

  return (
    <Fragment>
      <div className="mb-12 grid grid-cols-3 place-items-start items-center">
        <BackButton />

        <div className="space-y-1 text-center">
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
          <p hidden={progress === 3} className="text-gray-3">
            {
              [
                'Select Piece Type and Number of available stock',
                'Uploading sketches/samples would help improve your outpu',
              ][progress - 1]
            }
          </p>
        </div>

        <p className="ml-auto bg-blue-radial bg-clip-text pr-4 text-base font-medium text-transparent">
          {progress}/3
        </p>
      </div>

      <div className="mx-auto w-[60%]">
        {
          {
            1: <Information key={1} />,
            2: <Sketches key={2} />,
            3: <Job key={3} />,
          }[progress]
        }
      </div>
    </Fragment>
  )
}
