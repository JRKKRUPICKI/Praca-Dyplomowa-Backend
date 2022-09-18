import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Test } from "src/test/test.entity";
import { getRepository, Repository } from "typeorm";
import { Log } from "./log.entity";

@Injectable()
export class LogService {
    constructor(@InjectRepository(Log) private repo: Repository<Log>) { }

    async getByTestId(testId: number) {
        return this.repo.find({
            relations: ['student', 'test', 'question', 'answer'],
            where: {
                test: {
                    id: testId
                }
            },
            order: {
                datetime: "DESC"
            }
        });
    }

    async getByStudentId(studentId: number) {
        const studentRepository = getRepository(Student);
        let student = null;
        await studentRepository.findOne({
            where: {
                id: studentId
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        return this.repo.find({
            relations: ['student', 'test', 'question', 'answer'],
            where: {
                student: {
                    id: studentId
                }
            }
        });
    }

    async add(studentId: number, testId: number, questionId: number, answerId: number, datetime: number, actionType: number) {
        const answerRepository = getRepository(Answer);
        let answer = null;
        await answerRepository.findOne({
            where: {
                id: answerId,
                question: {
                    id: questionId
                }
            }
        }).then(a => answer = a);
        if (!answer) throw new HttpException('Answer not found in question', HttpStatus.BAD_REQUEST);
        const questionRepository = getRepository(Question);
        let question = null;
        await questionRepository.findOne({
            where: {
                id: questionId,
                test: {
                    id: testId
                }
            }
        }).then(q => question = q);
        if (!question) throw new HttpException('Question not found in test', HttpStatus.BAD_REQUEST);
        const studentRepository = getRepository(Student);
        let student = null;
        await studentRepository.findOne({
            where: {
                id: studentId,
                test: {
                    id: testId
                }
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Student not found in test', HttpStatus.BAD_REQUEST);
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            where: {
                id: testId
            }
        }).then(t => test = t);
        if (!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        let studentAnswer = null;
        studentAnswer = this.repo.create({ student, test, question, answer, datetime, actionType });
        return this.repo.save(studentAnswer);
    }
}
