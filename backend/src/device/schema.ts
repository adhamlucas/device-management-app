import { z } from 'zod'

export const createDeviceSchema = {
  request: {
    body: z.object({
      color: z.string().max(16),
      partNumber: z.number().int().positive(),
      categoryId: z.number().int()
    })
  }
}

export const deleteDeviceSchema = {
  request: {
    params: z.object({
      id: z.coerce.number().int()
    })
  }
}
