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
import { MealsService } from "./meals.service";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
import { SessionGuard } from "./../sessions/session.guard";
import { Permissions, PermissionsFlags } from "./../sessions/session.decorator";

@Controller("meals")
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Post()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.MEALS_CREATE)
    public async create(@Body() body: CreateMealDto) {
        return this.mealsService.create(body);
    }

    @Get()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.MEALS_READ)
    public async findAll(@Query("count") count: number = 25, @Query("page") page: number = 0) {
        return this.mealsService.findAll({ count, page });
    }

    @Get(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.MEALS_READ)
    public async findOne(@Param("id") id: number) {
        return this.mealsService.findOne(id);
    }

    @Patch(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.MEALS_UPDATE)
    public async update(@Param("id") id: number, @Body() body: UpdateMealDto) {
        return this.mealsService.update(id, body);
    }

    @Delete(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.MEALS_DELETE)
    public async remove(@Param("id") id: number) {
        return this.mealsService.remove(id);
    }
}
