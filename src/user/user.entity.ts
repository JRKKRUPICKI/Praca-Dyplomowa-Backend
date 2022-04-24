import { Column, Unique } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;//primary

    @Column({unique: true})
    email: string;//not null

    @Column()
    password: string;// not null
}