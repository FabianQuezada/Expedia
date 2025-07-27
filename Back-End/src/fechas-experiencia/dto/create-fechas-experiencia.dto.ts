import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateFechasExperienciaDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @Min(100)
    precio: number;
}
