import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AddLogDto } from "./dto/add-log.dto";
import { GetLogDto } from "./dto/get-log.dto";
import { LogService } from "./log.service";

@Controller('logs')
export class LogController {
    constructor(private logService: LogService) { }

    // GET /logs/test/1
    @Get('test/:id')
    getLogsByTestId(@Param() params: GetLogDto) {
        return this.logService.getByTestId(params.id);
    }

    // GET /logs/student/1
    @Get('student/:id')
    getLogsByStudentId(@Param() params: GetLogDto) {
        return this.logService.getByStudentId(params.id);
    }

    // GET /logs/test/1/live
    @Get('test/:id/live')
    getLogsByTestIdLive(@Param() params: GetLogDto) {
        return this.logService.getByTestIdLive(params.id);
    }

    // GET /logs/student/1/live
    @Get('student/:id/live')
    getLogsByStudentIdLive(@Param() params: GetLogDto) {
        return this.logService.getByStudentIdLive(params.id);
    }

    // POST /logs
    @Post()
    addLog(@Body() body: AddLogDto) {
        return this.logService.add(body.studentId, body.testId, body.questionId, body.answerId, body.datetime, body.actionType);
    }
}
