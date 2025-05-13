import { Injectable } from '@nestjs/common';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';

@Injectable()
export class ExperienciaService {
  create(createExperienciaDto: CreateExperienciaDto) {
    return 'This action adds a new experiencia';
  }

  findAll() {
    return `This action returns all experiencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experiencia`;
  }

  update(id: number, updateExperienciaDto: UpdateExperienciaDto) {
    return `This action updates a #${id} experiencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} experiencia`;
  }
}
