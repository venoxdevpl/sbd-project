import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './models/Session.model';

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    controllers: [SessionsController],
    providers: [SessionsService],
})
export class SessionsModule {}
