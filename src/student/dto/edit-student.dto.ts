import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditStudentDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    active: boolean;
}
