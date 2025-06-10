import { Module } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { SessionsController } from "./sessions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "./models/Session.model";
import { User } from "./../users/models/user.model";
import { Role } from "./../roles/models/Role.model";
import { UsersModule } from "./../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Session, User, Role]), UsersModule],
    controllers: [SessionsController],
    providers: [SessionsService],
    exports: [SessionsService],
})
export class SessionsModule {}
