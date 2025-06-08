import { IsDate, IsNumber, Min } from "class-validator";

export class CreateFechasExperienciaDto {
    @IsDate()
    fecha: Date;

    @IsNumber()
    @Min(100)
    precio: number;
}
