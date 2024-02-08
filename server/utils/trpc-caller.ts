import { appRouter } from '../routers/root'
import { prisma } from '../db'
import { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { t } from '@/services/trpc-server'

export const trpcCaller = async (nextReq?: NextRequest) => {
  const session = await getSession()
  const caller = t.createCallerFactory(appRouter)

  return caller({
    prisma,
    nextReq: nextReq ?? null,
    session: session,
  })
}
