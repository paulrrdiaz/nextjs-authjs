import httpErrors from 'http-errors'

import { auth } from '@/auth'

export const getCurrentUser = async () => {
  const session = await auth()

  if (!session?.user) {
    throw new httpErrors.Unauthorized(
      'You must be logged in to perform this action',
    )
  }

  return session.user
}

export const getCurrentRole = async () => {
  const session = await auth()

  return session?.user?.role
}
