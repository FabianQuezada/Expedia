import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerPDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    nombreEmpresa: string;
    
    @IsEmail()
    correo: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contraseña: string;
}
