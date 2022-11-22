import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditTestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    time: number;

    @ApiProperty()
    @IsNumber()
    loginTimeStart: number;

    @ApiProperty()
    @IsNumber()
    loginTimeEnd: number;
}
