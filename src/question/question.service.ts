import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Test } from "src/test/test.entity";
import { getRepository, ILike, Not, Repository } from "typeorm";
import { Question } from "./question.entity";

@Injectable()
export class QuestionService{
    constructor(@InjectRepository(Question) private repo: Repository<Question>){}

    getAll(){
        return this.repo.find({
            relations: ['test', 'answers']
        });
    }

    async getById(id: number){
        let question = null;
        await this.repo.findOne({
            relations: ['answers'],
            where: {
                id: id
            }
        }).then(q => question = q);
        if(!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        return question;
    }

    async add(name: string, testId: number){
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            where: {
                id: testId
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        let question = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                name: name,
                test: {
                    id: testId
                }
            }
        }).then(q => question = q);
        if(question) throw new HttpException('Question already exists', HttpStatus.BAD_REQUEST);
        question = this.repo.create({name, test});
        return this.repo.save(question);
    }

    async remove(id: number){
        let question = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(q => question = q);
        if(!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(question);
    }

    async edit(id: number, name: string, type: boolean){
        let question = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                id: id
            }
        }).then(q => question = q);
        if(!question) throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
        const test = question.test;
        let questions = [];
        await this.repo.find({
            //relations: ['test'],
            where: {
                // case insensitive
                name: ILike(name),
                test: {
                    id: test.id
                },
                id: Not(id)
            }
        }).then(q => questions = q);
        if(questions.length > 0) throw new HttpException('Question already exists', HttpStatus.BAD_REQUEST);
        question.name = name;
        question.type = type;
        return this.repo.save(question);
    }

    getByTestId(testId: number){
        return this.repo.find({
            relations: ['test', 'answers'],
            where: {
                test: {
                    id: testId
                }
            }
        });
    }
}
