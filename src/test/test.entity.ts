import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test{
    @PrimaryGeneratedColumn()
    id: number;

    // Nazwa testu
    @Column()
    name: string;

    // Czas trwania testu
    @Column()
    time: number;

    // Czas w którym można się zalogować do testu - początek
    @Column()
    loginTimeStart: number;

    // Czas w którym można się zalogować do testu - koniec
    @Column()
    loginTimeEnd: number;

    @ManyToOne(() => Teacher, teacher => teacher.tests, {
        onDelete: 'CASCADE'
    })
    teacher: Teacher;

    @OneToMany(() => Student, student => student.test)
    students: Student[];

    @OneToMany(() => Question, question => question.test)
    questions: Question[];

    @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.answer)
    studentAnswers: StudentAnswer[];
}
