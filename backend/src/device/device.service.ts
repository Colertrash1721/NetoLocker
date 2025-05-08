import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Routes } from 'src/routes/entities/route.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TraccarService {
  private readonly TRACCAR_API_URL = process.env.My_Ip;
  private readonly TRACCAR_AUTH_TOKEN = process.env.My_Token;

  constructor(
    @InjectRepository(Routes) private routeRepository: Repository<Routes>,
  ) {}

  authHeader(username: string, password: string) : string {
    const authHeader = "Basic " + btoa(`${username}:${password}`);

    return authHeader;
  }

  async addDevice(deviceData: any) {
    const url = `${this.TRACCAR_API_URL}/devices`;
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, deviceData, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error al agregar dispositivo: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteDevice(deviceId: string) {
    const url = `${this.TRACCAR_API_URL}/devices/${deviceId}`;
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
    };

    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error al eliminar dispositivo: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteRoute(deviceId: number) {
    const urlDevice = `${this.TRACCAR_API_URL}/devices/${deviceId}`;
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(urlDevice, { headers });
      const device = response.data;
      const foundDevice = await this.routeRepository.findOne({
        where: { device_Name: device.name },
      });

      if (foundDevice) {
        console.log(`Eliminando ruta para el dispositivo ${device.name}`);

        await this.routeRepository.delete(foundDevice.idRute);
      }
    } catch (error) {
      throw new HttpException(
        `Error al eliminar ruta: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async handleEndRoute(deviceName: string, deviceId: number) {
    const urlDevice = `${this.TRACCAR_API_URL}/devices/${deviceId}`;
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      // 1. Obtener información del dispositivo
      const response = await axios.get(urlDevice, { headers });
      const device = response.data;

      // 2. Eliminar la ruta asociada (si existe)
      const foundDevice = await this.routeRepository.findOne({
        where: { device_Name: device.name },
      });

      if (!foundDevice) {
        return `No se encontró el dispositivo ${device.name}`;
      }

      console.log(`Eliminando ruta para el dispositivo ${device.name}`);
      await this.routeRepository.delete(foundDevice.idRute);

      // 3. Eliminar el atributo portador si existe
      if (device.attributes?.portador) {
        console.log(
          `Eliminando atributo portador del dispositivo ${device.name}`,
        );

        const updatedAttributes = { ...device.attributes };
        delete updatedAttributes.portador;

        await axios.put(
          urlDevice,
          {
            ...device,
            attributes: updatedAttributes,
          },
          { headers },
        );
      }

      // 4. Manejar la eliminación del conductor asociado
      try {
        const urlDriver = `${this.TRACCAR_API_URL}/drivers?deviceId=${deviceId}`;
        const driverResponse = await axios.get(urlDriver, { headers });
        const drivers = driverResponse.data;

        if (drivers && drivers.length > 0) {
          const driver = drivers[0];
          const driverIdNumber = driver.id;

          console.log(
            `Eliminando conductor para el dispositivo ${device.name}`,
          );
          await axios.delete(`${this.TRACCAR_API_URL}/permissions`, {
            headers,
            data: {
              deviceId: deviceId,
              driverId: driverIdNumber,
            },
          });
        } else {
          console.log(
            `No se encontraron conductores para el dispositivo ${device.name}`,
          );
        }
      } catch (error) {
        throw new HttpException(
          `Error al manejar el conductor: ${error.response?.data?.message || error.message}`,
          error.response?.status || HttpStatus.BAD_GATEWAY,
        );
      }

      return {
        success: true,
        message: `Ruta, conductor y atributo portador eliminados para ${device.name}`,
      };
    } catch (error) {
      throw new HttpException(
        `Error al manejar ruta: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async addDriver(driverName: string, driverId: string) {
    const url = `${this.TRACCAR_API_URL}/drivers`;
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(
        url,
        { name: driverName, uniqueId: driverId },
        { headers },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error al crear el conductor: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async assignDriverToDevice(deviceName: string, driverId: string, username: string, password: string) {
    const authHeader = this.authHeader(username, password);
    
    const headers = {
      Authorization: `${authHeader}`,
      'Content-Type': 'application/json',
    };
    
    try {
      // 1. Obtener todos los dispositivos
      const deviceResponse = await axios.get(
        `${this.TRACCAR_API_URL}/devices`,
        { headers },
      );
      console.log({ dispositivo: 'Dispositivo', deviceName, driverId, authHeader });
      const devices = deviceResponse.data;
      const device = devices.find((device: any) => device.name === deviceName);

      if (!device) {
        throw new HttpException(
          `El dispositivo ${deviceName} no fue encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deviceIdNumber = device.id;

      console.log("deviceIdNumber", deviceIdNumber);
      

      // 2. Obtener todos los conductores
      const driverResponse = await axios.get(
        `${this.TRACCAR_API_URL}/drivers`,
        { headers },
      );
      const drivers = driverResponse.data;
      const driver = drivers.find((d: any) => d.uniqueId === driverId);

      if (!driver) {
        throw new HttpException(
          `El conductor con ID ${driverId} no fue encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      const driverIdNumber = driver.id;

      // 3. Verificar si el dispositivo ya tiene un conductor asignado
      const permissionResponse = await axios.get(
        `${this.TRACCAR_API_URL}/drivers?deviceId=${deviceIdNumber}`,
        { headers },
      );

      const permissions = permissionResponse.data;

      console.log({ permissions });
      // 3.1 borrando los conductores existentes
      if (permissions && permissions.length > 0) {
        try {
          for (const drivers of permissions) {
            await axios.delete(`${this.TRACCAR_API_URL}/permissions`, {
              headers,
              data: {
                deviceId: deviceIdNumber,
                driverId: drivers.id,
              },
            });
          }

          console.log(
            `Conductor existente elimados para el dispositivo ${deviceName}`,
          );
        } catch (error) {
          console.log(`Hubo un error borrando los conductores ${error}`);
        }
      }
      
      // 4. Asignar el conductor al dispositivo vía la API de Traccar
      await axios.post(
        `${this.TRACCAR_API_URL}/permissions`,
        {
          deviceId: deviceIdNumber,
          driverId: driverIdNumber,
        },
        { headers },
      );
      
            console.log("holaaaaa");

      return {
        success: true,
        message: `Conductor asignado correctamente al dispositivo ${deviceName}`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar conductor: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async assingCommandToDevice(deviceName: string, commandDescription: string) {
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };
    try {
      const deviceResponse = await axios.get(
        `${this.TRACCAR_API_URL}/devices`,
        { headers },
      );
      const devices = deviceResponse.data;
      const device = devices.find((device: any) => device.name === deviceName);

      if (!device) {
        throw new HttpException(
          `El dispositivo ${deviceName} no fue encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deviceIdNumber = device.id;

      const commandResponse = await axios.get(
        `${this.TRACCAR_API_URL}/commands`,
        { headers },
      );
      const commands = commandResponse.data;
      const command = commands.find(
        (command: any) => command.description === commandDescription,
      );

      if (!command) {
        throw new HttpException(
          `El comando ${commandDescription} no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      const commandIdNumber = command.id;
      console.log(commandIdNumber);
      console.log(deviceIdNumber);

      await axios.post(
        `${this.TRACCAR_API_URL}/permissions`,
        {
          deviceId: deviceIdNumber,
          commandId: commandIdNumber,
        },
        { headers },
      );

      await axios.post(
        `${this.TRACCAR_API_URL}/commands/send`,
        {
          deviceId: deviceIdNumber,
          id: commandIdNumber,
        },
        { headers },
      );

      return {
        success: true,
        message: `Comando asignado correctamente al dispositivo ${deviceName}`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar conductor: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async asignOwner(deviceName: string, owner: string) {
    const headers = {
      Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get(`${this.TRACCAR_API_URL}/devices`, {
        headers,
      });
      const devices = response.data;
      const device = devices.find((device: any) => device.name === deviceName);

      if (!device) {
        throw new HttpException(
          `El dispositivo ${deviceName} no fue encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedAttributes = {
        ...(device.attributes || {}), // Mantener los atributos existentes
        portador: owner, // Actualizar o crear el campo portador
      };

      // 3. Actualizar el dispositivo
      const updateResponse = await axios.put(
        `${this.TRACCAR_API_URL}/devices/${device.id}`,
        {
          ...device,
          attributes: updatedAttributes,
        },
        { headers },
      );

      return {
        success: true,
        message: `Portador '${owner}' asignado correctamente al dispositivo ${deviceName}`,
        device: updateResponse.data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar conductor: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async assignEvents(deviceId: number, events: { salida: string[], entrada: string[] }) {
    // 1. Obtener notificaciones actuales de Traccar (GET)
    const url = `${this.TRACCAR_API_URL}/notifications?deviceId=${deviceId}`;
    const headers = {
        Authorization: `Bearer ${this.TRACCAR_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url, { headers });
        const currentNotifications = response.data;

        console.log("Notificaciones actuales:", currentNotifications);

        // 2. Filtrar notificaciones según events.salida (ej: 'geofenceEnter')
        const filteredNotifications = currentNotifications.filter(notification => 
            events.salida.includes(notification.type)
        );

        console.log("Notificaciones filtradas:", filteredNotifications);

        // 3. Actualizar notificadores (ej: agregar 'email' y 'sms' además de 'web')
        const updatedNotifications = filteredNotifications.map(notification => ({
          ...notification,
          notificators: [
              ...new Set([
                  ...notification.notificators.split(','), // Divide el string existente
                  ...events.entrada                       // Agrega los nuevos
              ])
          ].join(',') // Convierte a string sin duplicados
      }));

        console.log("Notificaciones actualizadas:", updatedNotifications);

        // 4. Enviar actualización a Traccar (PUT/PATCH)
        // (Depende de qué soporte la API)
        const updatePromises = updatedNotifications.map(notification => 
            axios.put(`${this.TRACCAR_API_URL}/notifications/${notification.id}`, notification, { headers })
        );

        await Promise.all(updatePromises);
        return { success: true, updatedNotifications };

    } catch (error) {
        throw new HttpException(
            `Error al asignar eventos: ${error.response?.data?.message || error.message}`,
            error.response?.status || HttpStatus.BAD_GATEWAY,
        );
    }
}
}
