import { IsNotEmpty, IsString } from "class-validator";

export class EditTeacherDto{
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    password2: string;
}
