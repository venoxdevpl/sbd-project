import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "./models/Session.model";
import { Repository } from "typeorm";
import { UsersService } from "./../users/users.service";
import { CreateSessionDto } from "./dto/session-create.dto";
import { JwtService } from "@nestjs/jwt";
import { SessionDestoryDto } from "./dto/session-destroy.dto";

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    public async create(data: CreateSessionDto) {
        const user = await this.usersService.findByEmail(data.email, true);

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        const pwd = await user.passwordChallenge(data.password);

        if (!pwd) {
            throw new ForbiddenException("User's password is incorrect.");
        }

        const access_token = await this.jwtService.signAsync({
            userId: user.id,
            email: user.email,
        });

        const refresh_token = await this.jwtService.signAsync(
            {
                userId: user.id,
                email: user.email,
            },
            {
                expiresIn: "30m",
            },
        );

        const session = new Session();

        session.invalided = false;
        session.access_token = access_token;
        session.refresh_token = refresh_token;
        session.user = user;
        session.lastActivity = Date.now();

        await this.sessionRepository.save(session);

        return {
            access_token,
            refresh_token,
        };
    }

    public async findByAccessToken(access_token: string) {
        const session = await this.sessionRepository.findOne({
            where: {
                access_token,
            },
            relations: {
                user: {
                    role: {
                        permissions: true,
                    },
                },
            },
        });

        if (!session) {
            throw new NotFoundException("Session not found.");
        }

        if (session.invalided) {
            throw new BadRequestException("Session is invalided.");
        }

        return session;
    }

    public async destroy(data: SessionDestoryDto) {
        const session = await this.findByAccessToken(data.access_token);

        if (session.refresh_token != data.refresh_token) {
            throw new BadRequestException("Session's refresh_token mismatch.");
        }

        session.invalided = true;

        await this.sessionRepository.save(session);

        return;
    }

    public async updateLastActivity(access_token: string) {
        const session = await this.findByAccessToken(access_token);

        session.lastActivity = Date.now();

        await this.sessionRepository.save(session);

        return;
    }
}
