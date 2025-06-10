import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./model/category.model";
import { SessionsModule } from "./../sessions/sessions.module";

@Module({
    imports: [TypeOrmModule.forFeature([Category]), SessionsModule],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
