import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { DeviceModule } from 'src/device/device.module'; // 👈

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]),
    JwtModule.register({
      secret: 'f1b2e3c4d5a6b7890a1b2c3d4e5f67890abcdef1234567890fedcba0987654321',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => DeviceModule), // 🔁
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
