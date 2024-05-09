import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { LoginFormSchema } from '@/lib/schemas'
import { getUserByIdOrEmail } from '@/models/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByIdOrEmail({ email })

          if (!user?.password) {
            return null
          }

          const passwordMatch = await bcryptjs.compare(password, user.password)

          if (passwordMatch) {
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
