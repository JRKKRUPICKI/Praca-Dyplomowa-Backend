import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class EditAnswerDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    correct: boolean;
}
