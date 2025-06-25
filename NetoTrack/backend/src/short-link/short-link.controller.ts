import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';

@Controller('api/short-link')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Post('/generateShortLink')
  async shortLinkGenerate(@Body() body: { deviceName: string, expirationTime: any, companyName: string, username: string, password: string }) {
    const { deviceName, expirationTime, companyName, username, password } = body;
    
    if (!deviceName || !expirationTime || !companyName || !username || !password) {
      console.log(deviceName);
      console.log(expirationTime);
      console.log(companyName);
      console.log(username);
      console.log(password);
      
      throw new UnauthorizedException('You cannot send empty fields');
    }
    try {
      console.log(deviceName);
      console.log(expirationTime);
      console.log(companyName);
      console.log(username);
      console.log(password);
      return await this.shortLinkService.generateShortLink(deviceName, expirationTime, companyName, username, password);
    } catch (error) {
      throw new UnauthorizedException('Error generating short link');
      console.log(error);
      
    }
  }
  @Get('/decodeShortLink/:token')
  async decodeShortLink(@Param('token') token: any){
    return await this.shortLinkService.getToken(token);
  }
}
