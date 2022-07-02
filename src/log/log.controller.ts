import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AddLogDto } from "./dto/add-log.dto";
import { GetLogDto } from "./dto/get-log.dto";
import { LogService } from "./log.service";

@Controller('logs')
export class LogController{
    constructor(private logService: LogService){}

    // GET /logs/1
    @Get(':studentId')
    getLogsByStudentId(@Param() params: GetLogDto){
        return this.logService.getByStudentId(params.studentId);
    }

    // POST /logs
    @Post()
    addLog(@Body() body: AddLogDto){
        return this.logService.add(body.studentId, body.testId, body.questionId, body.answerId, body.datetime, body.actionType);
    }
}
