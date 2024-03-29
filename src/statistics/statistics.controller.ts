import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetTestStatisticsDto } from "./dto/get-test-statistics.dto";
import { StatisticsService } from "./statistics.service";

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) { }

    // GET /statistics/1
    @Get(':testId')
    getTeacher(@Param() params: GetTestStatisticsDto) {
        return this.statisticsService.getById(params.testId);
    }
}
