import React from 'react'
import Link from 'next/link'
import Filter from '@/public/svgs/filter.svg'
import { trpcCaller } from '@/server/utils'
import { formatDistance } from 'date-fns'
import { Button } from '@/components/ui'
import { Bookmark } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'
import { DashboardHeader } from '@/components/common'

export default async function CreatorDashboard() {
  const trpc = await trpcCaller()
  const creator = await trpc.creator.get()
  const jobs = await trpc.job.getListings()

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <DashboardHeader
          backButton={false}
          title={`Hello, ${creator?.name} 👋`}
          subtitle="Here are the available jobs waiting for you to apply"
        />

        <Button
          variant="outline"
          className="flex items-center gap-2 !border-gray-5">
          <Filter className="size-6" />
          Filter & Sort
        </Button>
      </div>

      {!jobs.length ? (
        <EmptyState
          text={
            <span className="inline-block text-center text-lg opacity-65">
              No Jobs available at the moment, <br /> check back later.
            </span>
          }
        />
      ) : (
        <div className="space-y-8">
          {jobs.map((item, index) => {
            const time = formatDistance(item.updatedAt, new Date(), {
              addSuffix: true,
            })

            return (
              <div
                key={index}
                className="flex items-end justify-between rounded-xl bg-gray-6 p-6">
                <div className="space-y-1">
                  <p className="pb-2 text-base text-gray-3">
                    {item.design.brand.name}
                  </p>
                  <h4 className="text-xl font-medium">
                    {item.target === 'DESIGNER'
                      ? '3D assets for'
                      : 'Manufacture'}{' '}
                    {item.design.name}
                  </h4>

                  <p className="flex items-center gap-4 text-sm font-medium tracking-wide text-gray-3">
                    <span>Posted {time}</span>
                    <span className="text-blue-1">10 Applicants</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" radii="pill" className="gap-2">
                    <Bookmark className="size-4" /> Save for Later
                  </Button>
                  <Link href={`/dashboard/job/${item.id}/apply`}>
                    <Button radii="pill">Apply Now</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
