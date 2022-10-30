import { IsNumberString } from "class-validator";

export class GetTestResultsDto {
    @IsNumberString()
    testId: number;
}
