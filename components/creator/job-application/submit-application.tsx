'use client'

import React from 'react'
import { Button, Spinner } from '@/components/ui'
import { api } from '@/services/trpc-client'
import { $jobApplication } from '@/store/job-application'
import { useStore } from '@nanostores/react'
import { useRouter } from 'next-nprogress-bar'

interface SubmitApplicationProps {
  jobId: string
}

export const SubmitApplication = ({ jobId }: SubmitApplicationProps) => {
  const application = useStore($jobApplication)

  const { refresh } = useRouter()
  const { mutateAsync } = api.job.apply.useMutation()

  return (
    <Button
      size="lg"
      radii="pill"
      disabled={application.submitting || application.charge === 0}
      onClick={async () => {
        $jobApplication.setKey('submitting', true)

        await mutateAsync({
          jobId,
          charge: application.charge,
          negotiations: application.openToNegotiations,
        })

        refresh()
      }}>
      {application.submitting ? (
        <Spinner text="Just a moment" spinnerClass="fill-black w-5 h-5" />
      ) : (
        'Send Application'
      )}
    </Button>
  )
}
