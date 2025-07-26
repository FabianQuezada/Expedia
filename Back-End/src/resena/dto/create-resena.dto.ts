import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateResenaDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    puntuacion: number;

    @IsString()
    @IsNotEmpty()
    comentario: string;
}
