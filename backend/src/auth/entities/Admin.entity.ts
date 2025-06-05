import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    idAdmin: number;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
    creationDate: Date;

    @Column({nullable: true})
    lastConection: Date;

    @Column({type: 'boolean', default: false})
    isOnline: boolean;


}
