import { IsNotEmpty, IsString } from "class-validator";

export class AddUserDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}