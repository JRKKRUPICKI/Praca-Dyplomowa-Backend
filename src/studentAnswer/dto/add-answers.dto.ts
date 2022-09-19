import { IsArray } from "class-validator";

export class AddAnswersDto {
    @IsArray()
    answers: [{
        testId: number,
        questionId: number,
        answerId: number,
        studentId: number
    }];
}
