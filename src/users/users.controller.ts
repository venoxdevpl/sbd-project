import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SessionGuard } from "src/sessions/session.guard";
import { Permissions, PermissionsFlags } from "src/sessions/session.decorator";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    // ? @UseGuards(SessionGuard) umożliwiamy rejestrację użytkownika z poziomu autoryzacji guest
    // @Permissions(PermissionsFlags.USER)
    public async create(@Body() body: CreateUserDto) {
        return await this.usersService.create(body);
    }

    @Get("/:id")
    public async find(@Param() id: number) {
        return await this.usersService.findById(id);
    }
}
