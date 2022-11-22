import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddStudentAnswerDto {

    @ApiProperty()
    @IsNumber()
    studentId: number;

    @ApiProperty()
    @IsNumber()
    testId: number;

    @ApiProperty()
    @IsNumber()
    questionId: number;

    @ApiProperty()
    @IsNumber()
    answerId: number;
}
