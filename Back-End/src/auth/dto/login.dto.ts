import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    @IsEmail() 
    correo: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contraseña: string;
}
