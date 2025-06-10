import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Meal } from './models/meal.model';

@Module({
    imports: [Meal],
    controllers: [MealsController],
    providers: [MealsService],
})
export class MealsModule {}
