import { PrismaClient } from '@prisma/client'
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
    return await prisma.category.delete({
      where: {
        id,
      }
    })
  }
}

export default CategoryService;