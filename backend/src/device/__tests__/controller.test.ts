jest.mock("@prisma/client")
import { Response, Request } from "express";
import DeviceController from "../controller";
import DeviceService from "../service";
import { mockDeviceCreate, mockDeviceDelete, mockDeviceFindMany } from "../../__mocks__/@prisma/client";

const deviceService = new DeviceService()
const deviceController = new DeviceController(deviceService)

describe("DeviceController", () => {
  it("should response all devices available", async () => {
    const mockDevices = [
      {
        id: 1,
        color: 'orange',
        partNumber: 100,
        categoryId: 1
      },
      {
        id: 2,
        color: 'red',
        partNumber: 101,
        categoryId: 1
      }
    ]
    mockDeviceFindMany.mockResolvedValue(mockDevices);

    const mreq = {} as Request
    const mres = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response

    await deviceController.getAllDevices(mreq, mres)
    
    expect(mres.status).toHaveBeenCalledWith(200)
    expect(mres.json).toHaveBeenCalledWith(mockDevices)
  })

  it("should response the new device created", async () => {
    const mockDevice = {
      id: 1,
      color: 'red',
      partNumber: 102,
      categoryId: 1
    }

    const mreq = {
      body: {
        color: mockDevice.color,
        partNumber: mockDevice.partNumber,
        categoryId: mockDevice.categoryId
      }
    } as Request
    const mres = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    
    mockDeviceCreate.mockResolvedValue(mockDevice);
    await deviceController.createDevice(mreq, mres)

    expect(mres.status).toHaveBeenCalledWith(200)
    expect(mres.json).toHaveBeenCalledWith(mockDevice)
  })

  it("should response the deleted device", async () => {
    const mockDevice = {
      id: 1,
      color: 'red',
      partNumber: 102,
      categoryId: 1
    }

    const mreq = {
      params: {
        id: 1,
      }
    } as unknown as Request
    const mres = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response

    mockDeviceDelete.mockResolvedValue(mockDevice);

    await deviceController.deleteDevice(mreq, mres)

    expect(mres.status).toHaveBeenCalledWith(200)
    expect(mres.json).toHaveBeenCalledWith(mockDevice)
  })
})