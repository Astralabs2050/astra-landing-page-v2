import { Session } from '@auth0/nextjs-auth0'
import { Role } from '@prisma/client'
import React, { Fragment } from 'react'
import { Role as RoleCard } from './role'

interface RolesProps {
  roles: Role[]
  session?: Session | null
}

export function Roles({ roles, session }: RolesProps) {
  return (
    <Fragment>
      <div className="space-y-2 text-center">
        <h1 className="bg-blue-radial bg-clip-text text-center text-2xl font-semibold capitalize text-transparent">
          Hello, {session?.user.nickname}
        </h1>
        <p className="text-3xl font-medium">
          What will you be joining Astra as?
        </p>
      </div>

      <div className="mt-20 grid auto-cols-fr grid-flow-col gap-6 px-24">
        {roles.map((item, index) => (
          <Fragment key={item.id}>
            <RoleCard role={item} index={index} />
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}
