import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { routes } from '@/constants/app-routes'
import { JobTargetDialog } from '@/components/common/job-target-dialog'

export default function Space() {
  return (
    <Fragment>
      <Image
        alt="creative space banner"
        src="/imgs/creative-space-banner.png"
        width={291}
        height={387}
        className="mx-auto h-[24.1rem] w-[18.1rem]"
      />

      <div className="mx-auto grid w-fit grid-cols-2 gap-2 pt-4">
        <JobTargetDialog>
          <Button variant="outline" size="lg" className="w-full">
            Upload Designs
          </Button>
        </JobTargetDialog>

        <Link href={routes.dashboard.inspiration}>
          <Button size="lg">Generate Inspiration (3 free trials)</Button>
        </Link>
      </div>
    </Fragment>
  )
}
