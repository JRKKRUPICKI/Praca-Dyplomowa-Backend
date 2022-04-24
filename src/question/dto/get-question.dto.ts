import { IsNumberString } from "class-validator";

export class GetQuestionDto{
    @IsNumberString()
    id: number;
}
