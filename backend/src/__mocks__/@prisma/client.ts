export const mockCategoryFindMany = jest.fn()
export const mockDeleteCategory = jest.fn()
export const mockCreateCategory = jest.fn()
export const mockDeviceFindMany = jest.fn()
export const mockDeviceCreate = jest.fn()
export const mockDeviceDelete = jest.fn()

export const PrismaClient = jest.fn().mockImplementation(() => {
  return {
    category: {
      findMany: mockCategoryFindMany,
      delete: mockDeleteCategory,
      create: mockCreateCategory,
    },
    device: {
      findMany: mockDeviceFindMany,
      create: mockDeviceCreate,
      delete: mockDeviceDelete
    }
  }
})

