import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetStudentResultsDto {

    @ApiProperty()
    @IsNumberString()
    studentId: number;
}
