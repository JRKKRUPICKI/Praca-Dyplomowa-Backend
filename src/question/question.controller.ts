import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GetTestDto } from "src/test/dto/get-test.dto";
import { AddQuestionDto } from "./dto/add-question.dto";
import { EditQuestionDto } from "./dto/edit-question.dto";
import { GetQuestionDto } from "./dto/get-question.dto";
import { QuestionService } from "./question.service";

@Controller('question')
export class QuestionController{
    constructor(private questionService: QuestionService){}

    // GET /question
    @Get()
    getQuestions(){
        return this.questionService.getAll();
    }

    // GET /question/1
    @Get(':id')
    getQuestion(@Param() params: GetQuestionDto){
        return this.questionService.getById(params.id);
    }

    // POST /question
    @Post()
    addQuestion(@Body() body: AddQuestionDto){
        return this.questionService.add(body.name, body.testId);
    }

    // DELETE /question/1
    @Delete(':id')
    removeQuestion(@Param() params: GetQuestionDto){
        return this.questionService.remove(params.id);
    }

    // PATCH /question/1
    @Patch(':id')
    editQuestion(@Param() params: GetQuestionDto, @Body() body: EditQuestionDto){
        return this.questionService.edit(params.id, body.name, body.type);
    }

    // GET /question/test/1
    @Get('test/:id')
    getQuestionsByTestId(@Param() params: GetTestDto){
        return this.questionService.getByTestId(params.id);
    }
}
