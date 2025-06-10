import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "./models/company.model";
import faker, { fakerPL } from "@faker-js/faker";

@Injectable()
export class CompaniesService {
    constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

    public async create(data: CreateCompanyDto) {
        const company = new Company();

        company.name = data.name;
        company.address = data.address;

        return await this.companyRepository.save(company);
    }

    public async findAll(query: { count: number; page: number }) {
        return await this.companyRepository.findAndCount({
            take: query.count,
            skip: query.page,
        });
    }

    public async findOne(id: number) {
        const company = await this.companyRepository.findOne({
            where: {
                id,
            },
        });

        if (!company) {
            throw new NotFoundException("Company not found.");
        }

        return company;
    }

    public async update(id: number, data: UpdateCompanyDto) {
        const company = await this.findOne(id);

        company.name = data.name ?? company.name;
        company.address = data.address ?? company.address;

        return await this.companyRepository.save(company);
    }

    public async remove(id: number) {
        const company = await this.findOne(id);

        return await this.companyRepository.remove(company);
    }

    public async users(id: number) {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: {
                users: true,
            },
        });

        if (!company) {
            throw new NotFoundException("Company not found.");
        }

        return company;
    }

    public async seeder() {
        const cm = new faker.CompanyModule(fakerPL);
        const am = new faker.LocationModule(fakerPL);
        for (let i = 0; i < 100; i++) {
            const company = new Company();
            company.name = cm.name();
            company.address = am.streetAddress({ useFullAddress: true });

            await this.companyRepository.save(company);
        }
    }
}
