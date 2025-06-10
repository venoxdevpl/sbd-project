import { NestFactory } from '@nestjs/core';
import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { RolesService } from './../src/roles/roles.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const roles = app.get(RolesService);
    await roles.seeder();

    const users = app.get(UsersService);
    await users.seeder();

    await app.close();
}

bootstrap().then(() => 'Seeding completed.');
