import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { AddUserDto } from "./dto/add-user.dto";
import { EditUserDto } from "./dto/edit-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    /*
    SPOSÓB 1
    private userService;
    constructor(userService: UserService){
        this.userService = userService;
    }

    SPOSÓB 2
    constructor(private userService: UserService){}
    */

    // GET /user
    @Get()
    getUsers(){
        return this.userService.getAll();
    }

    // GET /user/1
    @Get(':id')
    getUser(@Param() params: GetUserDto){
        return this.userService.getById(params.id);
    }

    // POST /user
    @Post()
    // addUser(@Body() body: {email: string, password: string}){
    addUser(@Body() body: AddUserDto){
        return this.userService.add(body.email, body.password);
    }

    // DELETE /user/1
    @Delete(':id')
    @HttpCode(204)
    removeUser(@Param() params: GetUserDto){
        return this.userService.remove(params.id);
    }

    // PATCH /user/1
    @Patch(':id')
    editUser(@Param() params: GetUserDto, @Body() body: EditUserDto){
        return this.userService.edit(params.id, body.password, body.email);
    }
}