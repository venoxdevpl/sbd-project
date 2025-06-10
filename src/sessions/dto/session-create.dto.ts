import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateSessionDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    // @IsStrongPassword({
    //     minLength: 10,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //     minUppercase: 1,
    // })
    password: string;
}
