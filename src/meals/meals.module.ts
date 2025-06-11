import { Module } from "@nestjs/common";
import { MealsService } from "./meals.service";
import { MealsController } from "./meals.controller";
import { Meal } from "./models/meal.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsModule } from "./../sessions/sessions.module";
import { CategoriesModule } from "./../categories/categories.module";

@Module({
    imports: [TypeOrmModule.forFeature([Meal]), SessionsModule, CategoriesModule],
    controllers: [MealsController],
    providers: [MealsService],
})
export class MealsModule {}
