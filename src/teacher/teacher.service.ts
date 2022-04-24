import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "./teacher.entity";

@Injectable()
export class TeacherService{
    constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>){}

    getAll(){
        return this.repo.find({
            relations: ['tests']
        });
    }

    async getById(id: number){
        let teacher = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(t => teacher = t);
        if(!teacher) throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
        return teacher;
    }

    async add(email: string, password: string, password2: string){
        let teacher = null;
        await this.repo.findOne({
            where: {
                email: email
            }
        }).then(t => teacher = t);
        if(teacher) throw new HttpException('Teacher already exists', HttpStatus.BAD_REQUEST);
        if(password !== password2) throw new HttpException('First password is not same as second password', HttpStatus.BAD_REQUEST);
        // TODO hashed password
        teacher = this.repo.create({email, password});
        teacher = await this.repo.save(teacher);
        delete teacher.password;
        return teacher;
    }

    async remove(id: number){
        let teacher = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(t => teacher = t);
        if(!teacher) throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
        this.repo.remove(teacher);
    }

    async edit(id: number, password: string, password2: string){
        let teacher = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(t => teacher = t);
        if(!teacher) throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
        if(password !== password2) throw new HttpException('First password is not same as second password', HttpStatus.BAD_REQUEST);
        teacher.password = password;
        teacher = await this.repo.save(teacher);
        delete teacher.password;
        return teacher;
    }
}
