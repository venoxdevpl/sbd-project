import { readFileSync } from "fs";
import { resolve } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { CompaniesModule } from "./companies/companies.module";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/models/user.model";
import { Permission } from "./roles/models/Permissions.model";
import { Role } from "./roles/models/Role.model";
import { SessionsModule } from "./sessions/sessions.module";
import { Session } from "./sessions/models/Session.model";
import { Company } from "./companies/models/company.model";
import { MealsModule } from "./meals/meals.module";
import { Meal } from "./meals/models/meal.model";
import { AllergensModule } from "./allergens/allergens.module";
import { Allergen } from "./allergens/models/allergen.models";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/model/category.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/model/order.model";
import { OrderContent } from "./orders/model/content.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [
                Permission,
                Role,
                User,
                Session,
                Company,
                Meal,
                Allergen,
                Category,
                Order,
                OrderContent,
            ],
        }),
        JwtModule.register({
            global: true,
            privateKey: readFileSync(resolve(__dirname, "./../../private.key"), "utf-8"),
            publicKey: readFileSync(resolve(__dirname, "./../../public.key"), "utf-8"),
            signOptions: { algorithm: "RS256", expiresIn: "15m" },
        }),
        UsersModule,
        CompaniesModule,
        RolesModule,
        SessionsModule,
        MealsModule,
        AllergensModule,
        CategoriesModule,
        OrdersModule,
    ],
})
export class AppModule {}
