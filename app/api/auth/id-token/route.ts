import { getSession } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const session = await getSession()

  if (session) {
    return new NextResponse(session.idToken as string, {
      status: 200,
    })
  }

  return new NextResponse(null, {
    status: 401,
  })
}
