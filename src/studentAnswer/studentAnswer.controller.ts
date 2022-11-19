import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetStudentDto } from "src/student/dto/get-student.dto";
import { AddAnswersDto } from "./dto/add-answers.dto";
import { AddStudentAnswerDto } from "./dto/add-studentAnswer.dto";
import { GetStudentAnswerDto } from "./dto/get-studentAnswer.dto";
import { StudentAnswerService } from "./studentAnswer.service";

@ApiTags('studentanswer')
@Controller('studentanswer')
export class StudentAnswerController {
    constructor(private studentAnswerService: StudentAnswerService) { }

    // GET /studentanswer
    @Get()
    getAnswers() {
        return this.studentAnswerService.getAll();
    }

    // GET /studentanswer/1
    @Get(':id')
    getAnswerByStudentId(@Param() params: GetStudentDto) {
        return this.studentAnswerService.getByStudentId(params.id);
    }

    // POST /studentanswer
    @Post()
    addAnswer(@Body() body: AddStudentAnswerDto) {
        return this.studentAnswerService.add(body.studentId, body.testId, body.questionId, body.answerId);
    }

    // POST /studentanswer/all
    @Post('all')
    addAnswers(@Body() body: AddAnswersDto) {
        return this.studentAnswerService.addAll(body.answers);
    }

    // DELETE /studentanswer/1
    @Delete(':id')
    removeAnswer(@Param() params: GetStudentAnswerDto) {
        return this.studentAnswerService.remove(params.id);
    }
}
