import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user.model";
import { Repository } from "typeorm";
import { Role } from "./../roles/models/Role.model";
import { CreateUserDto } from "./dto/create-user.dto";

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

    public async create(data: CreateUserDto) {
        const emailExists = await this.findByEmail(data.email);

        if (emailExists) {
            throw new BadRequestException("User's email already exists.");
        }

        const user = new User();

        user.name = data.name;
        user.email = data.email;
        user.setPassword(data.password);

        return await this.usersRepository.save(user);
    }

    public async findById(id: number) {
        return await this.usersRepository.findOneBy({
            id,
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
