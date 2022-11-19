import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddStudentDto } from "./dto/add-student.dto";
import { EditStudentDto } from "./dto/edit-student.dto";
import { GetStudentDto } from "./dto/get-student.dto";
import { LoginStudentDto } from "./dto/login-student.dto";
import { StudentService } from "./student.service";

@ApiTags('student')
@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) { }

    // GET /student
    @Get()
    getStudents() {
        return this.studentService.getAll();
    }

    // GET /student/1
    @Get(':id')
    getStudent(@Param() params: GetStudentDto) {
        return this.studentService.getById(params.id);
    }

    // POST /student
    @Post()
    addStudent(@Body() body: AddStudentDto) {
        return this.studentService.add(body.login, body.password, body.testId);
    }

    // DELETE /student/1
    @Delete(':id')
    removeStudent(@Param() params: GetStudentDto) {
        return this.studentService.remove(params.id);
    }

    // PATCH /student/1
    @Patch(':id')
    editStudent(@Param() params: GetStudentDto, @Body() body: EditStudentDto) {
        return this.studentService.edit(params.id, body.login, body.password, body.active);
    }

    // POST /student/login
    @Post('login')
    loginStudent(@Body() body: LoginStudentDto) {
        return this.studentService.login(body.login, body.password, body.testId);
    }
}
