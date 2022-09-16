import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/teacher/teacher.entity";
import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    controllers: [StatisticsController],
    providers: [StatisticsService]
})
export class StatisticsModule{}
