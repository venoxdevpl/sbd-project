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
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { SessionGuard } from "./../sessions/session.guard";
import { Permissions, PermissionsFlags } from "./../sessions/session.decorator";

@Controller("companies")
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_CREATE)
    public async create(@Body() body: CreateCompanyDto) {
        return await this.companiesService.create(body);
    }

    @Get()
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_READ)
    public async findAll(@Query("count") count: number = 25, @Query("page") page: number = 0) {
        return await this.companiesService.findAll({
            count,
            page,
        });
    }

    @Get(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_READ)
    public async findOne(@Param("id") id: number) {
        return await this.companiesService.findOne(id);
    }

    @Patch(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_UPDATE)
    public async update(@Param("id") id: number, @Body() body: UpdateCompanyDto) {
        return await this.companiesService.update(id, body);
    }

    @Delete(":id")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_DELETE)
    public async remove(@Param("id") id: number) {
        return await this.companiesService.remove(id);
    }

    @Get(":id/users")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.COMPANIES_READ, PermissionsFlags.USERS_READ)
    public async users(@Param("id") id: number) {
        return await this.companiesService.users(id);
    }
}
