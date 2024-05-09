import { LogAction } from '@prisma/client'
import * as z from 'zod'

export const LogModel = z.object({
  id: z.string(),
  action: z.nativeEnum(LogAction),
  payload: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
})
