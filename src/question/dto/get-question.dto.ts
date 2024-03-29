import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetQuestionDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
