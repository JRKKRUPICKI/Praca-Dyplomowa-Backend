import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AddAnswersDto {

    @ApiProperty()
    @IsArray()
    answers: [{
        testId: number,
        questionId: number,
        answerId: number,
        studentId: number
    }];
}
