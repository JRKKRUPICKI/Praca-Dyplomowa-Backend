import { Answer } from "src/answer/answer.entity";
import { Test } from "src/test/test.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Test, test => test.questions, {
        onDelete: 'CASCADE'
    })
    test: Test;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];
}
