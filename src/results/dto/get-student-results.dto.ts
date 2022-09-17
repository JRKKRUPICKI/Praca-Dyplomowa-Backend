import { IsNumberString } from "class-validator";

export class GetStudentResultsDto {
    @IsNumberString()
    studentId: number;
}
