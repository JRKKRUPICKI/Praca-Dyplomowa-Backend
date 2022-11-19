import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";
import { AddAnswerDto } from "./dto/add-answer.dto";
import { EditAnswerDto } from "./dto/edit-answer.dto";
import { GetAnswerDto } from "./dto/get-answer.dto";

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
    constructor(private answerService: AnswerService) { }

    // GET /answer
    @Get()
    getAnswers() {
        return this.answerService.getAll();
    }

    // GET /answer/1
    @Get(':id')
    getAnswer(@Param() params: GetAnswerDto) {
        return this.answerService.getById(params.id);
    }

    // POST /answer
    @Post()
    addAnswer(@Body() body: AddAnswerDto) {
        return this.answerService.add(body.name, body.questionId, body.correct);
    }

    // DELETE /answer/1
    @Delete(':id')
    removeAnswer(@Param() params: GetAnswerDto) {
        return this.answerService.remove(params.id);
    }

    // PATCH /answer/1
    @Patch(':id')
    editAnswer(@Param() params: GetAnswerDto, @Body() body: EditAnswerDto) {
        return this.answerService.edit(params.id, body.name, body.correct);
    }
}
