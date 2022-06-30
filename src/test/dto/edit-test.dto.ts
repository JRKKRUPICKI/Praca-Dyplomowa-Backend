import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditTestDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    time: number;

    @IsNumber()
    loginTimeStart: number;

    @IsNumber()
    loginTimeEnd: number;
}
