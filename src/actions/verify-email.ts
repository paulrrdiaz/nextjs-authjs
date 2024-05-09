'use server'

import { getUserByIdOrEmail, updateUserById } from '@/models/user'
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from '@/models/verification-token'

export const handleVerifyEmail = async (token: string) => {
  try {
    const verificationToken = await getVerificationTokenByToken(token)

    if (!verificationToken) {
      return {
        success: false,
        message: 'El token de verificación no es válido.',
      }
    }

    const hasExpired = verificationToken.expiresAt < new Date()

    if (hasExpired) {
      return {
        success: false,
        message: 'El token de verificación ha expirado.',
      }
    }

    const existingUser = await getUserByIdOrEmail({
      email: verificationToken.email,
    })

    if (!existingUser) {
      return {
        success: false,
        message: 'El correo electrónico no existe.',
      }
    }

    await updateUserById(existingUser.id, {
      emailVerified: new Date(),
      email: verificationToken.email,
    })

    await deleteVerificationTokenById(verificationToken.id)

    return {
      success: true,
      message: 'Correo electrónico verificado con éxito.',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Error al verificar el correo electrónico. Inténtalo de nuevo.',
    }
  }
}
