import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Test } from "src/test/test.entity";
import { getRepository, Not, Repository } from "typeorm";
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
                login: login,
                id: Not(id),
                test: {
                    id: test.id,
                }
            }
        }).then(s => students = s);
        if (students.length > 0) throw new HttpException('Student already exists', HttpStatus.BAD_REQUEST);
        student.login = login;
        student.password = password;
        student.active = active;
        return this.repo.save(student);
    }

    async login(login: string, password: string, testId: number) {
        let student = null;
        await this.repo.findOne({
            where: {
                login: login,
                password: password,
                test: {
                    id: testId
                }
            }
        }).then(s => student = s);
        if (!student) throw new HttpException('Incorrent login or password', HttpStatus.UNAUTHORIZED);
        if (!student.active) throw new HttpException('Inactive student account', HttpStatus.UNAUTHORIZED);
        student.active = false;
        await this.repo.save(student);
        delete student.password;
        delete student.active;
        return student;
    }
}
