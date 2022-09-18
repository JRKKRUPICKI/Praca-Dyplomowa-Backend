import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Answer } from "src/answer/answer.entity";
import { Log } from "src/log/log.entity";
import { Student } from "src/student/student.entity";
import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Test } from "src/test/test.entity";
import { getRepository, MoreThan } from "typeorm";

@Injectable()
export class StatisticsService {

    async getById(testId: number) {
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            relations: ['questions', 'students'],
            where: {
                id: testId
            }
        }).then(t => test = t);
        if (!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        const response = {
            questions: 0,
            answers: 0,
            students: 0,
            logs: 0,
            startedStudents: 0,
            endedStudents: 0
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
        const logRepository = getRepository(Log);
        let logs = null;
        await logRepository.find({
            where: {
                test: {
                    id: testId
                }
            }
        }).then(l => logs = l);
        response.logs = logs.length;
        // const studentAnswerRepository = getRepository(StudentAnswer);
        // let studentAnswers = null;
        // await studentAnswerRepository.find({
        //     relations: ['student'],
        //     where: {
        //         test: {
        //             id: testId
        //         }
        //     }
        // }).then(sa => studentAnswers = sa);
        // const savedStudents = [];
        // studentAnswers.forEach(studentAnswer => savedStudents.filter(student => student === studentAnswer.student.id).length === 0 && savedStudents.push(studentAnswer.student.id));
        // response.savedStudents = savedStudents.length;
        const studentRepository = getRepository(Student);
        let startedStudents = null;
        await studentRepository.find({
            where: {
                active: false,
                status: 0
            }
        }).then(s => startedStudents = s);
        response.startedStudents = startedStudents.length;
        let endedStudents = null;
        await studentRepository.find({
            where: {
                active: false,
                status: MoreThan(0)
            }
        }).then(s => endedStudents = s);
        response.endedStudents = endedStudents.length;
        return response;
    }
}
