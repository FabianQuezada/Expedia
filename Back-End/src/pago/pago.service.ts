import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { MetodoPago } from 'src/common/enums/metodoPago.enum';

@Injectable()
export class PagoService {

  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ){}

  async create(createPagoDto: CreatePagoDto) {
    const { metodo, monto, idReserva, idUsuario } = createPagoDto;

    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const reserva = await this.reservaRepository.findOne({ where: { idReserva } });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');

    const pago = this.pagoRepository.create({ metodo, monto, idUsuario, idReserva });
    return await this.pagoRepository.save(pago);
  }

  async findAll() {
    return await this.pagoRepository.find();
  }

  async findOne(idPago: number) {
    return await this.pagoRepository.findOneBy({idPago});
  }

  async update(idPago: number, updatePagoDto: UpdatePagoDto) {
    return await this.pagoRepository.update(idPago, updatePagoDto);
  }

  async remove(idPago: number) {
    return this.pagoRepository.softDelete(idPago);
  }
}
