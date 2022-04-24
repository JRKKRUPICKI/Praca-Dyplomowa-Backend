import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTestDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    teacherId: number;
}
