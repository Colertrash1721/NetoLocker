import { Module } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { LockersController } from './lockers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Entities */
import { Company } from 'src/auth/entities/Company.entity';
import { Freeload } from './entities/freeload.entity';
import { Container } from './entities/container.entity';
import { Estado } from './entities/estado.entity';

/*Services */
import { AuthModule } from 'src/auth/auth.module';
import { DevicesModule } from 'src/devices/devices.module';
import { RoutesModule } from 'src/routes/routes.module';


@Module({
  imports: [RoutesModule, AuthModule, DevicesModule, TypeOrmModule.forFeature([Company, Freeload, Container, Estado])],
  controllers: [LockersController],
  providers: [LockersService],
})
export class LockersModule {}
