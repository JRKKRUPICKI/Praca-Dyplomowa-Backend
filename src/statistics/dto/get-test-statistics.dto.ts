import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetTestStatisticsDto {

    @ApiProperty()
    @IsNumberString()
    testId: number;
}
