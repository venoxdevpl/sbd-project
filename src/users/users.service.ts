import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    public async seeder() {
        const adminUser = new User();

        adminUser.name = 'Kamil Testowy';
        adminUser.email = 'admin@venox.dev';
        await adminUser.setPassword('admin123!');

        await this.usersRepository.save(adminUser);
    }
}
