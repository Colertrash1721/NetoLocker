import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

/* SERVICES */
import { Routes } from './entity/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DevicesService {
  private readonly TRACCAR_API_URL = process.env.My_Ip;
  private readonly TRACCAR_AUTH_TOKEN = process.env.My_Token;
  private readonly TRACCAR_PASS = process.env.TRACCAR_PASS;
  private readonly TRACCAR_USER = process.env.TRACCAR_USER;

  constructor(
    @InjectRepository(Routes) private RouteRepository: Repository<Routes>,
  ) {}

  authHeader(username: string, password: string): string {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return authHeader;
  }

  public getHeaders(username?: string, password?: string) {
    if (username && password) {
      const header = this.authHeader(username, password);
      return {
        Authorization: `${header}`,
        'Content-Type': 'application/json',
      };
    }

    return {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }
  async findAllRoutes() {
    return this.RouteRepository.find();
  }
  async findRouteByDeviceName(deviceName: string) {
    const findRoute = await this.RouteRepository.findOne({
      where: { device_Name: deviceName },
    });
    if (!findRoute) {
      return null;
    }
    return findRoute
  }
  async getDeviceByName(deviceName: string) {
    const headers = this.getHeaders(this.TRACCAR_USER, this.TRACCAR_PASS);
    
    try {
      const deviceResponse = await axios.get(
        `${this.TRACCAR_API_URL}/devices`,
        { headers },
      );
      
      const devices: any = deviceResponse.data;
      const device = devices.find((device: any) => device.name === deviceName);
      console.log(deviceName);
      if (!device) {
        throw new HttpException(`device not found`, HttpStatus.NOT_FOUND);
      }
      const devicesLocations = await axios.get(
        `${this.TRACCAR_API_URL}/positions?deviceId=${device.id}`,
        { headers },
      );
      
      const deviceLocation = devicesLocations.data;
      
      const findRoute = await this.findRouteByDeviceName(deviceName);

      return { device: device, positions: deviceLocation, route: findRoute };
    } catch (error) {
      throw new HttpException(
        `Error al encontrar dispositivo: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllDevices() {
    const headers = this.getHeaders(this.TRACCAR_USER, this.TRACCAR_PASS);
    try {
      const deviceResponse = await axios.get(
        `${this.TRACCAR_API_URL}/devices`,
        { headers },
      );
      const devices = deviceResponse.data;
      const devicesLocations = await axios.get(
        `${this.TRACCAR_API_URL}/positions`,
        { headers },
      );

      const deviceLocation = devicesLocations.data;
      const routes = await this.findAllRoutes();
      return { devices: devices, routes: routes, devicesLocations: deviceLocation };
    } catch (error) {
      throw new HttpException(
        `Error al encontrar dispositivos: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
