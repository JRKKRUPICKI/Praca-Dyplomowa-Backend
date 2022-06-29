import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Test } from "src/test/test.entity";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentAnswer{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Student)
    @JoinColumn()
    student: Student;

    @OneToOne(() => Test)
    @JoinColumn()
    test: Test;

    @OneToOne(() => Question)
    @JoinColumn()
    question: Question;

    @OneToOne(() => Answer)
    @JoinColumn()
    answer: Answer;
}
