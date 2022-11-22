import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetTestTeacherDto {

    @ApiProperty()
    @IsNumberString()
    teacherId: number;
}
