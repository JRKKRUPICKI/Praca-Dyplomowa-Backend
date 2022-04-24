import { IsNumberString } from "class-validator";

export class GetAnswerDto{
    @IsNumberString()
    id: number;
}
