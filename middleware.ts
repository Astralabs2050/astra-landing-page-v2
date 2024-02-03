import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export const config = {
  matcher: ['/:path', '/dashboard/:path*'],
}

export default withMiddlewareAuthRequired()
