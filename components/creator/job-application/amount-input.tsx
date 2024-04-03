'use client'

import { Checkbox, Input } from '@/components/ui'
import { $jobApplication } from '@/store/job-application'
import { useStore } from '@nanostores/react'
import React from 'react'

export const AmountInput = () => {
  const application = useStore($jobApplication)

  return (
    <div className="space-y-6">
      <Input
        type="number"
        name="amount"
        placeholder="0.00"
        className="h-[3.25rem] min-w-80 rounded-[37px] px-6"
        prepend={<span className="text-gray-2">$</span>}
        onChange={e => $jobApplication.setKey('charge', Number(e.target.value))}
      />

      <div className="flex items-center gap-2 text-lg text-gray-3">
        <Checkbox
          id="negotiations"
          className="ml-auto size-5"
          value={application.charge ?? ''}
          checked={application.openToNegotiations}
          onCheckedChange={() => {
            $jobApplication.setKey(
              'openToNegotiations',
              !application.openToNegotiations,
            )
          }}
        />
        <label htmlFor="negotiations">I am open to negotiations</label>
      </div>
    </div>
  )
}
