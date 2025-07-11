import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import axios from 'axios';
import ubicacionesData from '../data/locations.json';

/* CONTAINER DTOS AND ENTITY */
import { Container } from './entities/container.entity';
import { CreateContainerDto } from './dto/create-container.dto';

/* FREELOAD DTOS AND ENTITY */
import { Freeload } from './entities/freeload.entity';
import { CreateFrealoadDto } from './dto/create-freeload.dto';
import { Estado } from './entities/estado.entity';

/*SERVICES */
import { AuthService } from 'src/auth/auth.service';
import { DevicesService } from 'src/devices/devices.service';
import { RoutesService } from 'src/routes/routes.service';

@Injectable()
export class LockersService {
  constructor(
    private dataSource: DataSource,
    private readonly DevicesService: DevicesService,
    private readonly RoutesService: RoutesService,
    private readonly AuthService: AuthService,
    @InjectRepository(Container)
    private ContainerRepository: Repository<Container>,
    @InjectRepository(Freeload)
    private FreeloadRepository: Repository<Freeload>,
    @InjectRepository(Estado)
    private EstadoRepository: Repository<Estado>,
  ) { }
  async findContainerByDate(date: string) {
    const containers = await this.ContainerRepository.createQueryBuilder('c')
      .innerJoinAndSelect('c.estado', 'e')
      .innerJoinAndSelect('c.company', 'co')
      .select([
        'c.idContainer',
        'co.companyName',
        'c.port',
        'c.destination',
        'c.BL',
        'c.Ncontainer',
        'c.creationDate',
        'e.nombre',
      ])
      .where('DATE(c.creationDate) = :date', { date })
      .getMany();

    return containers;
  }

  async findFreeloadByDate(date: string) {
    const freeloads = await this.FreeloadRepository.createQueryBuilder('f')
      .innerJoinAndSelect('f.estado', 'e')
      .innerJoinAndSelect('f.company', 'co')
      .select([
        'f.idFreeload',
        'co.companyName',
        'f.port',
        'f.destination',
        'f.BL',
        'f.creationDate',
        'e.nombre',
      ])
      .where('DATE(f.creationDate) = :date', { date })
      .getMany();
    return freeloads;
  }

  async findAllContainer() {
    const detailedResult = await this.ContainerRepository.createQueryBuilder(
      'c',
    )
      .innerJoinAndSelect('c.estado', 'e')
      .innerJoinAndSelect('c.company', 'co')
      .select([
        'c.idContainer',
        'c.port',
        'c.destination',
        'c.BL',
        'c.Ncontainer',
        'c.creationDate',
        'c.deviceName',
        'c.estimatedDate',
        'e.nombre',
        'co.companyName',
      ])
      .getMany();

    return detailedResult;
  }

  async findAllFreeload() {
    const detailedResult = await this.FreeloadRepository.createQueryBuilder('f')
      .innerJoinAndSelect('f.estado', 'e')
      .innerJoinAndSelect('f.company', 'co')
      .select([
        'f.idFreeload',
        'f.port',
        'f.destination',
        'f.BL',
        'f.creationDate',
        'f.deviceName',
        'f.estimatedDate',
        'e.nombre',
        'co.companyName',
      ])
      .getMany();

    return detailedResult;
  }

  async findFreeloadbyCompany(username: string) {
    const company = await this.AuthService.findCompanyByUsername(username);
    if (!company) {
      throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
    }

    const detailedResult = await this.FreeloadRepository.createQueryBuilder('f')
      .innerJoinAndSelect('f.estado', 'e')
      .select([
        'f.idFreeload',
        'f.port',
        'f.destination',
        'f.BL',
        'f.creationDate',
        'f.deviceName',
        'f.estimatedDate',
        'e.nombre',
      ])
      .where('f.idCompany = :idCompany', { idCompany: company.idCompany })
      .getMany();

    return detailedResult;
  }

  async findContainerbyCompany(username: string) {
    const company = await this.AuthService.findCompanyByUsername(username);
    if (!company) {
      throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
    }

    const detailedResult = await this.ContainerRepository.createQueryBuilder(
      'c',
    )
      .innerJoinAndSelect('c.estado', 'e')
      .select([
        'c.idContainer',
        'c.port',
        'c.destination',
        'c.BL',
        'c.Ncontainer',
        'c.creationDate',
        'c.deviceName',
        'c.estimatedDate',
        'e.nombre',
      ])
      .where('c.idCompany = :idCompany', { idCompany: company.idCompany })
      .getMany();

    return detailedResult;
  }

  async findOneContainer(id: number) {
    return await this.ContainerRepository.findOne({
      where: {
        idContainer: id,
      },
    });
  }

