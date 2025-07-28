import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateProveedorDto {
  @IsOptional()
  @IsString()
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  numeroTelefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contraseña?: string;
}