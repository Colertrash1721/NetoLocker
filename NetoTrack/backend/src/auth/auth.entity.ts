import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  NameUser: string;

  @Column()
  passwordUser: string;

  @Column()
  emailUser: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column()
  authenticatorSecret: string;

  @Column({type: 'boolean', default: true})
  firstSecret: boolean;
}
