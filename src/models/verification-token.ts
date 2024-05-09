import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}

export const deleteVerificationTokenById = async (id: string) => {
  try {
    await db.verificationToken.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    return false
  }
}
