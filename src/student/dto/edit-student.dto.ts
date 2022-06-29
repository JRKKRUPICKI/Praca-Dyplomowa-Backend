import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditStudentDto{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    login: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;
}
