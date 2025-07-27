import { PartialType } from '@nestjs/swagger';
import { CreateReservaDto } from './create-reserva.dto';
import { Transform } from 'class-transformer';
import { IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { EstadoReserva } from 'src/common/enums/estadoReserva.enum';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    @IsOptional()
    @Min(1)
    cantidadPersonas: number

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    totalPago: number

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsOptional()
    fecha: Date

    @Transform(({ value }) => typeof value === 'string' ? value.trim(): value)
    @IsString()
    @IsOptional()
    @IsEnum(EstadoReserva, { message: "El estado ingresado no es valido"})
    estado: string
}
