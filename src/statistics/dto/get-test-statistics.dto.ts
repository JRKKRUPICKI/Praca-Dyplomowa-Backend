import { IsNumberString } from "class-validator";

export class GetTestStatisticsDto{
    @IsNumberString()
    testId: number;
}
