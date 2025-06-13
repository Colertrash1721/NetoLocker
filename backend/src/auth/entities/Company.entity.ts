import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Container } from 'src/lockers/entities/container.entity';
import { Freeload } from 'src/lockers/entities/freeload.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @Column()
  companyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ nullable: true })
  lastConection: Date;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Column()
  phone: string;

  @Column()
  contactPerson: string;

  @OneToMany(() => Freeload, (freeload) => freeload.company)
  freeloads: Freeload[];

  @OneToMany(() => Container, (container) => container.company)
  containers: Container[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  rnc: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  taxes: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    default: 0,
  })
  discount: number;
}
