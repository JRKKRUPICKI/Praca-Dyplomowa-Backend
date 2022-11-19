import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetTestResultsDto {

    @ApiProperty()
    @IsNumberString()
    testId: number;
}
