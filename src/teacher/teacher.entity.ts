import { Test } from "src/test/test.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        select: false
    })
    password: string

    @OneToMany(() => Test, test => test.teacher)
    tests: Test[];
}
