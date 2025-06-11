import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Meal } from "./models/meal.model";
import { Repository } from "typeorm";
import { CategoriesService } from "./../categories/categories.service";

@Injectable()
export class MealsService {
    constructor(
        @InjectRepository(Meal) private mealRepository: Repository<Meal>,
        private readonly categoryService: CategoriesService,
    ) {}

    public async create(data: CreateMealDto) {
        const meal = new Meal();
        const category = await this.categoryService.findOne(data.category);

        meal.name = data.name;
        meal.description = data.description;
        meal.category = category;

        return await this.mealRepository.save(meal);
    }

    public async findAll(query: { count: number; page: number }) {
        return await this.mealRepository.findAndCount({
            take: query.count,
            skip: query.page,
        });
    }

    public async findOne(id: number) {
        const meal = await this.mealRepository.findOne({
            where: { id },
            relations: {
                allergens: true,
            },
        });

        if (!meal) {
            throw new NotFoundException("Meal not found.");
        }

        return meal;
    }

    public async update(id: number, data: UpdateMealDto) {
        const meal = await this.findOne(id);

        if (data.category) {
            meal.category = await this.categoryService.findOne(data.category);
        }

        meal.name = data.name ?? meal.name;
        meal.description = data.description ?? meal.description;

        return await this.mealRepository.save(meal);
    }

    public async remove(id: number) {
        const meal = await this.findOne(id);

        return await this.mealRepository.remove(meal);
    }
}
