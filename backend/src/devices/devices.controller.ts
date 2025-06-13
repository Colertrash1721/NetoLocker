import { Controller, Get } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  @Get()
  getAllDevices(){
    return this.devicesService.getAllDevices();
  }
  @Get('routes')
  getAllRoutes(){
    return this.devicesService.findAllRoutes()
  }
}
