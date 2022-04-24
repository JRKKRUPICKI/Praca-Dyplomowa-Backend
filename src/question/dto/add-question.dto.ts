import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddQuestionDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    testId: number;
}
