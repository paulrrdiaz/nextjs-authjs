import * as z from 'zod'

export const PasswordResetTokenModel = z.object({
  id: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  email: z.string(),
})
