import { Test } from "src/test/test.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @ManyToOne(() => Test, test => test.students, {
        onDelete: 'CASCADE'
    })
    test: Test;
}
