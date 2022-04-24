import { IsNumberString } from "class-validator";

export class GetStudentDto{
    @IsNumberString()
    id: number;
}
