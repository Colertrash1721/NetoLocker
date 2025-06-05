import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/Admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './entities/Token.entity';
import { Company } from './entities/Company.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Admin, Token, Company]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "tx7aAfV16FT7JPbIn4XP2gXKcrjALgH6PHtWmfTu_0M",
      signOptions: {expiresIn: '1d'}
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
