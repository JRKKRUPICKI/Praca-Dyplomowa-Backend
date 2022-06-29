import { IsNumber } from "class-validator";

export class AddStudentAnswerDto{
    @IsNumber()
    studentId: number;

    @IsNumber()
    testId: number;

    @IsNumber()
    questionId: number;

    @IsNumber()
    answerId: number;
}
