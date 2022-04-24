import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestController } from "./test.controller";
import { Test } from "./test.entity";
import { TestService } from "./test.service";

@Module({
    imports: [TypeOrmModule.forFeature([Test])],
    controllers: [TestController],
    providers: [TestService]
})
export class TestModule{}
