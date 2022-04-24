import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddAnswerDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    questionId: number;

    @IsBoolean()
    correct: boolean;
}
