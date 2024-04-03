import React from 'react'
import Image from 'next/image'
import Download from '@/public/svgs/download.svg'
import { trpcCaller } from '@/server/utils'
import { Button } from '@/components/ui'
import { ChevronLeft, Info } from 'lucide-react'
import { Collapsible } from '@/components/common'
import { AmountInput } from '@/components/creator/job-application/amount-input'
import { SubmitApplication } from '@/components/creator/job-application/submit-application'
import { notFound } from 'next/navigation'
import { ApplicationNotice } from '@/components/creator/job-application/application-notice'

export default async function JobApply({ params }: { params: { id: string } }) {
  const trpc = await trpcCaller()
  const job = await trpc.job.get({ id: params.id })

  if (!job) {
    return notFound()
  }

  const application = await trpc.job.getApplication({ jobId: job.id })

  if (application) {
    return <ApplicationNotice />
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <ChevronLeft />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">Send Your Applciation</h1>
          <p className="text-lg text-gray-3">
            Apply for this job, and the client would reach out to you.
          </p>
        </div>
      </div>

      <div className="dashed-border grid grid-cols-4 gap-4 p-2">
        {job.design.promptResults?.map((item, index) => (
          <Image
            width={220}
            height={225}
            key={index}
            src={item}
            alt={job.design.name ?? 'prompt results'}
            className="h-auto w-full rounded-sm"
          />
        ))}
      </div>

      <Collapsible title="Job Information">
        <div className="grid gap-10">
          <div className="flex gap-20">
            <div>
              <p className="text-gray-3">Name of Outfit</p>
              <p className="text-xl font-medium">{job.design.name}</p>
            </div>

            <div>
              <p className="text-gray-3">AI Prompt</p>
              <p className="text-xl font-medium">{job.design.prompt}</p>
            </div>
          </div>

          <div className="flex gap-20">
            {job.design.pieces.map((piece, index) => (
              <div key={index}>
                <p className="text-gray-3">Piece {index + 1}</p>
                <p className="text-xl font-medium">
                  <span className="capitalize">
                    {piece.material.toLowerCase()} {piece.type.toLowerCase()}
                  </span>{' '}
                  - {piece.pieceCount} Piece
                  {piece.pieceCount > 1 && 's'}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-gray-3">Provided sketches or samples</p>
            <div className="flex items-center gap-6">
              <Button
                size="fit"
                variant="ghost"
                className="flex items-center gap-2 text-gray-3">
                <Download className="size-6" />
                <span className="text-lg font-normal underline">
                  Download Files
                </span>
              </Button>
              <div className="flex items-center gap-1 text-blue-1">
                <Info className="size-5" />
                <span className="font-medium">
                  Files will only be available when you have been selected for a
                  Job
                </span>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      <Collapsible title="Payment Terms">
        <div className="space-y-10 py-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-medium">
                How much would you like to charge for this job?
              </p>
              <p className="text-gray-3">
                Total amount the client will see on your proposal
              </p>
            </div>

            <AmountInput />
          </div>
        </div>
      </Collapsible>

      <SubmitApplication jobId={job.id} />
    </div>
  )
}
