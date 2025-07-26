import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancelacionDto } from './dto/create-cancelacion.dto';
import { UpdateCancelacionDto } from './dto/update-cancelacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancelacion } from './entities/cancelacion.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { EstadoReserva } from 'src/common/enums/estadoReserva.enum';

@Injectable()
export class CancelacionService {
  constructor(
    @InjectRepository(Cancelacion)
    private cancelacionRepository: Repository<Cancelacion>,
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async cancelarReserva(idReserva: number, createCancelacionDto: CreateCancelacionDto) {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: [
        'fechasExperiencia', 'fechasExperiencia.idExperiencia2'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (reserva.estado === EstadoReserva.CANCELADA) {
      throw new BadRequestException('La reserva ya fue cancelada');
    }
    
    const experiencia = reserva.fechasExperiencia?.idExperiencia2;

    if (!experiencia) {
      throw new NotFoundException('No se pudo obtener la experiencia asociada');
    }

    reserva.estado = EstadoReserva.CANCELADA;
    await this.reservaRepository.save(reserva);

    const cancelacion = this.cancelacionRepository.create({
      motivo: createCancelacionDto.motivo,
      fechaCancelacion: new Date(),
      idReserva: reserva.idReserva,
      idUsuario: reserva.idUsuario,
    });

    return await this.cancelacionRepository.save(cancelacion);
  }

  findAll() {
    return `This action returns all cancelacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cancelacion`;
  }

  update(id: number, updateCancelacionDto: UpdateCancelacionDto) {
    return `This action updates a #${id} cancelacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cancelacion`;
  }
}
