import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(256)
    address: string;
}
