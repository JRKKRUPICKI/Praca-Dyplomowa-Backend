import { Question } from "src/question/question.entity";
import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Question, question => question.answers, {
        onDelete: 'CASCADE'
    })
    question: Question;

    @Column()
    correct: boolean;

    @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.answer)
    studentAnswers: StudentAnswer[];
}
