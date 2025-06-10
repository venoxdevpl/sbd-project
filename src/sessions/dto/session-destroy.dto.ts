import { IsJWT, IsNotEmpty } from "class-validator";

export class SessionDestoryDto {
    @IsNotEmpty()
    @IsJWT()
    access_token: string;

    @IsNotEmpty()
    @IsJWT()
    refresh_token: string;
}
