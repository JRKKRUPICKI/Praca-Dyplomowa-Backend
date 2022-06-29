import { IsNumberString } from "class-validator";

export class GetStudentAnswerDto{
    @IsNumberString()
    id: number;
}
