import { Analytics } from '@/components/brand/dashboard'
import { Button } from '@/components/ui'
import { routes } from '@/constants/app-routes'
import { trpcCaller } from '@/server/utils'
import Link from 'next/link'
import React from 'react'

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

      <div className="relative min-h-80 rounded-xl border border-solid p-6">
        {designs.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <p className=" text-xl text-gray-3">
              You do not have any uploaded outfits
            </p>
            <Link href={routes.dashboard.space}>
              <Button variant="outline" radii="pill" size="lg">
                Upload New Design
              </Button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
