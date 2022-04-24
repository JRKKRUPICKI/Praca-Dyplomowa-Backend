import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    getAll(){
        return this.repo.find();
    }

    async getById(id: number){
        let user = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(u => user = u);
        if(!user) throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
        return user;
    }

    async add(email: string, password: string){
        let user = null;
        await this.repo.findOne({
            where: {
                email: email
            }
        }).then(u => user = u);
        if(user) throw new HttpException('User exist', HttpStatus.BAD_REQUEST);
        const newUser = this.repo.create({email, password});
        return this.repo.save(newUser);
    }

    async remove(id: number){
        let user = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(u => user = u);
        if(!user) throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
        this.repo.remove(user);
    }

    async edit(id: number, password: string, email: string){
        let user = null;
        await this.repo.findOne({
            where: {
                id: id
            }
        }).then(u => user = u);
        if(!user) throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
        user.password = password;
        user.email = email;
        this.repo.save(user);
        return user;
    }
}