import { PartialType } from '@nestjs/swagger';
import { CreateFechasExperienciaDto } from './create-fechas-experiencia.dto';

export class UpdateFechasExperienciaDto extends PartialType(CreateFechasExperienciaDto) {}
