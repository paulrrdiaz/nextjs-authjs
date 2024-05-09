import { User } from '@prisma/client'

import db from '@/lib/db'

type keys = 'email' | 'id'
type getUserByIdOrEmailArgs = {
  [key in keys]?: string
}

export const getUserByIdOrEmail = async (args: getUserByIdOrEmailArgs) => {
  try {
    let user = null
    const { id, email } = args

    if (id) {
      user = await db.user.findUnique({
        where: {
          id,
        },
      })
    } else if (email) {
      user = await db.user.findUnique({
        where: {
          email,
        },
      })
    }

    return user
  } catch (error) {
    return null
  }
}

export const updateUserById = async (id: string, data: Partial<User>) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  } catch (error) {
    return null
  }
}
