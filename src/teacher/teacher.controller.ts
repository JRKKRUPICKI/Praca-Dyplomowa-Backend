import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddTeacherDto } from "./dto/add-teacher.dto";
import { EditTeacherDto } from "./dto/edit-teacher.dto";
import { GetTeacherDto } from "./dto/get-teacher.dto";
import { TeacherService } from "./teacher.service";

@Controller('teacher')
export class TeacherController{
    constructor(private teacherService: TeacherService){}

    // GET /teacher
    @Get()
    getTeachers(){
        return this.teacherService.getAll();
    }

    // GET /teacher/1
    @Get(':id')
    getTeacher(@Param() params: GetTeacherDto){
        return this.teacherService.getById(params.id);
    }

    // POST /teacher
    @Post()
    addTeacher(@Body() body: AddTeacherDto){
        return this.teacherService.add(body.email, body.password, body.password2);
    }

    // DELETE /teacher/1
    @Delete(':id')
    removeTeacher(@Param() params: GetTeacherDto){
        return this.teacherService.remove(params.id);
    }

    // PATCH /teacher/1
    @Patch(':id')
    editTeacher(@Param() params: GetTeacherDto, @Body() body: EditTeacherDto){
        return this.teacherService.edit(params.id, body.password, body.password2);
    }
}
