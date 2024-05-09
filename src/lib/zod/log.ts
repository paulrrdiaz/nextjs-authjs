import * as z from "zod"
import { LogAction } from "@prisma/client"

export const LogModel = z.object({
  id: z.string(),
  action: z.nativeEnum(LogAction),
  payload: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
})
