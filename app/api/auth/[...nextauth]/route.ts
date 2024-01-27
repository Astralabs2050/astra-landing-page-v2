import NextAuth from 'next-auth'
import { config } from '@/server/utils'

const handler = NextAuth(config)
export { handler as GET, handler as POST }
