import { NestFactory } from "@nestjs/core";
import { AppModule } from "./../src/app.module";
import { UsersService } from "../src/users/users.service";
import { RolesService } from "./../src/roles/roles.service";
import { AllergensService } from "./../src/allergens/allergens.service";
import { CategoriesService } from "./../src/categories/categories.service";
import { CompaniesService } from "./../src/companies/companies.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const roles = app.get(RolesService);
    await roles.seeder();

    const users = app.get(UsersService);
    await users.seeder();

    const allergens = app.get(AllergensService);
    await allergens.seeder();

    const categories = app.get(CategoriesService);
    await categories.seeder();

    const companies = app.get(CompaniesService);
    await companies.seeder();

    await app.close();
}

bootstrap().then(() => "Seeding completed.");
