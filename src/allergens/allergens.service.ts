import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAllergenDto } from "./dto/create-allergen.dto";
import { UpdateAllergenDto } from "./dto/update-allergen.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Allergen } from "./models/allergen.models";
import { Repository } from "typeorm";
import faker from "@faker-js/faker";

@Injectable()
export class AllergensService {
    constructor(@InjectRepository(Allergen) private allergensRepository: Repository<Allergen>) {}

    public async create(data: CreateAllergenDto) {
        return await this.allergensRepository.save(
            this.allergensRepository.create({
                name: data.name,
            }),
        );
    }

    public async findAll(query: { count: number; page: number }) {
        return await this.allergensRepository.findAndCount({
            take: query.count,
            skip: query.page,
        });
    }

    public async findOne(id: number) {
        return await this.allergensRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }

    public async update(id: number, data: UpdateAllergenDto) {
        const allergen = await this.allergensRepository.findOne({ where: { id } });

        if (!allergen) {
            throw new NotFoundException("Allergen not found.");
        }

        allergen.name = data.name ?? allergen.name;
        return await this.allergensRepository.save(allergen);
    }

    async remove(id: number) {
        const allergen = await this.allergensRepository.findOne({ where: { id } });

        if (!allergen) {
            throw new NotFoundException("Allergen not found.");
        }

        return await this.allergensRepository.delete(allergen);
    }

    public async seeder() {
        const allergens = [
            "gluten",
            "orzeszki ziemne",
            "soja",
            "laktoza",
            "jaja",
            "ryby",
            "skorupiaki",
            "seler",
            "gorczyca",
            "sezam",
            "łubin",
            "dwutlenek siarki",
        ];

        for (let i = 0; i < allergens.length; i++) {
            const allergen = new Allergen();

            allergen.name = allergens[i];

            await this.allergensRepository.save(allergen);
        }
    }
}
