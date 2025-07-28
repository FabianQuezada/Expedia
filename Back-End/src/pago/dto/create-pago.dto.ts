import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsIn
} from 'class-validator';
import { MetodoPago } from 'src/common/enums/metodoPago.enum';

export class CreatePagoDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @IsIn(['credito', 'debito', 'paypal'], {
    message: 'El método de pago debe ser "credito", "debito" o "paypal"',
  })
  metodo: string;
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNumber()
  @IsPositive()
  monto: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNumber()
  idReserva: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNumber()
  idUsuario: number;
}
