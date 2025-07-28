import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCancelacionDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    motivo: string;
}
