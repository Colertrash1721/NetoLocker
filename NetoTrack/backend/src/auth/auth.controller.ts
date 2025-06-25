import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPassword } from './DTO/ResetPassword.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  getUsers() {
    return this.AuthService.getAllusers();
  }
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.AuthService.getOneUser(username);
  }
  @Post('/login')
  async Postlogin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      // Autenticar con Traccar
      const traccarResponse = await this.AuthService.login(username, password);

      // Generar un token JWT para el usuario autenticado
      const payload = { username: username, sub: traccarResponse.user.id };
      return {
        access_token: this.jwtService.sign(payload),
        message: traccarResponse.message,
        user: traccarResponse.user, // Opcional: devolver los datos del usuario
      };
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
  @Post('/changepass')
  async changePass(@Body() body: { emailUser: string }) {
    return await this.AuthService.changepass(body.emailUser);
  }
  @Post('/reset-password/:token')
  async resetPass(@Param('token') token: string, @Body() body: ResetPassword) {
    return await this.AuthService.resetPass(token, body.newPassword);
  }
  @Post('2fa/setup')
  async setup2FA(@Body() body: { username: string }) {
    return this.AuthService.generate2FA(body.username);
  }

  @Post('2fa/verify')
  async verify2FA(@Body() body: { username: string; password: string; code: string }) {
    const isValid = await this.AuthService.verify2FACode(body.username, body.password, body.code);
    if (!isValid) {
      throw new UnauthorizedException('Código 2FA incorrecto');
    }
    return { message: 'Autenticación 2FA exitosa' };
  }
  @Get('2fa/qr')
  async getExisting2FAQr(@Query('username') username: string) {
    return this.AuthService.get2FAQrFromDB(username);
  }
}
