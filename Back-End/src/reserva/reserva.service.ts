import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository, Raw } from 'typeorm';
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
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    const { cantidadPersonas, totalPago, fecha, idUsuario, idExperiencia } =
      createReservaDto;

    // 1. Validar usuario
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }

    // 2. Validar experiencia
    const experiencia = await this.experienciaRepository.findOne({
      where: { idExperiencia },
    });
    if (!experiencia) {
      throw new NotFoundException(
        `Experiencia con ID ${idExperiencia} no encontrada`,
      );
    }

    // 3. Validar que la combinación fecha + experiencia exista
    const fechaFormateada = fecha.toISOString().split('T')[0];

    const fechaExperiencia = await this.fechasExperienciaRepository.findOne({
      where: {
        fecha: Raw((alias) => `${alias} = DATE(:fecha)`, {
          fecha: fechaFormateada,
        }),
        idExperiencia,
      },
    });

    if (!fechaExperiencia) {
      throw new NotFoundException(
        'La fecha seleccionada no está disponible para esta experiencia',
      );
    }
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // 4. Crear reserva
    fecha.setHours(0, 0, 0, 0); // normalizar hora a 00:00:00
    const reserva = this.reservaRepository.create({
      cantidadPersonas,
      totalPago,
      fecha: fechaFormateada,
      fechaReserva: hoy, 
      idUsuario,
      idExperiencia,
    });

    await this.reservaRepository.insert(reserva);
    return reserva;
  }
  async findAll() {
    return await this.reservaRepository.find();
  }

  async findOne(idReserva: number) {
    return await this.reservaRepository.findOneBy({ idReserva });
  }

  async update(
    idReserva: number,
    idUsuario: number,
    updateReservaDto: UpdateReservaDto,
  ) {
    return await this.reservaRepository.update(
      { idReserva, idUsuario },
      updateReservaDto,
    );
  }

  async remove(idReserva: number, idUsuario: number) {
    return this.reservaRepository.softDelete({ idReserva, idUsuario });
  }
}
