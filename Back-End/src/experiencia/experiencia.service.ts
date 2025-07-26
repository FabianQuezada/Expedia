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
import { ImagenService } from 'src/imagen/imagen.service';
import { FechasExperienciaService } from 'src/fechas-experiencia/fechas-experiencia.service';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';

@Injectable()
export class ExperienciaService {
  constructor(
    @InjectRepository(Experiencia)
    private experienciaRepository: Repository<Experiencia>,
    private imagenService: ImagenService,
    private fechasExperienciaService: FechasExperienciaService,
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

  async findAll() {
    return this.experienciaRepository.find({
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });
  }

  async findOne(id: number) {
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia: id },
      relations: ['imagenes', 'caracteristicas', 'fechasExperiencias'],
    });

    if (!experiencia) {
      throw new NotFoundException(`No se encontró la experiencia con ID ${id}`);
    }

    return experiencia;
  }

  update(id: number, updateExperienciaDto: UpdateExperienciaDto) {
    return `This action updates a #${id} experiencia`;
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
}
