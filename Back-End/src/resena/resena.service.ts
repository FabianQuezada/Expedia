import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { Repository } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { EstadoReserva } from 'src/common/enums/estadoReserva.enum';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(idReserva: number, createResenaDto: CreateResenaDto, idUsuario: number) {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: ['fechasExperiencia', 'fechasExperiencia.idExperiencia2'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }
    
    if (reserva.idUsuario !== idUsuario) {
        throw new UnauthorizedException('No tienes permisos para reseñar esta reserva');
    }

    if (reserva.estado !== EstadoReserva.FINALIZADA) {
      throw new BadRequestException('Solo se pueden reseñar reservas finalizadas');
    }

    const idExperiencia = reserva.fechasExperiencia?.idExperiencia2?.idExperiencia;

    if (!idExperiencia) {
      throw new NotFoundException('Experiencia asociada no encontrada');
    }

    const resenaExistente = await this.resenaRepository.findOne({
      where: {
        idUsuario,
        idExperiencia,
      },
    });

    if (resenaExistente) {
      throw new BadRequestException('Ya has dejado una reseña para esta reserva');
    }

    const nuevaResena = this.resenaRepository.create({
      idUsuario,
      puntuacion: createResenaDto.puntuacion,
      comentario: createResenaDto.comentario,
      fecha: new Date(),
      idExperiencia,
    });

    return await this.resenaRepository.save(nuevaResena);
  }

  findAll() {
    return `This action returns all reseña`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reseña`;
  }

  update(id: number, updateResenaDto: UpdateResenaDto) {
    return `This action updates a #${id} reseña`;
  }

  remove(id: number) {
    return `This action removes a #${id} reseña`;
  }
}
