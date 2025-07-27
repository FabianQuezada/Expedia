import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FechasExperiencia } from './entities/fechas-experiencia.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FechasExperienciaService {
  constructor(
    @InjectRepository(FechasExperiencia)
    private readonly fechasRepository: Repository<FechasExperiencia>,
  ) {}

  async agregarFechas(idExperiencia: number, createFechasExperienciaDto: CreateFechasExperienciaDto[]) {

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

  @Cron('*/2 * * * *')
  async aplicarDescuentoMensual() {
    const qb = this.fechasRepository.createQueryBuilder('fe');

    // Subconsulta: contar reservas por fecha
    const subquery = qb
      .subQuery()
      .select('fe_sub.fecha', 'fecha')
      .addSelect('fe_sub.idExperiencia', 'idExperiencia')
      .addSelect('COUNT(r.idReserva)', 'cantidad')
      .from('fechas_experiencia', 'fe_sub')
      .leftJoin('reserva', 'r', 'r.Fecha = fe_sub.fecha AND r.ID_Experiencia = fe_sub.idExperiencia')
      .groupBy('fe_sub.fecha, fe_sub.idExperiencia')
      .getQuery();

    // Obtener mínimo
    const fechasConCantidad = await this.fechasRepository.query(
      `SELECT fecha, idExperiencia, cantidad FROM (${subquery}) AS sub ORDER BY cantidad ASC LIMIT 1`
    );

    if (fechasConCantidad.length === 0) return;

    for (const fecha of fechasConCantidad) {
      await this.fechasRepository.update(
        { fecha: fecha.fecha, idExperiencia: fecha.idExperiencia },
        { descuento: 0.20 }
      );
      console.log('Fechas con menor reserva:', fechasConCantidad);
    }
  }

  async findAllConDescuento() {
    const fechas = await this.fechasRepository.find();
    return fechas.map(f => ({
      ...f,
      precioConDescuento: f.precio * (1 - (f.descuento ?? 0))
    }));
  }

  async findAll() {
    return await this.fechasRepository.find();
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
