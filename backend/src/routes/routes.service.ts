import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routes } from './entities/route.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoutesService {
  constructor(@InjectRepository(Routes) private routeRepository: Repository<Routes>){}
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all routes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  async createRoute(createRouteDto: CreateRouteDto) {
    try {
      const foundDevice = await this.routeRepository.findOne({
        where: {
          device_Name: createRouteDto.device_Name,
        },
      });
      if (foundDevice) {
        throw new HttpException(
          'This device have a route',
          HttpStatus.ALREADY_REPORTED,
        );
      }
      const newDevice = this.routeRepository.create(createRouteDto);
      const savedDevice = await this.routeRepository.save(newDevice);

      return savedDevice;
    } catch (error) {
      throw new HttpException(
        'Error creating device: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async deleteRouteByDeviceName(deviceName: string) {
    const foundRoute = await this.routeRepository.findOne({
      where: {
        device_Name: deviceName,
      },
    });
    console.log("Holaaaa");

  if (!foundRoute) {
    throw new HttpException(
      `No se encontró una ruta para el dispositivo "${deviceName}"`,
      HttpStatus.NOT_FOUND,
    );
  }

  

  await this.routeRepository.remove(foundRoute);

  return {
    message: `Ruta eliminada para el dispositivo "${deviceName}"`,
    data: foundRoute,
  };
}
}
