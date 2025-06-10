import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './models/Permissions.model';
import { Role } from './models/Role.model';

@Module({
    imports: [TypeOrmModule.forFeature([Permission, Role])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
