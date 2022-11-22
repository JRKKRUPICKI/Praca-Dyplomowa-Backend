import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetStudentDto {

    @ApiProperty()
    @IsNumberString()
    id: number;
}
