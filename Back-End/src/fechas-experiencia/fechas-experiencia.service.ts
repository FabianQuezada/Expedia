import { Injectable } from '@nestjs/common';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';

@Injectable()
export class FechasExperienciaService {
  create(createFechasExperienciaDto: CreateFechasExperienciaDto) {
    return 'This action adds a new fechasExperiencia';
  }

  findAll() {
    return `This action returns all fechasExperiencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fechasExperiencia`;
  }

  update(id: number, updateFechasExperienciaDto: UpdateFechasExperienciaDto) {
    return `This action updates a #${id} fechasExperiencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} fechasExperiencia`;
  }
}
