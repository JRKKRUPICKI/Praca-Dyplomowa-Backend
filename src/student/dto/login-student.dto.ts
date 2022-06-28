import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginStudentDto{
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    testId: number;
}
