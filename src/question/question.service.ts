import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Test } from "src/test/test.entity";
import { getRepository, ILike, Not, Repository } from "typeorm";
import { Question } from "./question.entity";

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private repo: Repository<Question>) { }

    getAll() {
        return this.repo.find({
            relations: ['test', 'answers']
        });
    }

    async getById(id: number) {
        let question = null;
        await this.repo.findOne({
            relations: ['answers'],
            where: {
                id: id
            }
        }).then(q => question = q);
        if (!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        return question;
    }

    async add(name: string, testId: number) {
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            where: {
                id: testId
            }
        }).then(t => test = t);
        if (!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        let question = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                name: ILike(name),
                test: {
                    id: testId
                }
            }
        }).then(q => question = q);
        if (question) throw new HttpException('Question already exists', HttpStatus.BAD_REQUEST);
        question = this.repo.create({ name, test });
        return this.repo.save(question);
    }

    async remove(id: number) {
        let question = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(q => question = q);
        if (!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(question);
    }

    async edit(id: number, name: string, type: boolean) {
        let question = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                id: id
            }
        }).then(q => question = q);
        if (!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        const test = question.test;
        let questions = [];
        await this.repo.find({
            where: {
                name: ILike(name),
                test: {
                    id: test.id
                },
                id: Not(id)
            }
        }).then(q => questions = q);
        if (questions.length > 0) throw new HttpException('Question already exists', HttpStatus.BAD_REQUEST);
        question.name = name;
        question.type = type;
        return this.repo.save(question);
    }

    async getByTestId(testId: number) {
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            relations: ['questions', 'questions.answers'],
            where: {
                id: testId
            }
        }).then(t => test = t);
        if (!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        test.questions.forEach(q => {
            q.answers.forEach(a => delete a.correct);
            for (let i = q.answers.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = q.answers[i];
                q.answers[i] = q.answers[j];
                q.answers[j] = temp;
            }
        });
        for (let i = test.questions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = test.questions[i];
            test.questions[i] = test.questions[j];
            test.questions[j] = temp;
        }
        return test;
    }
}
