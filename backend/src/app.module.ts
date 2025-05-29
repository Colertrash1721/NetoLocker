import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';
import { RoutesModule } from './routes/routes.module';
import { Routes } from './routes/entities/route.entity';
import { Login } from './auth/auth.entity';
import { Concurrent } from './routes/entities/concurrent.entity';
import { GeofencesModule } from './geofences/geofences.module';
import { ReportModule } from './report/report.module';
import { Event } from './events/entities/event.entity';
import { PrinterModule } from './printer/printer.module';
import { EventsModule } from './events/events.module';
import { ShortLinkModule } from './short-link/short-link.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      username: 'root',
      password: 'root',
      port: 3306,
      database: 'netotrack',
      entities: [Routes, Login, Concurrent, Event],
      synchronize: false,
    }),
    AuthModule,
    DeviceModule,
    RoutesModule,
    GeofencesModule,
    ReportModule,
    EventsModule,
    ShortLinkModule,
  ]
})
export class AppModule {}
