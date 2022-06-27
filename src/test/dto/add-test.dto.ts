import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTestDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    teacherId: number;

    @IsNumber()
    time: number;

    @IsNumber()
    loginTimeStart: number;

    @IsNumber()
    loginTimeEnd: number;
}
