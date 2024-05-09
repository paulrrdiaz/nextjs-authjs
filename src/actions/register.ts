'use server'

import bcryptjs from 'bcryptjs'
import httpErrors from 'http-errors'

import db from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mailing'
import { RegisterFormSchema, TRegisterFormSchema } from '@/lib/schemas'
import { getUserByIdOrEmail } from '@/models/user'
import { generateVerificationToken } from '@/models/verification-token'

export const handleRegister = async (values: TRegisterFormSchema) => {
  const validatedFields = RegisterFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: validatedFields.error }
  }

  const { name, password, email } = validatedFields.data
  const hashedPassword = await bcryptjs.hash(password, 10)

  const existingUser = await getUserByIdOrEmail({ email })

  if (existingUser) {
    throw new httpErrors.Conflict('El correo electrónico ya está en uso.')
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  if (verificationToken) {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return {
      success: true,
      message:
        'Usuario registrado con éxito. Mensaje de verificación enviado al correo electrónico.',
    }
  }
}
