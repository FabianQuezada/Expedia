import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FechasExperiencia } from './entities/fechas-experiencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FechasExperienciaService {
  constructor(
    @InjectRepository(FechasExperiencia)
    private readonly fechasRepository: Repository<FechasExperiencia>,
  ) {}

  async agregarFechas(idExperiencia: number, createFechasExperienciaDto: CreateFechasExperienciaDto[]) {
    if (!createFechasExperienciaDto?.length) throw new BadRequestException('Debes enviar al menos una fecha');

    const nuevasFechas = createFechasExperienciaDto.map(f =>
      this.fechasRepository.create({
        fecha: f.fecha,
        precio: f.precio,
        idExperiencia,
      }),
    );
    const resultado = await this.fechasRepository.save(nuevasFechas);
    return resultado;
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
