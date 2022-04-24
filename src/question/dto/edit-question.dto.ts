import { IsNotEmpty, IsString } from "class-validator";

export class EditQuestionDto{
    @IsString()
    @IsNotEmpty()
    name: string;
}
