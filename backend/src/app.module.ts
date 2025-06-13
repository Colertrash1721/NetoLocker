import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginMiddleware } from './middleware/login/login.middleware';
import { LockersModule } from './lockers/lockers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { EventsModule } from './events/events.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    // 🧪 Carga las variables desde .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🛠️ Configura TypeORM con variables del entorno
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule, 
    LockersModule,
    InvoicesModule,
    EventsModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoginMiddleware)
      .forRoutes({
        path: 'auth/login', method: RequestMethod.POST
      });
  }
}
