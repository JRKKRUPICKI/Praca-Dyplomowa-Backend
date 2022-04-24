import { IsNotEmpty, IsString } from "class-validator";

export class EditStudentDto{
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
