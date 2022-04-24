import { IsNotEmpty, IsString } from "class-validator";

export class AddTeacherDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    password2: string;
}
