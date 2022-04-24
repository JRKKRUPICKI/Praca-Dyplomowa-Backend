import { IsNotEmpty, IsString } from "class-validator";

export class EditTestDto{
    @IsString()
    @IsNotEmpty()
    name: string;
}
