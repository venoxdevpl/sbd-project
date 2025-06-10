import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/models/user.model';
import { Permission } from './roles/models/Permissions';
import { Role } from './roles/models/Role';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Permission, Role, User],
        }),
        UsersModule,
        CompaniesModule,
        RolesModule,
    ],
})
export class AppModule {}
