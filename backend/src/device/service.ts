import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

class DeviceService {

  async findAll() {
    const devices = await prismaClient.device.findMany();
    return devices
  }

  async create(color: string, partNumber: number, categoryId: number) {
    const device = await prismaClient.device.create({
      data: {
        color,
        partNumber,
        categoryId
      }
    });

    return device
  }

  async delete(id: number) {
    const device = await prismaClient.device.delete({
      where: {
        id,
      }
    });

    return device
  } 
}

export default DeviceService;
