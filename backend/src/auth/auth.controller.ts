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
  @Get('companies')
  getAllCompanies() {
    return this.authService.findAllCompany();
  }
  @Get('count/admins')
  getAllAdminsCount() {
    return this.authService.countAllAdmin();
  }
  @Get('count/companies')
  getAllCompaniesCount() {
    return this.authService.countAllCompanies();
  }
  @Get('count/allActive')
  getAllActiveUsers() {
    return this.authService.allActiveUsers();
  }
  @Get('count/companies-by-month')
  async getCompaniesByMonth() {
    return this.authService.getCompaniesGroupedByMonth();
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
  @Delete('company/:username')
  deleteCompany(@Param('username') username: string){
    return this.authService.deleteCompany(username)
  }
  @Patch('company/:username')
  updateCompany(@Param('username') username: string,
  @Body() body: {row: any} ){
    const {row} = body;
    return this.authService.updateCompany(username, row)
  }
  @Patch('update/password/:username')
  updatePassword(@Param('username') username: string,
  @Body() body: { oldPassword: string; newPassword: string }) {
    const { oldPassword, newPassword } = body;
    return this.authService.updatePassword(username, oldPassword, newPassword);
  }
}
