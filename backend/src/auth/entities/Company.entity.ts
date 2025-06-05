import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @Column()
  companyName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({nullable: true})
  lastConection: Date;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Column()
  phone: string;

  @Column()
  contactPerson: string;
}
