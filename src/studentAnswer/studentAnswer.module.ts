import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentAnswerController } from "./studentAnswer.controller";
import { StudentAnswer } from "./studentAnswer.entity";
import { StudentAnswerService } from "./studentAnswer.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentAnswer])],
    controllers: [StudentAnswerController],
    providers: [StudentAnswerService]
})
export class StudentAnswerModule{}
