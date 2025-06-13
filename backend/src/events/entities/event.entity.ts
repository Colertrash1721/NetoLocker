import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('events')
export class Event {
    @PrimaryColumn()
    idEvent: number;

    @Column({nullable: true})
    deviceName: string;

    @Column({nullable: true})
    idRute: number;

    @Column({nullable: true})
    eventType: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    eventDate: Date
}
