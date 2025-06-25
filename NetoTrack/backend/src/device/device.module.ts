import { forwardRef, Module } from '@nestjs/common';
import { TraccarService } from './device.service';
import { DeviceController } from './device.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes } from 'src/routes/entities/route.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Routes]),
    forwardRef(() => AuthModule), // 🔁
  ],
  providers: [TraccarService],
  controllers: [DeviceController],
  exports: [TraccarService],
})
export class DeviceModule {}
