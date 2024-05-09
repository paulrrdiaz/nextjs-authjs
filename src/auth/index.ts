import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

import db from '@/lib/db'
import { getUserByIdOrEmail } from '@/models/user'
import { AUTH_ROUTES } from '@/routes'

import authConfig from './config'

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    newUser: AUTH_ROUTES.REGISTER,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserByIdOrEmail({ id: user.id })

      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserByIdOrEmail({ id: token.sub })

      if (!existingUser) return token

      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
