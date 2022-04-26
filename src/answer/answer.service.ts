import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/question/question.entity";
import { getRepository, Repository } from "typeorm";
import { Answer } from "./answer.entity";

@Injectable()
export class AnswerService{
    constructor(@InjectRepository(Answer) private repo: Repository<Answer>){}

    getAll(){
        return this.repo.find({
            relations: ['question']
        });
    }

    async getById(id: number){
        let answer = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(a => answer = a);
        if(!answer) throw new HttpException('Answer not found', HttpStatus.BAD_REQUEST);
        return answer;
    }

    async add(name: string, questionId: number, correct: boolean){
        const questionRepository = getRepository(Question);
        let question = null;
        await questionRepository.findOne({
            relations: ['answers'],
            where: {
                id: questionId
            }
        }).then(q => question = q);
        if(!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        let answer = null;
        await this.repo.findOne({
            relations: ['question'],
            where: {
                name: name,
                question: {
                    id: questionId
                }
            }
        }).then(a => answer = a);
        if(answer) throw new HttpException('Answer already exists', HttpStatus.BAD_REQUEST);
        answer = this.repo.create({name, question, correct});
        return this.repo.save(answer);
    }

    async remove(id: number){
        let answer = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(a => answer = a);
        if(!answer) throw new HttpException('Answer not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(answer);
    }

    async edit(id: number, name: string, correct: boolean){
        let answer = null;
        await this.repo.findOne({
            relations: ['question'],
            where: {
                id: id
            }
        }).then(a => answer = a);
        if(!answer) throw new HttpException('Answer not found', HttpStatus.BAD_REQUEST);
        const question = answer.question;
        let answers = [];
        await this.repo.find({
            where: {
                name: name,
                question: {
                    id: question.id
                }
            }
        }).then(a => answers = a);
        if(answers.length > 0) throw new HttpException('Answer already exists', HttpStatus.BAD_REQUEST);
        answer.name = name;
        answer.correct = correct;
        return this.repo.save(answer);
    }
}
