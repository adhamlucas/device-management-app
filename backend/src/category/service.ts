import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class CategoryService {
  async findAll() {
    return await prisma.category.findMany()
  }

  async create(name: string) {
    return await prisma.category.create({
      data: {
        name,
      }
    })
  }

  async delete(id: number) {
    try {
      return await prisma.category.delete({
        where: {
          id,
        }
      })
    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2003') {
          throw new Error(`Cannot delete category because it is in use.`);
        }
      }
      throw e
    }
  }
}

export default CategoryService
