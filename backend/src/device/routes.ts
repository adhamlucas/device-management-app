import { Router } from 'express';
import CategoryController from '../category/controller';
import DeviceService from './service';
import DeviceController from './controller';
import { requestValidation } from '../handlers/requestValidator';
import { createDeviceSchema, deleteDeviceSchema } from './schema';


const router = Router();

const deviceService = new DeviceService()
const deviceController = new DeviceController(deviceService)

router.get('/', deviceController.getAllDevices)
router.post('/', requestValidation(createDeviceSchema.request), deviceController.createDevice)
router.delete('/:id', requestValidation(deleteDeviceSchema.request),  deviceController.deleteDevice)

export default router;
