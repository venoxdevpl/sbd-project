import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    description: string;

    @IsNotEmpty()
    @IsInt()
    category: number;
}
