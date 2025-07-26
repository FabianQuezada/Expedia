import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FechasExperiencia } from './entities/fechas-experiencia.entity';
import { Repository } from 'typeorm';
import { Raw } from 'typeorm'; 

@Injectable()
export class FechasExperienciaService {
  constructor(
    @InjectRepository(FechasExperiencia)
    private readonly fechasRepository: Repository<FechasExperiencia>,
  ) {}

  async agregarFechas(
    idExperiencia: number,
    createFechasExperienciaDto: CreateFechasExperienciaDto[],
  ) {
    const nuevasFechas = createFechasExperienciaDto.map((f) =>
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

  async findOne(
    fecha: Date,
    idExperiencia: number,
  ): Promise<FechasExperiencia | null> {
    const fechaFormateada = fecha.toISOString().split('T')[0]; // convierte a 'YYYY-MM-DD'
    console.log(
      '📅 Buscando:',
      fechaFormateada,
      '🔎 Experiencia:',
      idExperiencia,
    );

    const resultado = await this.fechasRepository.findOne({
      where: {
        fecha: Raw((alias) => `${alias} = DATE(:fecha)`, {
          fecha: fechaFormateada,
        }),
        idExperiencia,
      },
    });

    console.log('🔍 Resultado encontrado:', resultado);
    return resultado;
  }

  update(id: number, updateFechasExperienciaDto: UpdateFechasExperienciaDto) {
    return `This action updates a #${id} fechasExperiencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} fechasExperiencia`;
  }
}
