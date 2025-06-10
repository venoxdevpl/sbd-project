import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAllergenDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    name: string;
}
