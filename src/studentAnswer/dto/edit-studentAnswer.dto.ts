import { IsNumber } from "class-validator";

export class EditStudentAnswerDto{
    @IsNumber()
    answerId: number;
}
