import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/db'

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    })

    return passwordResetToken
  } catch (error: any) {
    console.error('error', error.message)
    return null
  }
}

export const deletePasswordResetTokenById = async (id: string) => {
  try {
    await db.passwordResetToken.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    return false
  }
}
