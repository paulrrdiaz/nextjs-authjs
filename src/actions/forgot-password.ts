'use server'

import httpErrors from 'http-errors'

import { sendForgotPasswordEmail } from '@/lib/mailing'
import { ForgotFormSchema, TForgotFormSchema } from '@/lib/schemas'
import { generatePasswordResetToken } from '@/models/password-reset-token'
import { getUserByIdOrEmail } from '@/models/user'

export const handleForgotPassword = async (values: TForgotFormSchema) => {
  try {
    const validatedFields = ForgotFormSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new httpErrors.InternalServerError('Error de validación.')
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByIdOrEmail({ email })

    if (!existingUser) {
      throw new httpErrors.Conflict('No se encontró el correo electrónico.')
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    if (!passwordResetToken) {
      throw new httpErrors.InternalServerError(
        'Error al generar el token de restablecimiento de contraseña.',
      )
    }

    await sendForgotPasswordEmail(email, passwordResetToken.token)
  } catch (error: any) {
    console.error('error', error.message)
    throw new Error(error.message)
  }
}
