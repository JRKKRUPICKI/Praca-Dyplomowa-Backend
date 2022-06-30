import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Test } from "src/test/test.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column({default: true})
    active: boolean;

    @Column({default: 0})
    status: number;

    @ManyToOne(() => Test, test => test.students, {
        onDelete: 'CASCADE'
    })
    test: Test;

    @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.answer)
    studentAnswers: StudentAnswer[];
}
