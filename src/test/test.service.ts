import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/teacher/teacher.entity";
import { getRepository, Repository } from "typeorm";
import { Test } from "./test.entity";

@Injectable()
export class TestService{
    constructor(@InjectRepository(Test) private repo: Repository<Test>){}

    getAll(){
        const testRepository = getRepository(Test);
        const tests = testRepository.find({
            relations: ['teacher', 'students','questions']
        });
        return tests;
    }

    async getById(id: number){
        let test = null;
        await this.repo.findOne({
            relations: ['questions'],
            where: {
                id: id
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        return test;
    }

    async add(name: string, teacherId: number){
        const teacherRepository = getRepository(Teacher);
        let teacher = null;
        await teacherRepository.findOne({
            where: {
                id: teacherId
            }
        }).then(t => teacher = t);
        if(!teacher) throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
        let test = null;
        await this.repo.findOne({
            relations: ['teacher'],
            where: {
                name: name,
                teacher: {
                    id: teacherId
                }
            }
        }).then(t => test = t);
        if(test) throw new HttpException('Test already exists', HttpStatus.BAD_REQUEST);
        test = this.repo.create({name, teacher});
        return this.repo.save(test);
    }

    async remove(id: number){
        let test = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(test);
    }

    async edit(id: number, name: string){
        let test = null;
        await this.repo.findOne({
            relations: ['teacher'],
            where: {
                id: id
            }
        }).then(t => test = t);
        if(!test) throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
        const teacher = test.teacher;
        let tests = [];
        await this.repo.find({
            relations: ['teacher'],
            where: {
                teacher: teacher,
                name: name
            }
        }).then(t => tests = t);
        if(tests.length > 0) throw new HttpException('Test already exists', HttpStatus.BAD_REQUEST);
        test.name = name;
        return this.repo.save(test);
    }
}
