import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from "@nestjs/common";
import { AllergensService } from "./allergens.service";
import { CreateAllergenDto } from "./dto/create-allergen.dto";
import { UpdateAllergenDto } from "./dto/update-allergen.dto";
import { SessionGuard } from "src/sessions/session.guard";
import { Permissions, PermissionsFlags } from "src/sessions/session.decorator";

@Controller("allergens")
export class AllergensController {
    constructor(private readonly allergensService: AllergensService) {}

    @Post()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.ALLERGENS_CREATE)
    public async create(@Body() body: CreateAllergenDto) {
        return await this.allergensService.create(body);
    }

    @Get()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.ALLERGENS_READ)
    public async findAll(@Query("count") count: number = 25, @Query("page") page: number = 1) {
        return await this.allergensService.findAll({
            count,
            page,
        });
    }

    @Get(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.ALLERGENS_READ)
    public async findOne(@Param("id") id: number) {
        return await this.allergensService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAllergenDto: UpdateAllergenDto) {
        return this.allergensService.update(+id, updateAllergenDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.allergensService.remove(+id);
    }
}
