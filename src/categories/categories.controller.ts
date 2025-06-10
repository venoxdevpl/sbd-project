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
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { SessionGuard } from "./../sessions/session.guard";
import { Permissions, PermissionsFlags } from "./../sessions/session.decorator";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.CATEGORIES_CREATE)
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.CATEGORIES_READ)
    async findAll(@Query("count") count: number = 25, @Query("page") page: number = 0) {
        return await this.categoriesService.findAll({ count, page });
    }

    @Get(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.CATEGORIES_READ)
    async findOne(@Param("id") id: number) {
        return await this.categoriesService.findOne(id);
    }

    @Patch(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.CATEGORIES_UPDATE)
    async update(@Param("id") id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return await this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.CATEGORIES_DELETE)
    async remove(@Param("id") id: number) {
        return await this.categoriesService.remove(id);
    }
}
