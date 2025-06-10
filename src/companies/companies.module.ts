import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./models/company.model";
import { SessionsModule } from "./../sessions/sessions.module";
import { UsersModule } from "./../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Company]), SessionsModule, UsersModule],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
