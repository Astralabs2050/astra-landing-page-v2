import { PrismaClient } from '@prisma/client'
import { Session } from 'next-auth'
import { NextRequest } from 'next/server'

export type CreateTrpcContext = (_opts: { req: NextRequest }) => {
  req?: NextRequest
  prisma: PrismaClient
  nextReq: NextRequest | null
  session: Session | null

  /**
   * you can add extra data types
   * to be acessible from trpc context here
   * and then eslint will highlight all files
   * where you need to add this new context value
   */
}

export type CreateTrpcInnerContext = () => Promise<
  ReturnType<CreateTrpcContext>
>
