import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Answer } from "src/answer/answer.entity";
import { Test } from "src/test/test.entity";
import { getRepository } from "typeorm";

@Injectable()
export class StatisticsService{

    async getById(testId: number){
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            relations: ['questions', 'students'],
            where: {
                id: testId
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        const response = {
            questions: 0,
            answers: 0,
            students: 0
        }
        response.questions = test.questions.length;
        response.students = test.students.length;
        const answerRepository = getRepository(Answer);
        let answers = null;
        await answerRepository.find({
            relations: ['question'],
            where: {
                question: {
                    test: {
                        id: testId
                    }
                }
            }
        }).then(a => answers = a);
        response.answers = answers.length;
        return response;
    }
}
