import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiencia } from './entities/experiencia.entity';
import { Imagen } from '../imagen/entities/imagen.entity';
import { ImagenService } from 'src/imagen/imagen.service';
import { FechasExperienciaService } from 'src/fechas-experiencia/fechas-experiencia.service';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { Resena } from 'src/resena/entities/resena.entity';
import { ExperienciaResponseDto } from './dto/salida-experiencia.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ExperienciaService {
  constructor(
    @InjectRepository(Experiencia)
    private experienciaRepository: Repository<Experiencia>,
    private imagenService: ImagenService,
    private fechasExperienciaService: FechasExperienciaService,
    @InjectRepository(Resena)
    private resenaRepository: Repository<Resena>,

    @InjectRepository(Imagen) // 👈 ¡esto es lo que falta!
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  async create(data: CreateExperienciaDto & { idProveedor: number }) {
    const {
      imagenes,
      idCaracteristicas,
      fechas,
      categoria,
      ...experienciaData
    } = data;

    const experiencia = await this.experienciaRepository.save({
      ...experienciaData,
      categoria,
      idProveedor: data.idProveedor,
      caracteristicas:
        idCaracteristicas?.map((id) => ({ idCaracteristica: id })) || [],
    });

    await this.imagenService.agregarImagenes(
      experiencia.idExperiencia,
      imagenes,
    );
    await this.fechasExperienciaService.agregarFechas(
      experiencia.idExperiencia,
      fechas,
    );

    return this.experienciaRepository.findOne({
      where: { idExperiencia: experiencia.idExperiencia },
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });
  }

  async findByProveedor(idProveedor: number) {
    const experiencias = await this.experienciaRepository.find({
      where: { idProveedor },
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });

    if (!experiencias.length) {
      throw new NotFoundException(
        `El proveedor con ID ${idProveedor} no tiene experiencias registradas.`,
      );
    }

    return experiencias;
  }

  async verificarPropietario(idExperiencia: number, idProveedor: number) {
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia },
      relations: ['proveedor'],
    });

    if (!experiencia) {
      throw new NotFoundException('Experiencia no encontrada');
    }

    if (experiencia.idProveedor !== idProveedor) {
      throw new ForbiddenException(
        'No tienes permisos para modificar esta experiencia',
      );
    }

    return true;
  }

  async findAll(): Promise<ExperienciaResponseDto[]> {
    const experiencias = await this.experienciaRepository.find({
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });

    const resultados: ExperienciaResponseDto[] = [];
    for (const exp of experiencias) {
      const result = await this.resenaRepository
        .createQueryBuilder('resena')
        .select('AVG(resena.puntuacion)', 'avg')
        .where('resena.idExperiencia = :id', { id: exp.idExperiencia })
        .getRawOne();

      const puntuacionPromedio = parseFloat(result.avg) || 0;

      resultados.push(
        plainToInstance(ExperienciaResponseDto, {
          ...exp,
          puntuacionPromedio: parseFloat(puntuacionPromedio.toFixed(1)),
        }),
      );
    }

    return resultados;
  }

  async findOne(id: number): Promise<ExperienciaResponseDto> {
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia: id },
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });

    if (!experiencia) {
      throw new NotFoundException('Experiencia no encontrada');
    }

    const result = await this.resenaRepository
      .createQueryBuilder('resena')
      .select('AVG(resena.puntuacion)', 'avg')
      .where('resena.idExperiencia = :id', { id })
      .getRawOne();

    const puntuacionPromedio = parseFloat(result.avg) || 0;

    return plainToInstance(ExperienciaResponseDto, {
      ...experiencia,
      puntuacionPromedio: parseFloat(puntuacionPromedio.toFixed(1)),
    });
  }
  async update(id: number, dto: UpdateExperienciaDto) {
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia: id },
      relations: ['imagenes'],
    });

    if (!experiencia) {
      throw new NotFoundException(`Experiencia #${id} no encontrada`);
    }

    if (dto.imagenes?.length) {
      // Borrar imágenes asociadas
      await this.imagenRepository
        .createQueryBuilder()
        .delete()
        .where('ID_Experiencia = :id', { id })
        .execute();

      // Crear nuevas imágenes relacionadas correctamente
      const nuevasImagenes = dto.imagenes.map((img) =>
        this.imagenRepository.create({
          url: img.url,
          experiencia: { idExperiencia: id },
        }),
      );

      await this.imagenRepository.save(nuevasImagenes);
    }

    const experienciaActualizada = this.experienciaRepository.merge(
      experiencia,
      dto,
    );
    await this.experienciaRepository.save(experienciaActualizada);

    const experienciaConImagenes = await this.experienciaRepository.findOne({
      where: { idExperiencia: id },
      relations: ['imagenes'],
    });

    return {
      message: `Experiencia #${id} actualizada correctamente`,
      data: experienciaConImagenes,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} experiencia`;
  }
  async getCaracteristicasPorExperiencia(
    id: number,
  ): Promise<Caracteristica[]> {
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia: id },
      relations: ['caracteristicas'],
    });

    if (!experiencia) {
      throw new NotFoundException('Experiencia no encontrada');
    }

    return experiencia.caracteristicas;
  }
  async contarResenasPorExperiencia(idExperiencia: number): Promise<number> {
    return this.resenaRepository.count({ where: { idExperiencia } });
  }
}
