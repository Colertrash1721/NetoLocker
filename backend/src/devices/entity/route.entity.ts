import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deviceinroutes')
export class Routes {
  @PrimaryGeneratedColumn()
  idRute: number; 

  @Column({ length: 100 })
  rute_Name: string; 

  @Column({ length: 50, nullable: true })
  device_Name: string; 

  @Column({ length: 50 })
  Startlatitud: string; 

  @Column({ length: 50 })
  Startlongitud: string;

  @Column({ length: 50 })
  Endlatitud: string; 

  @Column({ length: 50 })
  Endlongitud: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date; 
}