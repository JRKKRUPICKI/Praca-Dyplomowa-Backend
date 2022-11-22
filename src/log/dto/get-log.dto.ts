import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetLogDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
