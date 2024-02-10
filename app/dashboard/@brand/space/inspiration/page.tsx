import { PromptForm } from '@/components/brand/space'
import { trpcCaller } from '@/server/utils'
import React, { Fragment } from 'react'

async function fetchInspiration(id?: string) {
  if (!id) {
    return undefined
  }

  const trpc = await trpcCaller()
  return trpc.design.fetchInspiration({ id })
}

export default async function Inspiration({
  searchParams,
}: {
  searchParams: { generated: string | undefined }
}) {
  const id = searchParams.generated
  const inspiration = await fetchInspiration(id)

  return (
    <Fragment>
      <PromptForm data={inspiration} />
    </Fragment>
  )
}
