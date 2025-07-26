import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6)
  contraseña: string;
}
