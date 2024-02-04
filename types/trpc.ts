import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { Session } from '@auth0/nextjs-auth0'

export type CreateTrpcContext = (_opts: { req: NextRequest }) => {
  req?: NextRequest
  prisma: PrismaClient
  nextReq: NextRequest | null
  session?: Session | null
}

export type CreateTrpcInnerContext = () => Promise<
  ReturnType<CreateTrpcContext>
>
