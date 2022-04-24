import { Question } from "src/question/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
