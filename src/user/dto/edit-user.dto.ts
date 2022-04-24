import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditUserDto{
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    email: string;
}