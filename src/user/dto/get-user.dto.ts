import { IsNumberString } from "class-validator";

export class GetUserDto{
    @IsNumberString()
    id: number;
}