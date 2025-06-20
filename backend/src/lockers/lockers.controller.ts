import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LockersService } from './lockers.service';
/*DTOS */
import { CreateContainerDto } from './dto/create-container.dto';
import { CreateFrealoadDto } from './dto/create-freeload.dto';

@Controller('lockers')
export class LockersController {
  constructor(private readonly lockersService: LockersService) {}
  @Post('create/container')
  createContainer(
    @Body()
    body: {
      CreateContainerDto: CreateContainerDto;
      companyName: string;
    },
  ) {
    const { CreateContainerDto, companyName } = body;
    console.log(CreateContainerDto, companyName);

    return this.lockersService.createContainer(CreateContainerDto, companyName);
  }
  @Post('create/freeload')
  createFreeload(
    @Body() body: { CreateFrealoadDto: CreateFrealoadDto; companyName: string },
  ) {
    const { CreateFrealoadDto, companyName } = body;
    return this.lockersService.createFreeload(CreateFrealoadDto, companyName);
  }
  @Get('container/search-by-date')
  async getContainerByDate(@Query('date') date: string) {
    return this.lockersService.findContainerByDate(date); // ?date=2025-06-11
  }

  @Get('freeload/search-by-date')
  async getFreeloadByDate(@Query('date') date: string) {
    return this.lockersService.findFreeloadByDate(date); // ?date=2025-06-11
  }

  @Get('container')
  findAllContainer() {
    return this.lockersService.findAllContainer();
  }
  @Get('freeload')
  findAllFreeload() {
    return this.lockersService.findAllFreeload();
  }
  @Get('container/:id')
  findOneContainer(@Param('id') id: string) {
    return this.lockersService.findOneContainer(+id);
  }
  @Get('freeload/:id')
  findOneFreeload(@Param('id') id: string) {
    return this.lockersService.findOneFreeload(+id);
  }
  @Get('containers/company/:username')
  async getContainersByCompany(@Param('username') username: string) {
    return this.lockersService.findContainerbyCompany(username);
  }
  @Get('freeloads/company/:username')
  async getFreeloadsByCompany(@Param('username') username: string) {
    return this.lockersService.findFreeloadbyCompany(username);
  }
  @Get('device/:id')
  async getDeviceById(@Param('id') id: number) {
    return this.lockersService.getDeviceById(id);
  }

  @Patch('update/container/:id')
  updateStateContainer(
    @Param('id') id: number,
    @Body() body: { state: string },
  ) {
    const { state } = body;
    return this.lockersService.updateStateContainer(+id, state);
  }

  @Patch('update/freeload/:id')
  updateStateFreeload(
    @Param('id') id: number,
    @Body() body: { state: string },
  ) {
    const { state } = body;
    return this.lockersService.updateStateFreeload(+id, state);
  }

  @Patch('cancel/state/container/:id')
  cancelStateContainer(@Param('id') id: number){
    return this.lockersService.cancelContainerState(+id)
  }

  @Patch('cancel/state/freeload/:id')
  cancelStateFreeload(@Param('id') id: number){
    return this.lockersService.cancelFreeloadState(+id)
  }

  @Patch('container/device/:id')
  updateContainerDeviceName(
    @Param('id') id: string,
    @Body() body: { deviceName: string, row: any },
  ) {
    const { deviceName, row } = body;
    console.log(row);
    return this.lockersService.updateContainerDeviceName(+id, deviceName, row);
  }

  @Patch('freeload/device/:id')
  updateFreeloadDeviceName(
    @Param('id') id: string,
    @Body() body: { deviceName: string, row: any },
  ) {
    const { deviceName, row } = body;
    console.log(row);
    return this.lockersService.updateFreeloadDeviceName(+id, deviceName, row);
  }

  @Put('container/:id')
  async updateContainerData(
    @Param('id') id: number,
    @Body() body: { port: string; destination: string; bl: string },
  ) {
    try {
      return await this.lockersService.updateContainerData(id, body);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error actualizando contenedor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('freeload/:id')
  async updateFreeloadData(
    @Param('id') id: number,
    @Body() body: { port: string; destination: string; bl: string },
  ) {
    try {
      return await this.lockersService.updateFreeloadData(id, body);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error actualizando precinto',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('container/:id')
  removeContainer(@Param('id') id: string) {
    return this.lockersService.removeContainer(+id);
  }
  @Delete('freeload/:id')
  removeFreeload(@Param('id') id: string) {
    return this.lockersService.removeFreeload(+id);
  }
}
