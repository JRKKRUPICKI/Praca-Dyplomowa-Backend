import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Teacher, teacher => teacher.tests, {
        onDelete: 'CASCADE'
    })
    teacher: Teacher;

    @OneToMany(() => Student, student => student.test)
    students: Student[];

    @OneToMany(() => Question, question => question.test)
    questions: Question[];
}
