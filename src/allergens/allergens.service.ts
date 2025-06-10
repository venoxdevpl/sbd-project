import { Injectable } from "@nestjs/common";
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
        return `This action returns all allergens`;
    }

    public async findOne(id: number) {
        return await this.allergensRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }

    update(id: number, updateAllergenDto: UpdateAllergenDto) {
        return `This action updates a #${id} allergen`;
    }

    remove(id: number) {
        return `This action removes a #${id} allergen`;
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
