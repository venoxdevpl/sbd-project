import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/session-create.dto";
import { SessionDestoryDto } from "./dto/session-destroy.dto";
import { Permissions, PermissionsFlags } from "./session.decorator";
import { SessionGuard } from "./session.guard";

@Controller("sessions")
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    public async create(@Body() body: CreateSessionDto) {
        return await this.sessionsService.create(body);
    }

    @Post("/destroy")
    @UseGuards(SessionGuard)
    @Permissions(PermissionsFlags.SESSIONS_DELETE)
    public async destroy(@Body() body: SessionDestoryDto) {
        return await this.sessionsService.destroy(body);
    }
}
