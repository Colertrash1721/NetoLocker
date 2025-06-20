import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from '../../auth/entities/Company.entity';
import { Estado } from './estado.entity';

@Entity('freeload')
export class Freeload {
  @PrimaryGeneratedColumn()
  idFreeload: number;

  @Column()
  idCompany: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  port: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  destination: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  BL: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'datetime', nullable: true })
  estimatedDate: Date; 

  @Column({nullable: true, default: 1})
  idEstado: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceName: string;

  @ManyToOne(() => Company, (company) => company.freeloads)
  @JoinColumn({ name: 'idCompany' })
  company: Company;

  @ManyToOne(() => Estado, (estado) => estado.freeloads)
  @JoinColumn({ name: 'idEstado' })
  estado: Estado;
}
