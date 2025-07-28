import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { ImagenDto } from "./imagen.dto";
import { FechaExperienciaDto } from "./fecha-experiencia.dto";
import { CategoriaExperiencia } from "src/common/enums/categoriaExperiencia.enum";

export class CreateExperienciaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    ubicacion: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase().trim() : value)
    @IsEnum(CategoriaExperiencia, { message: 'La categoría debe ser una opción válida' })
    categoria: CategoriaExperiencia;

    @IsNumber()
    @IsPositive()
    duracion: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    @IsIn([1, 2, 3, 4, 5, 6], { each: true })
    idCaracteristicas: number[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImagenDto)
    @ArrayMinSize(1)
    imagenes: ImagenDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FechaExperienciaDto)
    @ArrayMinSize(1)
    fechas: FechaExperienciaDto[];
}
