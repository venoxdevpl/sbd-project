import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 10, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
    password: string;
}
