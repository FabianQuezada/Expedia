import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombre: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    apellido: string;
    
    @IsEmail()
    correo: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contraseña: string;
}
