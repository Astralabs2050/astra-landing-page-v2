import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import * as jose from 'jose'

export type JwtSessionData = jose.JWTVerifyResult<jose.JWTPayload>['payload']

export type CreateTrpcContext = (_opts: { req: NextRequest }) => {
  req?: NextRequest
  prisma: PrismaClient
  nextReq: NextRequest | null
  session: JwtSessionData | null

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
