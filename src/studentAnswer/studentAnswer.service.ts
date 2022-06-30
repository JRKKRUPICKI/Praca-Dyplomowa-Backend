import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { networkInterfaces } from "os";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Student } from "src/student/student.entity";
import { Test } from "src/test/test.entity";
import { getRepository, Repository } from "typeorm";
import { StudentAnswer } from "./studentAnswer.entity";

@Injectable()
export class StudentAnswerService{
    constructor(@InjectRepository(StudentAnswer) private repo: Repository<StudentAnswer>){}

    getAll(){
        return this.repo.find({
            relations: ['student', 'test', 'question', 'answer']
        });
    }

    async getByStudentId(studentId: number){
        const studentRepository = getRepository(Student);
        let student = null;
        await studentRepository.findOne({
            where: {
                id: studentId
            }
        }).then(s => student = s);
        if(!student) throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        return this.repo.find({
            relations: ['student', 'test', 'question', 'answer'],
            where: {
                student: {
                    id: studentId
                }
            }
        });
    }

    async add(studentId: number, testId: number, questionId: number, answerId: number){
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
        if(!answer) throw new HttpException('Answer not found in question', HttpStatus.BAD_REQUEST);
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
        if(!question) throw new HttpException('Question not found in test', HttpStatus.BAD_REQUEST);
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
        if(!student) throw new HttpException('Student not found in test', HttpStatus.BAD_REQUEST);
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            where: {
                id: testId
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        let studentAnswer = null;
        await this.repo.findOne({
            relations: ['student', 'test', 'question', 'answer'],
            where: {
                student: {
                    id: studentId
                },
                test: {
                    id: testId
                },
                question: {
                    id: questionId
                },
                answer: {
                    id: answerId
                }
            }
        }).then(a => studentAnswer = a);
        if(studentAnswer) throw new HttpException('Student answer already exists', HttpStatus.BAD_REQUEST);
        studentAnswer = this.repo.create({student, test, question, answer});
        student.status = Date.now();
        studentRepository.save(student);
        return this.repo.save(studentAnswer);
    }

    async remove(id: number){
        let studentAnswer = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(sa => studentAnswer = sa);
        if(!studentAnswer) throw new HttpException('Student answer not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(studentAnswer);
    }
}
