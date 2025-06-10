import { Module } from "@nestjs/common";
import { AllergensService } from "./allergens.service";
import { AllergensController } from "./allergens.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Allergen } from "./models/allergen.models";
import { SessionsModule } from "./../sessions/sessions.module";

@Module({
    imports: [TypeOrmModule.forFeature([Allergen]), SessionsModule],
    controllers: [AllergensController],
    providers: [AllergensService],
})
export class AllergensModule {}
