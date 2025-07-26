import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class CreateReservaDto { 
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    @IsPositive()
    cantidadPersonas: number

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    @IsPositive()
    totalPago: number

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    fecha: Date

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    idUsuario: number

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    idExperiencia: number
}