  async findOneFreeload(id: number) {
    return await this.FreeloadRepository.findOne({
      where: {
        idFreeload: id,
      },
    });
  }

  async updateStateContainer(id: number, state: string) {
    const container = await this.ContainerRepository.findOne({
      where: { idContainer: id },
      relations: ['estado'], // Cargar relación actual
    });

    if (!container) {
      throw new HttpException('Contenedor no encontrado', HttpStatus.NOT_FOUND);
    }

    let estadoId: number;
    if (state === 'pendiente') estadoId = 2;
    else if (state === 'aceptado') estadoId = 3;
    else throw new HttpException('Estado inválido', HttpStatus.BAD_REQUEST);

    const estado = await this.EstadoRepository.findOne({
      where: { idEstado: estadoId },
    });

    if (!estado) {
      throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
    }

    container.estado = estado;

    if (state === 'aceptado') {
      await this.RoutesService.deleteRouteByDeviceName(container.deviceName);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
      await queryRunner.manager.save(Container, container);
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
      await queryRunner.commitTransaction();
      return container;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error al actualizar el estado', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }


  async updateStateFreeload(id: number, state: string) {
    const freeload = await this.FreeloadRepository.findOne({
      where: { idFreeload: id },
      relations: ['estado'],
    });

    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }

    
    
    let estadoId: number;
    if (state === 'pendiente') estadoId = 2;
    else if (state === 'aceptado') estadoId = 3;
    else throw new HttpException('Estado inválido', HttpStatus.BAD_REQUEST);
    
    const estado = await this.EstadoRepository.findOne({
      where: { idEstado: estadoId },
    });
    
    if (!estado) {
      throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
    }
    
    freeload.estado = estado;
    
    if (state === 'aceptado') {
      console.log("Eliminando ruta por dispositivo:", freeload.deviceName);
      
      await this.RoutesService.deleteRouteByDeviceName(freeload.deviceName);
    }
    

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
      await queryRunner.manager.save(Freeload, freeload);
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
      await queryRunner.commitTransaction();
      return freeload;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error al actualizar el estado', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }


  async updateContainerDeviceName(id: number, deviceName: string, row: any) {
    const container = await this.ContainerRepository.findOne({
      where: { idContainer: id },
    });

    if (!container) {
      throw new HttpException('Contenedor no encontrado', HttpStatus.NOT_FOUND);
    }

    container.deviceName = deviceName;

    console.log('Actualizando deviceName de contenedor:', container.idContainer, 'a', deviceName);
    
    const updated = await this.ContainerRepository.save(container);
    console.log('Contenedor actualizado:', updated);
    
    // Buscar coordenadas
    const origen = ubicacionesData.ubicaciones.find(
      (u) => u.nombre.toLowerCase().trim() === row.puerto.toLowerCase().trim(),
    );
    const destino = ubicacionesData.ubicaciones.find(
      (u) =>
        u.nombre.toLowerCase().trim() === row.destino.toLowerCase().trim(),
    );


    if (!origen || !destino) {
      throw new HttpException(
        'Ubicación no encontrada en el JSON',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Crear ruta
    await this.RoutesService.createRoute({
      device_Name: deviceName,
      Startlatitud: origen.latitud.toString(),
      Startlongitud: origen.longitud.toString(),
      Endlatitud: destino.latitud.toString(),
      Endlongitud: destino.longitud.toString(),
      rute_Name: `${origen.nombre} - ${destino.nombre}`,
    });

    
    return {
      message: 'deviceName actualizado correctamente',
      data: updated,
    };
  }

  async updateFreeloadDeviceName(id: number, deviceName: string, row: any) {
    const freeload = await this.FreeloadRepository.findOne({
      where: { idFreeload: id },
    });

    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }

    freeload.deviceName = deviceName;

    console.log('Actualizando deviceName de freeload:', freeload.idFreeload, 'a', deviceName);
    const updated = await this.FreeloadRepository.save(freeload);
    console.log('Freeload actualizado:', updated);

    const origen = ubicacionesData.ubicaciones.find(
      (u) => u.nombre.toLowerCase().trim() === row.puerto.toLowerCase().trim(),
    );
    const destino = ubicacionesData.ubicaciones.find(
      (u) =>
        u.nombre.toLowerCase().trim() === row.destino.toLowerCase().trim(),
    );

    
    
    if (!origen || !destino) {
      throw new HttpException(
        'Ubicación no encontrada en el JSON',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    console.log('Creando ruta para freeload:', deviceName, 'desde', origen.nombre, 'a', destino.nombre);
    try {
      await this.RoutesService.createRoute({
        device_Name: deviceName,
        Startlatitud: origen.latitud.toString(),
        Startlongitud: origen.longitud.toString(),
        Endlatitud: destino.latitud.toString(),
        Endlongitud: destino.longitud.toString(),
        rute_Name: `${origen.nombre} - ${destino.nombre}`,
      });
      
    } catch (error) {
      console.log('Error al crear ruta para freeload:', error);
      
    }
    return {
      message: 'deviceName actualizado correctamente',
      data: updated,
    };
  }

  async cancelContainerState(id: number) {
    const container = await this.ContainerRepository.findOne({
      where: {
        idContainer: id,
      },
    });

    if (!container) {
      throw new HttpException('Contenedor no encontrado', HttpStatus.NOT_FOUND);
    }

    container.idEstado = 4;

    return await this.ContainerRepository.save(container);
  }

  async cancelFreeloadState(id: number) {
    const freeload = await this.FreeloadRepository.findOne({
      where: {
        idFreeload: id,
      },
    });

    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }

    freeload.idEstado = 4;

    return await this.FreeloadRepository.save(freeload);
  }

  async removeContainer(id: number) {
    const container = await this.ContainerRepository.findOne({
      where: {
        idContainer: id,
      },
    });
    if (!container) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }
    return this.ContainerRepository.delete(id);
  }

  async removeFreeload(id: number) {
    const freeload = await this.FreeloadRepository.findOne({
      where: {
        idFreeload: id,
      },
    });
    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }
    return this.FreeloadRepository.delete(id);
  }

  async createContainer(
    CreateContainerDto: CreateContainerDto,
    companyName: string,
  ) {
    try {
      const company = await this.AuthService.findCompanyByUsername(companyName);
      if (!company) {
        throw new HttpException(
          'Error, este usuario no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      const container = this.ContainerRepository.create({
        ...CreateContainerDto,
        BL: CreateContainerDto.bl,
        NContainer: CreateContainerDto.nContainer,
        idCompany: company.idCompany,
      });

      const saved = await this.ContainerRepository.save(container);
      return {
        message: 'Contenedor creado correctamente',
        data: saved,
      };
    } catch (error) {
      return {
        error: error,
        message: 'Error añadiendo el precinto',
      };
    }
  }

  async createFreeload(
    CreateFrealoadDto: CreateFrealoadDto,
    companyName: string,
  ) {
    try {
      const company = await this.AuthService.findCompanyByUsername(companyName);
      if (!company) {
        throw new HttpException(
          'Error, este usuario no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      const freeload = this.FreeloadRepository.create({
        ...CreateFrealoadDto,
        BL: CreateFrealoadDto.bl,
        idCompany: company.idCompany,
      });
      const saved = await this.FreeloadRepository.save(freeload);

      return {
        message: 'Precinto creado correctamente',
        data: saved,
      };
    } catch (error) {
      console.error('Error al guardar Freeload:', error);
      return {
        message: 'Error añadiendo el precinto',
        error: error.message,
      };
    }
  }

  async getDeviceById(id: number) {
    // Buscar en freeload

    const freeload = await this.FreeloadRepository.findOne({
      where: { idFreeload: id },
    });
    if (freeload) {
      const deviceName = freeload.deviceName;
      console.log(freeload);
      return await this.DevicesService.getDeviceByName(deviceName);
    }
    // Buscar en container
    const container = await this.ContainerRepository.findOne({
      where: { idContainer: id },
    });

    if (container) {
      const deviceName = container.deviceName;
      const deviceResponse =
        await this.DevicesService.getDeviceByName(deviceName);
      return deviceResponse;
    }

    throw new HttpException('Dispositivo no encontrado', HttpStatus.NOT_FOUND);
  }

  async updateContainerData(id: number, row: any) {
    const container = await this.ContainerRepository.findOne({
      where: { idContainer: id },
    });

    if (!container) {
      throw new HttpException('Contenedor no encontrado', HttpStatus.NOT_FOUND);
    }

    // Actualizamos los campos
    container.port = row.port;
    container.destination = row.destination;
    container.BL = row.bl;

    // Guardamos
    const updated = await this.ContainerRepository.save(container);

    return {
      message: 'Contenedor actualizado correctamente',
      data: updated,
    };
  }

  async updateFreeloadData(id: number, row: any) {
    const freeload = await this.FreeloadRepository.findOne({
      where: { idFreeload: id },
    });

    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }

    freeload.port = row.port;
    freeload.destination = row.destination;
    freeload.BL = row.bl;

    const updated = await this.FreeloadRepository.save(freeload);

    return {
      message: 'Precinto actualizado correctamente',
      data: updated,
    };
  }
}
