import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePagoDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    metodo: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    @IsPositive()
    monto: number;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    idReserva: number;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    idUsuario: number;
}