import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetAnswerDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
