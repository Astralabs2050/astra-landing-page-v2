import React from 'react'
import { Analytics } from '@/components/brand/dashboard'
import { Designs } from '@/components/brand/dashboard/designs'
import { trpcCaller } from '@/server/utils'

export default async function BrandDashboard() {
  const trpc = await trpcCaller()
  const brand = await trpc.brand.get()
  const designs = await trpc.brand.getDesigns()

  return (
    <div className="space-y-12 pt-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2">
        <h1 className="text-3xl font-semibold">
          Hello,{' '}
          <span className="bg-blue-radial bg-clip-text font-medium text-transparent">
            {brand?.name}
          </span>
        </h1>
        <p className=" text-gray-3">Welcome to your Dashboard!</p>
      </div>

      <Analytics brand={brand} />

      <div className="relative min-h-80 space-y-6 rounded-xl border border-solid border-gray-6 p-6">
        <Designs designs={designs} />
      </div>
    </div>
  )
}
