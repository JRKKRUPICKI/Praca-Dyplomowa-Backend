import { IsNumber } from "class-validator";

export class AddLogDto{
    @IsNumber()
    studentId: number;

    @IsNumber()
    testId: number;

    @IsNumber()
    questionId: number;

    @IsNumber()
    answerId: number;

    @IsNumber()
    datetime: number;

    @IsNumber()
    actionType: number;
}
