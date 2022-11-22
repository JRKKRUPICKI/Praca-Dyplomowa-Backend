import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetTestDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
