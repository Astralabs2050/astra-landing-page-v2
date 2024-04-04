import React from 'react'
import { trpcCaller } from '@/server/utils'
import { DashboardHeader } from '@/components/common'
import { EmptyState } from '@/components/common/empty-state'
import { Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { routes } from '@/constants/app-routes'

export default async function JobApplicants({
  params,
}: {
  params: { id: string }
}) {
  const trpc = await trpcCaller()
  const applications = await trpc.job.getApplications({ jobId: params.id })

  return (
    <div className="space-y-12">
      <DashboardHeader
        title="Job Applicants"
        subtitle="View creators that have applied to your created job."
      />

      {!applications.length ? (
        <EmptyState />
      ) : (
        <div className="mr-10 grid grid-cols-3 gap-10">
          {applications.map((application, index) => {
            const samples = application.applicant.CreatorWork.reduce(
              (prev, curr) => {
                return prev.concat(curr.shots)
              },
              [] as string[],
            )

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-6">
                <div className="grid h-[9.62rem] grid-cols-2 grid-rows-2 gap-1">
                  {samples.slice(0, 3).map((image, index) => (
                    <Image
                      alt="sample-image"
                      key={index}
                      src={image}
                      width={256}
                      height={index === 0 || samples.length < 3 ? 138 : 68}
                      className={cn('max-h-full object-cover', {
                        'col-start-2': index !== 0,
                        'row-span-2':
                          index === 0 || (index === 1 && samples.length < 3),
                      })}
                    />
                  ))}
                </div>
                <div className="relative -mt-20 px-8 pb-8 pt-10">
                  <div className="mb-3 flex flex-col items-center justify-center gap-2 border-b border-b-gray-6 pb-3">
                    <span className="grid size-20 place-items-center rounded-full border-4 border-white bg-gray-3 text-white">
                      <p className="text-2xl font-semibold leading-none">
                        {application.applicant.name.slice(0, 1)}
                      </p>
                    </span>
                    <p className="text-xl font-medium">
                      {application.applicant.name}
                    </p>
                    <p className="text-gray-3">
                      {application.applicant.owner.role === 'DESIGNER'
                        ? '3D Artist, Designer'
                        : 'Outfit Manufacturer'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="flex items-center justify-center space-x-2">
                      <Mail className="size-4" />
                      <span>{application.applicant.email}</span>
                    </p>

                    <p className="flex items-center justify-center space-x-2">
                      <MapPin className="size-4" />
                      <span>
                        {application.applicant.city},{' '}
                        {application.applicant.countryCode}
                      </span>
                    </p>

                    <Link
                      className="!mt-6 inline-block w-full"
                      href={`${routes.dashboard.job}/${params.id}/applications/${application.applicantId}`}>
                      <Button variant="outline" className="w-full">
                        View Application
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
