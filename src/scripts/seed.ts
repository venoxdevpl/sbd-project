import { NestFactory } from '@nestjs/core';
import { AppModule } from './../app.module';
import { UsersService } from './../users/users.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const service = app.get(UsersService);

    await service.seeder();

    await app.close();
}

bootstrap().then(() => 'Seeding completed.');
