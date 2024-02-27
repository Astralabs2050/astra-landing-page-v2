import React from 'react'
import { trpcCaller } from '@/server/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import {
  CreatedJobs,
  OngoingJobs,
  Drafts,
  Minted,
} from '@/components/brand/designs'

export default async function BrandDashboard() {
  const trpc = await trpcCaller()
  const designs = await trpc.brand.getDesigns({ excludeDrafts: true })

  return (
    <Tabs defaultValue="minted">
      <TabsList className="mb-6 flex items-center justify-start">
        <TabsTrigger value="minted">Minted NFTs</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="created-jobs">Created Jobs</TabsTrigger>
        <TabsTrigger value="ongoing-jobs">Ongoing Jobs</TabsTrigger>
      </TabsList>

      <TabsContent value="minted">
        <Minted designs={designs} />
      </TabsContent>

      <TabsContent value="drafts">
        <Drafts />
      </TabsContent>

      <TabsContent value="created-jobs">
        <CreatedJobs />
      </TabsContent>

      <TabsContent value="ongoing-jobs">
        <OngoingJobs />
      </TabsContent>
    </Tabs>
  )
}
