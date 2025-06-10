import { Module } from '@nestjs/common';
import { AllergensService } from './allergens.service';
import { AllergensController } from './allergens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from './models/allergen.models';

@Module({
    imports: [TypeOrmModule.forFeature([Allergen])],
    controllers: [AllergensController],
    providers: [AllergensService],
})
export class AllergensModule {}
