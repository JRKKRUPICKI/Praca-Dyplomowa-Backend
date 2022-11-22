import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Answer } from "src/answer/answer.entity";
import { Student } from "src/student/student.entity";
import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Test } from "src/test/test.entity";
import { getRepository } from "typeorm";

@Injectable()
export class ResultsService {

    async getById(studentId: number) {
        const studentAnswerRepository = getRepository(StudentAnswer);
        let studentAnswers = null;
        await studentAnswerRepository.find({
            relations: ['question', 'answer', 'question.answers'],
            where: {
                student: {
                    id: studentId
                }
            },
            order: {
                question: 'ASC'
            }

        }).then(sa => studentAnswers = sa);
        if (!studentAnswers) throw new HttpException('Student results not found', HttpStatus.BAD_REQUEST);
        let response = [];
        studentAnswers.forEach(sa => {
            const questionId = sa.question.id;
            const questionName = sa.question.name;
            const questionType = sa.question.type;
            const answerId = sa.answer.id;
            const questionAnswers = sa.question.answers;
            questionAnswers.map(answer => answer.checked = false);
            let question = response.find(item => item.question.id === questionId);
            if (!question) {
                response.push({
                    question: {
                        id: questionId,
                        name: questionName,
                        type: questionType
                    },
                    answers: questionAnswers
                });
                question = response.find(item => item.question.id === questionId);
            }
            question.answers.find(answer => answer.id === answerId).checked = true;
        });
        response.forEach(question => {
            let questionCorrect = true;
            for (let i = 0; i < question.answers.length; i++) {
                if (question.answers[i].checked !== question.answers[i].correct) {
                    questionCorrect = false;
                    break;
                }
            }
            question.question.correct = questionCorrect;
        })
        response.forEach(question => {
            question.answers.forEach(answer => delete answer.id);
            delete question.question.id;
        })
        return response
    }

    async getByTestId(testId: number) {
        const studentRepository = getRepository(Student);
        let students = null;
        await studentRepository.find({
            relations: ['test'],
            where: {
                test: {
                    id: testId
                }
            },
        }).then(s => students = s);
        let response = [];
        for await (const student of students) {
            let correctQuestions = 0;
            let notCorrectQuestions = 0;
            let questions = await this.getById(student.id);
            questions.forEach(question => {
                if (question.question.correct) correctQuestions++;
                else notCorrectQuestions++;
            })
            response.push({
                student: student.login,
                correctQuestions: correctQuestions,
                notCorrectQuestions: notCorrectQuestions
            })
        }
        return response;
    }
}
