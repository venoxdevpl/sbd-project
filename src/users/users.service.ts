import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user.model";
import { Repository } from "typeorm";
import { Role } from "./../roles/models/Role.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    public async findByEmail(email: string, withRolePermissions: boolean = false) {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
            relations: {
                role: {
                    permissions: true,
                },
            },
        });
    }

    public async seeder() {
        const adminUser = new User();

        adminUser.name = "Kamil Testowy";
        adminUser.email = "admin@venox.dev";

        const rootRole = await this.roleRepository.findOne({
            where: {
                id: 1,
            },
        });

        if (!rootRole) {
            console.log("missing administration role to seeding users accounts.");
            return;
        }

        adminUser.role = rootRole;

        await adminUser.setPassword("admin123!");

        await this.usersRepository.save(adminUser);
    }
}
