import { IsDate, IsNumber, Min } from 'class-validator';

export class FechaExperienciaDto {
    @IsDate()
    fecha: Date;

    @IsNumber()
    @Min(100)
    precio: number;
}
