import { z } from 'zod'

export const createCategorySchema = {
  request: {
    body: z.object({
      name: z.string().max(128)
    })
  },
}

export const deleteCategorySchema = {
  request: {
    params: z.object(
      {
        id: z.coerce.number().int()
      }
    )
  }
}
