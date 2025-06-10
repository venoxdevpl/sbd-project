import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { SessionsService } from "./sessions.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { PermissionsFlags } from "./session.decorator";

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(
        private readonly sessionsService: SessionsService,
        private readonly jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest() as Request;
        const token = request.headers.authorization;

        if (!token) {
            return false;
        }

        const [_, access_token] = token.split(" ");

        try {
            const pwd = await this.jwtService.verifyAsync(access_token);
            const session = await this.sessionsService.findByAccessToken(access_token);

            await this.sessionsService.updateLastActivity(access_token);

            const requiredPerms = this.reflector.getAllAndOverride<PermissionsFlags[]>(
                "PERMISSIONS_KEY",
                [context.getHandler(), context.getClass()],
            );

            if (!requiredPerms) {
                return true;
            }
            console.log(requiredPerms, session.user.role.permissions);
            for (const rp of requiredPerms) {
                const exists = session.user.role.permissions.find((r) => {
                    return r.key == "*.*" || rp == r.key;
                });

                if (exists) {
                    return true;
                }
            }

            return false;
        } catch {
            return false;
        }
    }
}
