import { IsNumberString } from "class-validator";

export class GetTeacherDto{
    @IsNumberString()
    id: number;
}
