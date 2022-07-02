import { IsNumberString } from "class-validator";

export class GetLogDto{
    @IsNumberString()
    studentId: number;
}
