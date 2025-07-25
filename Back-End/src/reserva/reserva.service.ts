import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Experiencia } from 'src/experiencia/entities/experiencia.entity';
import { FechasExperiencia } from 'src/fechas-experiencia/entities/fechas-experiencia.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Experiencia)
    private readonly experienciaRepository: Repository<Experiencia>,
    @InjectRepository(FechasExperiencia)
    private readonly fechasExperienciaRepository: Repository<FechasExperiencia>,
  ){}

  async create(createReservaDto: CreateReservaDto) {
    const { cantidadPersonas, totalPago, fecha, idUsuario, idExperiencia } = createReservaDto;

    const usuario = this.usuarioRepository.findOne({ where: {idUsuario}});
    if(!usuario) throw new NotFoundException();

    const experiencia = this.experienciaRepository.findOne({ where: {idExperiencia} })
    if(!experiencia) throw new NotFoundException(); 

    const fechaExperiencia = await this.fechasExperienciaRepository.findOne({
      where: {
        fecha: createReservaDto.fecha,
        idExperiencia: createReservaDto.idExperiencia,
      },
    });

    if (!fechaExperiencia) {
      throw new NotFoundException('La fecha seleccionada no está disponible para esta experiencia');
    }

    const reserva = await this.reservaRepository.create({ cantidadPersonas, totalPago, fecha, idUsuario, idExperiencia });
    return await this.reservaRepository.save(reserva);
  }

  async findAll() {
    return await this.reservaRepository.find();
  }

  async findOne(idReserva: number) {
    return await this.reservaRepository.findOneBy({ idReserva });
  }

  async update(idReserva: number, idUsuario: number, updateReservaDto: UpdateReservaDto) {
    return await this.reservaRepository.update({idReserva, idUsuario}, updateReservaDto);
  }

  async remove(idReserva: number, idUsuario: number) {
    return this.reservaRepository.softDelete({idReserva, idUsuario});
  }
}
