import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Log } from "src/log/log.entity";
import { StudentAnswer } from "src/studentAnswer/studentAnswer.entity";
import { Test } from "src/test/test.entity";
import { getRepository, ILike, Not, Repository } from "typeorm";
import { Student } from "./student.entity";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private repo: Repository<Student>) { }

    getAll() {
        return this.repo.find({
            relations: ['test']
        });
    }

    async getById(id: number) {
        let student = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        return student;
    }

    async add(login: string, password: string, testId: number) {
        const testRepository = getRepository(Test);
        let test = null;
        await testRepository.findOne({
            relations: ['students'],
            where: {
                id: testId
            }
        }).then(t => test = t);
        if (!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        const students = test.students.filter(s => s.login.toUpperCase() === login.toUpperCase());
        if (students.length > 0) throw new HttpException('Student already exists', HttpStatus.BAD_REQUEST);
        const student = this.repo.create({ login, password, test });
        return this.repo.save(student);
    }

    async remove(id: number) {
        let student = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(student);
    }

    async edit(id: number, login: string, password: string, active: boolean) {
        let student = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                id: id
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        const test = student.test;
        let students = [];
        await this.repo.find({
            where: {
                login: ILike(login),
                id: Not(id),
                test: {
                    id: test.id,
                }
            }
        }).then(s => students = s);
        if (students.length > 0) throw new HttpException('Student already exists', HttpStatus.BAD_REQUEST);
        student.login = login;
        student.password = password;
        if (student.active !== active && active) {
            const studentAnswerRepository = getRepository(StudentAnswer);
            let studentAnswers = null;
            await studentAnswerRepository.find({
                where: {
                    student: {
                        id: id
                    }
                }
            }).then(sa => studentAnswers = sa);
            studentAnswerRepository.remove(studentAnswers);
            student.status = 0;
            const logRepository = getRepository(Log);
            let logs = null;
            await logRepository.find({
                where: {
                    student: {
                        id: id
                    }
                }
            }).then(l => logs = l);
            logRepository.remove(logs);
        }
        student.active = active;
        return this.repo.save(student);
    }

    async login(login: string, password: string, testId: number) {
        let student = null;
        await this.repo.findOne({
            relations: ['test'],
            where: {
                login: login,
                password: password,
                test: {
                    id: testId
                }
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Incorrent login or password', HttpStatus.UNAUTHORIZED);
        const now = new Date();
        const start = new Date(student.test.loginTimeStart);
        const end = new Date(student.test.loginTimeEnd);
        if (now < start) throw new HttpException('Test has not started yet', HttpStatus.UNAUTHORIZED);
        if (now >= end) throw new HttpException('Time to log in has expired', HttpStatus.UNAUTHORIZED);
        if (!student.active) throw new HttpException('Inactive student account', HttpStatus.UNAUTHORIZED);
        student.active = false;
        await this.repo.save(student);
        delete student.password;
        delete student.active;
        return student;
    }
}
