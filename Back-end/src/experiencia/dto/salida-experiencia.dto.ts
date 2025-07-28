import { Expose, Type } from 'class-transformer';
import { Imagen } from 'src/imagen/entities/imagen.entity';
import { FechasExperiencia } from 'src/fechas-experiencia/entities/fechas-experiencia.entity';
import { CategoriaExperiencia } from 'src/common/enums/categoriaExperiencia.enum';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';

export class ExperienciaResponseDto {
  @Expose()
  idExperiencia: number;

  @Expose()
  titulo: string;

  @Expose()
  descripcion: string;

  @Expose()
  ubicacion: string;

  @Expose()
  estado: string;

  @Expose()
  categoria: CategoriaExperiencia;

  @Expose()
  cuposDisponibles: number;

  @Expose()
  datosGenerales: string[];

  @Expose()
  puntuacionPromedio: number;

  @Expose()
  @Type(() => Imagen)
  imagenes: Imagen[];

  @Expose()
  @Type(() => FechasExperiencia)
  fechasExperiencias: FechasExperiencia[];

  @Expose()
  @Type(() => Caracteristica)
  caracteristicas: Caracteristica[];
}