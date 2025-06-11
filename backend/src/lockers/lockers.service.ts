import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

/* CONTAINER DTOS AND ENTITY */
import { Container } from './entities/container.entity';
import { CreateContainerDto } from './dto/create-container.dto';

/* FREELOAD DTOS AND ENTITY */
import { Freeload } from './entities/freeload.entity';
import { CreateFrealoadDto } from './dto/create-freeload.dto';
import { AuthService } from 'src/auth/auth.service';
import { Estado } from './entities/estado.entity';

@Injectable()
export class LockersService {
  constructor(
    private readonly AuthService: AuthService,
    @InjectRepository(Container)
    private ContainerRepository: Repository<Container>,
    @InjectRepository(Freeload)
    private FreeloadRepository: Repository<Freeload>,
    @InjectRepository(Estado)
    private EstadoRepository: Repository<Estado>,
  ) {}
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
      .select([
        'c.idContainer',
        'c.port',
        'c.destination',
        'c.BL',
        'c.Ncontainer',
        'c.creationDate',
        'e.nombre',
      ])
      .getMany();

    return detailedResult;
  }

  async findAllFreeload() {
    const detailedResult = await this.FreeloadRepository.createQueryBuilder('f')
      .innerJoinAndSelect('f.estado', 'e')
      .select([
        'f.idFreeload',
        'f.port',
        'f.destination',
        'f.BL',
        'f.creationDate',
        'e.nombre',
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

  async updateContainerDeviceName(id: number, deviceName: string) {
    const container = await this.ContainerRepository.findOne({
      where: { idContainer: id },
    });

    if (!container) {
      throw new HttpException('Contenedor no encontrado', HttpStatus.NOT_FOUND);
    }

    container.deviceName = deviceName;
    container.idEstado = 2; // Actualiza la FK directamente

    const updated = await this.ContainerRepository.save(container);
    return {
      message: 'deviceName actualizado correctamente',
      data: updated,
    };
  }

  async updateFreeloadDeviceName(id: number, deviceName: string) {
    const freeload = await this.FreeloadRepository.findOne({
      where: { idFreeload: id },
    });

    if (!freeload) {
      throw new HttpException('Precinto no encontrado', HttpStatus.NOT_FOUND);
    }

    freeload.deviceName = deviceName;
    freeload.idEstado = 2;

    const updated = await this.FreeloadRepository.save(freeload);
    return {
      message: 'deviceName actualizado correctamente',
      data: updated,
    };
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
      console.log(container);

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
  async getDeviceByName(deviceName: string): Promise<number> {
    // Buscar en freeload
    const freeload = await this.FreeloadRepository.findOne({
      where: { deviceName },
    });
    if (freeload) return await this.getDeviceIdFromTraccar(deviceName);

    // Buscar en container
    const container = await this.ContainerRepository.findOne({
      where: { deviceName },
    });
    if (container) return await this.getDeviceIdFromTraccar(deviceName);

    throw new HttpException('Dispositivo no encontrado', HttpStatus.NOT_FOUND);
  }

  private async getDeviceIdFromTraccar(deviceName: string): Promise<number> {
    const token = process.env.NEXT_PUBLIC_MY_TOKEN_PASSWORD;
    const baseUrl = process.env.NEXT_PUBLIC_MY_API_URL;

    try {
      const res: any = await axios.get(`${baseUrl}/devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const device = res.data.find((d: any) => d.name === deviceName);
      if (!device) {
        throw new HttpException(
          'Dispositivo no encontrado en Traccar',
          HttpStatus.NOT_FOUND,
        );
      }

      return device.id;
    } catch (error) {
      throw new HttpException(
        'Error al consultar Traccar',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
