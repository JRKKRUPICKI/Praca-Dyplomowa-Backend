import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetStudentAnswerDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
