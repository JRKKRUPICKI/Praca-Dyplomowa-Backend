import { IsNumberString } from "class-validator";

export class GetTestTeacherDto {
    @IsNumberString()
    teacherId: number;
}
