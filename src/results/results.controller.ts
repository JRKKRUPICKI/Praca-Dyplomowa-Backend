import { Controller, Get, Param } from "@nestjs/common";
import { GetStudentResultsDto } from "./dto/get-student-results.dto";
import { ResultsService } from "./results.service";

@Controller('results')
export class ResultsController {
    constructor(private resultsService: ResultsService) { }

    // GET /results/student/1
    @Get('student/:studentId')
    getResultByStudentId(@Param() params: GetStudentResultsDto) {
        return this.resultsService.getById(params.studentId);
    }
}
