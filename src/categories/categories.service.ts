import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./model/category.model";
import { Repository } from "typeorm";
import faker, { fakerPL } from "@faker-js/faker";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    public async create(data: CreateCategoryDto) {
        const category = new Category();

        category.name = data.name;

        return await this.categoryRepository.save(category);
    }

    public async findAll(query: { count: number; page: number }) {
        return await this.categoryRepository.findAndCount({
            take: query.count,
            skip: query.page,
        });
    }

    public async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundException("Category not found.");
        }

        return category;
    }

    public async update(id: number, data: UpdateCategoryDto) {
        const category = await this.findOne(id);

        category.name = data.name ?? category.name;

        return await this.categoryRepository.save(category);
    }

    public async remove(id: number) {
        const category = await this.findOne(id);

        if (!category) {
            throw new NotFoundException("Category not found");
        }

        return await this.categoryRepository.remove(category);
    }

    public async seeder() {
        const fm = new faker.FoodModule(fakerPL);
        for (let i = 0; i < 10; i++) {
            const cat = new Category();
            cat.name = fm.ethnicCategory();

            await this.categoryRepository.save(cat);
        }
    }
}
