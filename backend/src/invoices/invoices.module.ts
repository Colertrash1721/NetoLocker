import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Freeload } from 'src/lockers/entities/freeload.entity';
import { Container } from 'src/lockers/entities/container.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Container,Freeload])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
