import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReprogramacionDto } from './dto/create-reprogramacion.dto';
import { UpdateReprogramacionDto } from './dto/update-reprogramacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reprogramacion } from './entities/reprogramacion.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { EstadoReserva } from 'src/common/enums/estadoReserva.enum';
import { FechasExperiencia } from 'src/fechas-experiencia/entities/fechas-experiencia.entity';

@Injectable()
export class ReprogramacionService {
  constructor(
    @InjectRepository(Reprogramacion)
    private reprogramacionRepository: Repository<Reprogramacion>,
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(FechasExperiencia)
    private fechasExperienciaRepository: Repository<FechasExperiencia>,
  ) {}

  async reprogramarReserva(idReserva: number, createReprogramacionDto: CreateReprogramacionDto) {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: ['fechasExperiencia'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (reserva.estado === EstadoReserva.CANCELADA) {
      throw new BadRequestException('La reserva ya fue cancelada y no se puede reprogramar.');
    }

    if (reserva.estado === EstadoReserva.REPROGRAMADA) {
      throw new BadRequestException('La reserva ya fue reprogramada previamente.');
    }

    const experienciaId = reserva.fechasExperiencia.idExperiencia;

    const nuevaFecha = await this.fechasExperienciaRepository.findOne({
      where: {
        fecha: createReprogramacionDto.nuevaFecha,
        idExperiencia: experienciaId,
      },
    });

    if (!nuevaFecha) {
      throw new NotFoundException('No se encontró la nueva fecha para reprogramar');
    }

    // Actualizar reserva
    reserva.fechasExperiencia = nuevaFecha;
    reserva.estado = EstadoReserva.REPROGRAMADA;
    await this.reservaRepository.save(reserva);

    // Reprogramación
    const reprogramacion = this.reprogramacionRepository.create({
      nuevaFecha: nuevaFecha.fecha,
      idReserva: reserva.idReserva,
      idUsuario: reserva.idUsuario,
    });

    return await this.reprogramacionRepository.save(reprogramacion);
  }

  findAll() {
    return `This action returns all reprogramacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reprogramacion`;
  }

  update(id: number, updateReprogramacionDto: UpdateReprogramacionDto) {
    return `This action updates a #${id} reprogramacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} reprogramacion`;
  }
}
