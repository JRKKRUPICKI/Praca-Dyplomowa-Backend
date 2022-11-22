import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddLogDto {

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

    @ApiProperty()
    @IsNumber()
    datetime: number;

    @ApiProperty()
    @IsNumber()
    actionType: number;
}
