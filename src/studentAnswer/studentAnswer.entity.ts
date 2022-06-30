import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Test } from "src/test/test.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentAnswer{
    @PrimaryGeneratedColumn()
    id: number;

    //@OneToOne(() => Student)
    //@JoinColumn()
    @ManyToOne(() => Student, student => student.studentAnswers, {
        onDelete: 'CASCADE'
    })
    student: Student;

    //@OneToOne(() => Test)
    //@JoinColumn()
    @ManyToOne(() => Test, test => test.studentAnswers, {
        onDelete: 'CASCADE'
    })
    test: Test;

    //@OneToOne(() => Question)
    //@JoinColumn()
    @ManyToOne(() => Question, question => question.studentAnswers, {
        onDelete: 'CASCADE'
    })
    question: Question;

    //@OneToOne(() => Answer)
    //@JoinColumn()
    @ManyToOne(() => Answer, answer => answer.studentAnswers, {
        onDelete: 'CASCADE'
    })
    answer: Answer;
}
