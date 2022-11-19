import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class EditStudentAnswerDto {

    @ApiProperty()
    @IsNumber()
    answerId: number;
}
