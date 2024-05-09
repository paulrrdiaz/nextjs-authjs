'use server'

import bcryptjs from 'bcryptjs'
import httpErrors from 'http-errors'

import { NewPasswordFormSchema, TNewPasswordFormSchema } from '@/lib/schemas'
import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from '@/models/password-reset-token'
import { getUserByIdOrEmail, updateUserById } from '@/models/user'

export const handleNewPassword = async (
  data: TNewPasswordFormSchema,
  token: string | null,
) => {
  try {
    if (!token) {
      throw new httpErrors.BadRequest('Token no encontrado.')
    }

    const validationFields = NewPasswordFormSchema.safeParse(data)

    if (!validationFields.success) {
      throw new httpErrors.BadRequest('Error de validación.')
    }

    const { password } = validationFields.data

    const existingPasswordToken = await getPasswordResetTokenByToken(token)

    if (!existingPasswordToken) {
      throw new httpErrors.BadRequest('Token inválido.')
    }

    const hasExpired = new Date() > existingPasswordToken.expiresAt

    if (hasExpired) {
      throw new httpErrors.BadRequest('Token expirado.')
    }

    const existingUser = await getUserByIdOrEmail({
      email: existingPasswordToken.email,
    })

    if (!existingUser) {
      throw new httpErrors.BadRequest('Usuario no encontrado.')
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    await updateUserById(existingUser.id, {
      password: hashedPassword,
    })
    await deletePasswordResetTokenById(existingPasswordToken.id)

    return {
      success: true,
      message: 'Contraseña actualizada con éxito.',
    }
  } catch (error: any) {
    console.error('error', error.message)
    throw new Error(error.message)
  }
}
