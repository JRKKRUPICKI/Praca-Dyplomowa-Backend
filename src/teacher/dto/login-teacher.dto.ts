import { IsNotEmpty, IsString } from "class-validator";

export class LoginTeacherDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
