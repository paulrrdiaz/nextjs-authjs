'use server'

import httpErrors from 'http-errors'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { sendVerificationEmail } from '@/lib/mailing'
import { LoginFormSchema, TLoginFormSchema } from '@/lib/schemas'
import { getUserByIdOrEmail } from '@/models/user'
import { generateVerificationToken } from '@/models/verification-token'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const handleLogin = async (
  values: TLoginFormSchema,
  callbackUrl?: string,
) => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new httpErrors.InternalServerError('Error de validación.')
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByIdOrEmail({ email })

    if (!existingUser?.emailVerified) {
      const verificationToken = await generateVerificationToken(email)

      if (!verificationToken) {
        throw new httpErrors.InternalServerError(
          'Error al generar el token de verificación.',
        )
      }

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      )

      throw new httpErrors.InternalServerError(
        'El correo electrónico no ha sido verificado. Mensaje de verificación enviado al correo electrónico.',
      )
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          throw new httpErrors.Conflict(
            'El correo electrónico o la contraseña son incorrectos.',
          )
        }
        default:
          throw new httpErrors.Conflict(
            `Error ${error.type}. Inténtalo de nuevo.`,
          )
      }
    }

    throw error
  }
}
