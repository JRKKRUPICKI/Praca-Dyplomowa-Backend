import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddTestDto } from "./dto/add-test.dto";
import { EditTestDto } from "./dto/edit-test.dto";
import { GetTestTeacherDto } from "./dto/get-test-teacher.dto";
import { GetTestDto } from "./dto/get-test.dto";
import { TestService } from "./test.service";

@Controller('test')
export class TestController {
    constructor(private testService: TestService) { }

    // GET /test
    @Get()
    getTests() {
        return this.testService.getAll();
    }

    // GET /test/1
    @Get(':id')
    getTest(@Param() params: GetTestDto) {
        return this.testService.getById(params.id);
    }

    // GET /test/teacher/1
    @Get('teacher/:teacherId')
    getTestByTeacherId(@Param() params: GetTestTeacherDto) {
        return this.testService.getByTeacherId(params.teacherId);
    }

    // POST /test
    @Post()
    addTest(@Body() body: AddTestDto) {
        return this.testService.add(body.name, body.teacherId, body.time, body.loginTimeStart, body.loginTimeEnd);
    }

    // DELETE /test/1
    @Delete(':id')
    removeTest(@Param() params: GetTestDto) {
        return this.testService.remove(params.id);
    }

    // PATCH /test/1
    @Patch(':id')
    editTest(@Param() params: GetTestDto, @Body() body: EditTestDto) {
        return this.testService.edit(params.id, body.name, body.time, body.loginTimeStart, body.loginTimeEnd);
    }
}
