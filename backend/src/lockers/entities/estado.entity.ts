import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Container } from '../../lockers/entities/container.entity';
import { Freeload } from '../../lockers/entities/freeload.entity';

@Entity('estado')
export class Estado {
  @PrimaryGeneratedColumn()
  idEstado: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  nombre: string;

  @OneToMany(() => Container, container => container.estado)
  containers: Container[];

  @OneToMany(() => Freeload, freeload => freeload.estado)
  freeloads: Freeload[];
}
