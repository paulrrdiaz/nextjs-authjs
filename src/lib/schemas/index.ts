import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Correo electrónico inválido.',
    })
    .min(1, { message: 'Correo electrónico requerido' }),
  password: z.string().min(1, { message: 'Contraseña requerida' }),
})
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nombre requerido (3 carácteres como mínimo)' }),
  email: z
    .string()
    .email({
      message: 'Correo electrónico inválido.',
    })
    .min(1, { message: 'Correo electrónico requerido' }),
  password: z.string().min(6, { message: '6 caracteres como mínimo' }),
})

export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>

export const ForgotFormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Correo electrónico inválido.',
    })
    .min(1, { message: 'Correo electrónico requerido' }),
})
export type TForgotFormSchema = z.infer<typeof ForgotFormSchema>

export const NewPasswordFormSchema = z.object({
  password: z.string().min(6, { message: '6 caracteres como mínimo' }),
})
export type TNewPasswordFormSchema = z.infer<typeof NewPasswordFormSchema>

export const SettingsFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Nombre requerido (3 carácteres como mínimo)' }),
    email: z
      .string()
      .email({
        message: 'Correo electrónico inválido.',
      })
      .min(1, { message: 'Correo electrónico requerido' }),
    role: z.nativeEnum(UserRole),
    password: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false
    }
    return true
  }, 'Nueva contraseña requerida si se proporciona la contraseña actual.')

export type TSettingsFormSchema = z.infer<typeof SettingsFormSchema>
