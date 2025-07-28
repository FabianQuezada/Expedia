import { IsDate } from "class-validator";

export class CreateReprogramacionDto {
    @IsDate()
    nuevaFecha: Date;
}
