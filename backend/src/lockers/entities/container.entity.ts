import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../../auth/entities/Company.entity';
import { Estado } from './estado.entity';

@Entity('container')
export class Container {
  @PrimaryGeneratedColumn()
  idContainer: number;

  @Column()
  idCompany: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  port: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  destination: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  BL: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  NContainer: string;
  
   @Column({nullable: true, default: 1})
  idEstado: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceName: string;
  
  @ManyToOne(() => Company, company => company.containers)
  @JoinColumn({ name: 'idCompany' })
  company: Company;

  @ManyToOne(() => Estado, estado => estado.containers)
  @JoinColumn({ name: 'idEstado' })
  estado: Estado;
}
