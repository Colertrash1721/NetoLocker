import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TraccarService } from './device.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('api/device')
export class DeviceController {
  constructor(private DeviceService: TraccarService) {}

  @Post()
  async PostDevice(@Body() deviceData: any) {
    try {
      const result = await this.DeviceService.addDevice(deviceData);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete(':id')
  async DeleteDevice(@Param('id') id: string) {
    try {
      const result = await this.DeviceService.deleteDevice(id);
      return { success: true, message: result.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete('route/:deviceId')
  async DeleteRoute(@Param('deviceId') deviceId: number) {
    try {
      const result = await this.DeviceService.deleteRoute(deviceId);
      console.log(result);
      return { success: true, message: result };
      
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('end-route')
  async handleEndRoute(@Body() body: { deviceName: string; deviceId: number }) {
    try {
      return await this.DeviceService.handleEndRoute(body.deviceName, body.deviceId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al procesar fin de ruta',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('drivers')
  async addDriver(
    @Body('driverName') driverName: string,
    @Body('driverId') driverId: string,
  ) {
    try {
      if (!driverName || !driverId) {
        throw new HttpException(
          'No se debe dejar campos vacíos',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.DeviceService.addDriver(driverName, driverId);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el conductor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('assign-driver')
  async assignDriver(
    @Body() body: { deviceName: string; driverId: any, username: string, password: string }
  ) {
    try {
      console.log("holaaaa", body);
      
      const { deviceName, driverId, username, password } = body;
      if (!deviceName || !driverId) {
        throw new HttpException(
          'No se debe dejar campos vacíos',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.DeviceService.assignDriverToDevice(
        deviceName,
        driverId,
        username,
        password,
      );
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al asignar el conductor al dispositivo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('assing-command')
  async assingCommandToDevice(
    @Body() body: { deviceName: string; commandDescription: string }
  ){
    try {
      const { deviceName, commandDescription } = body;
      console.log(deviceName, commandDescription);
      
      if (!deviceName || !commandDescription) {
        throw new HttpException(
          'No se debe dejar campos vacíos',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.DeviceService.assingCommandToDevice(
        deviceName,
        commandDescription,
      );
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al asignar el comando al dispositivo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('owner')
  async assignOwner(@Body() body: {deviceName: string, owner: string}){
    try {
      const { deviceName, owner } = body;
      if (!deviceName || !owner) {
        throw new HttpException(
          'No se debe dejar campos vacíos',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.DeviceService.asignOwner(
        deviceName, owner
      )
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al asignar el portador',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('events/:deviceId')
  async getEvents(
    @Param('deviceId') deviceId: number,
    @Body() body: {data: any}) {
    try {
      const { data } = body;
      console.log(data);
      
      
      if (!deviceId) {
        throw new HttpException(
          'No se debe dejar campos vacíos',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.DeviceService.assignEvents(deviceId, data)
      // return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener los eventos',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
