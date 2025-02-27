jest.mock("@prisma/client")
import DeviceService from "../service"
import { mockDeviceCreate, mockDeviceDelete, mockDeviceFindMany } from "../../__mocks__/@prisma/client"

const deviceService = new DeviceService()

describe("DeviceService", () => {
  it("should return all devices from the database", async () => {
    const mockDevices = [{ id: 1, color: 'orange', partNumber: 10, categoryid: 1 }]
    mockDeviceFindMany.mockResolvedValue(mockDevices)

    const devices = await deviceService.findAll();


    expect(devices).toEqual(mockDevices);
  })

  it("should create a new device in the database and return it", async() => {
    const mockDevice = {
      id: 1,
      color: 'orange',
      partNumber: 10,
      categoryId: 1,
    }
    mockDeviceCreate.mockResolvedValue(mockDevice);
    const device = await deviceService.create(mockDevice.color, mockDevice.partNumber, mockDevice.categoryId)

    expect(device).toEqual(mockDevice);
    expect(mockDeviceCreate).toHaveBeenCalledTimes(1)
  })

  it("should delete a device from the database", async () => {
    const mockDevice = {
      id: 1,
      color: 'orange',
      partNumber: 10,
      categoryId: 1
    }

    mockDeviceDelete.mockResolvedValue(mockDevice)

    const device = await deviceService.delete(mockDevice.id);

    expect(device).toEqual(mockDevice);
    expect(mockDeviceDelete).toHaveBeenCalledTimes(1);

  })
})