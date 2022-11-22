import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetStudentResultsDto } from "./dto/get-student-results.dto";
import { GetTestResultsDto } from "./dto/get-test-results.dto";
import { ResultsService } from "./results.service";

@ApiTags('results')
@Controller('results')
export class ResultsController {
    constructor(private resultsService: ResultsService) { }

    // GET /results/student/1
    @Get('student/:studentId')
    getResultByStudentId(@Param() params: GetStudentResultsDto) {
        return this.resultsService.getById(params.studentId);
    }

    // GET /results/test/1
    @Get('test/:testId')
    getAllStudentsResultsByTestId(@Param() params: GetTestResultsDto) {
        return this.resultsService.getByTestId(params.testId);
    }
}
