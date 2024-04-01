import { trpcCaller } from '@/server/utils'
import { formatDistance } from 'date-fns'
import React from 'react'
import { Button } from '@/components/ui'
import { File } from 'lucide-react'

export default async function CreatorDashboard() {
  const trpc = await trpcCaller()
  const creator = await trpc.creator.get()
  const jobs = await trpc.job.getListings()

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Hello, {creator?.name} 👋</h1>
          <p className=" text-xl text-gray-3">
            Here are the available jobs waiting for you to apply
          </p>
        </div>
      </div>

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
                  {item.target === 'DESIGNER' ? '3D assets for' : 'Manufacture'}{' '}
                  {item.design.name}
                </h4>

                <p className="flex items-center gap-4 text-sm font-medium tracking-wide text-gray-3">
                  <span>Posted {time}</span>
                  <span className="text-blue-1">10 Applicants</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" radii="pill" className="gap-2">
                  <File className="size-4" /> View Job Files
                </Button>
                <Button radii="pill">Apply Now</Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
