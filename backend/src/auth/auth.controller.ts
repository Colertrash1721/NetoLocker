import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin-auth.dto';
import { CreateCompany } from './dto/create-company-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAllCompanys() {
    return this.authService.findAllCompany();
  }
  @Post('create/admin')
  createAdmin(@Body() CreateAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(CreateAdminDto);
  }
  @Post('create/company')
  createCompany(@Body() CreateCompany: CreateCompany) {
    return this.authService.createCompany(CreateCompany);
  }
  @Post('login')
  login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    return this.authService.login(email, password, res);
  }
  @Post('logout')
  logOut(
    @Body() body: { username: string; token: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { username, token } = body;
    return this.authService.logOut(username, token, res);
  }
}
