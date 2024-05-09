'use server'

import bcryptjs from 'bcryptjs'

import { sendVerificationEmail } from '@/lib/mailing'
import { TSettingsFormSchema } from '@/lib/schemas'
import { currentUser } from '@/lib/server'
import { getUserByIdOrEmail, updateUserById } from '@/models/user'
import { generateVerificationToken } from '@/models/verification-token'

export const handleUpdateSettings = async (
  data: Partial<TSettingsFormSchema>,
) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('No user found')
    }

    const existingUser = await getUserByIdOrEmail({ id: user.id })

    if (!existingUser) {
      throw new Error('No user found')
    }

    if (data.email && data.email !== existingUser.email) {
      const existingEmail = await getUserByIdOrEmail({ email: data.email })

      if (existingEmail) {
        throw new Error('Correo electrónico ya registrado')
      }

      const verificationToken = await generateVerificationToken(data.email)

      if (verificationToken) {
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken?.token,
        )

        return {
          success: true,
          message: 'Correo electrónico actualizado. Verifica tu correo.',
        }
      }
    }

    if (data.password && data.newPassword && existingUser.password) {
      if (data.password === data.newPassword) {
        throw new Error('La nueva contraseña debe ser diferente a la actual')
      }

      const passwordsMatch = await bcryptjs.compare(
        data.password,
        existingUser.password,
      )

      if (!passwordsMatch) {
        throw new Error('Contraseña actual incorrecta')
      }

      const hashedPassword = await bcryptjs.hash(data.newPassword, 10)

      data.password = hashedPassword
      data.newPassword = undefined
    }

    await updateUserById(existingUser.id, data)

    return { success: true, message: 'User updated' }
  } catch (error: any) {
    console.error('error', error)
    throw new Error(error?.message)
  }
}
