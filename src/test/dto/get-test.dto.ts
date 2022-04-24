import { IsNumberString } from "class-validator";

export class GetTestDto{
    @IsNumberString()
    id: number;
}
