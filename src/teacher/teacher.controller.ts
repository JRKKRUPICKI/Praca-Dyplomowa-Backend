import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddTeacherDto } from "./dto/add-teacher.dto";
import { EditTeacherDto } from "./dto/edit-teacher.dto";
import { GetTeacherDto } from "./dto/get-teacher.dto";
import { LoginTeacherDto } from "./dto/login-teacher.dto";
import { TeacherService } from "./teacher.service";

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    /*
    SPOSÓB 1
    private userService;
    constructor(userService: UserService){
        this.userService = userService;
    }

    SPOSÓB 2
    constructor(private userService: UserService){}
    */

    // GET /teacher
    @Get()
    getTeachers() {
        return this.teacherService.getAll();
    }

    // GET /teacher/1
    @Get(':id')
    getTeacher(@Param() params: GetTeacherDto) {
        return this.teacherService.getById(params.id);
    }

    // POST /teacher
    @Post()
    addTeacher(@Body() body: AddTeacherDto) {
        return this.teacherService.add(body.email, body.password, body.password2);
    }

    // DELETE /teacher/1
    @Delete(':id')
    removeTeacher(@Param() params: GetTeacherDto) {
        return this.teacherService.remove(params.id);
    }

    // PATCH /teacher/1
    @Patch(':id')
    editTeacher(@Param() params: GetTeacherDto, @Body() body: EditTeacherDto) {
        return this.teacherService.edit(params.id, body.password, body.password2);
    }

    // POST /teacher/login
    @Post('login')
    loginTeacher(@Body() body: LoginTeacherDto) {
        return this.teacherService.login(body.email, body.password);
    }

    // POST /teacher/register
    @Post('register')
    registerTeacher(@Body() body: LoginTeacherDto) {
        return this.teacherService.register(body.email, body.password);
    }
}
