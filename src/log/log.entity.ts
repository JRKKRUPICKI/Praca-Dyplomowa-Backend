import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Test } from "src/test/test.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.studentAnswers, {
        onDelete: 'CASCADE'
    })
    student: Student;

    @ManyToOne(() => Test, test => test.studentAnswers, {
        onDelete: 'CASCADE'
    })
    test: Test;

    @ManyToOne(() => Question, question => question.studentAnswers, {
        onDelete: 'CASCADE'
    })
    question: Question;

    @ManyToOne(() => Answer, answer => answer.studentAnswers, {
        onDelete: 'CASCADE'
    })
    answer: Answer;

    @Column()
    datetime: number;

    // 0 - odpowiedz wybrana
    // 1 - odpowiedz zaznaczona
    // 2 - odpowiedz odznaczona
    @Column()
    actionType: number;
}
