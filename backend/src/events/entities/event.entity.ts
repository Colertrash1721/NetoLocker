import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryColumn()
  idEvent: number;
  @Column()
  deviceName: string;
  @Column()
  eventType: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  eventDate: Date;
}
