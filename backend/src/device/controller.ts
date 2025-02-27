import { Request, Response } from "express";
import DeviceService from "./service";

class DeviceController {
  constructor(private deviceService: DeviceService) {
    this.deviceService = deviceService
    this.getAllDevices = this.getAllDevices.bind(this);
    this.createDevice = this.createDevice.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
  }

  async getAllDevices(req: Request, res: Response) {
    const devices = await this.deviceService.findAll()

    res.status(200).json(devices);
  }

  async createDevice(req: Request, res: Response) {
    const { color, partNumber, categoryId } = req.body
    const device = await this.deviceService.create(color, partNumber, categoryId);
    res.status(200).json(device);
  }

  async deleteDevice(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const device = await this.deviceService.delete(id);
    res.status(200).json(device); 
  }
}

export default DeviceController;
