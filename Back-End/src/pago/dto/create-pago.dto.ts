import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { MetodoPago } from "src/common/enums/metodoPago.enum";

export class CreatePagoDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    @IsEnum(MetodoPago, { message: "El método ingresado no es valido"})
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