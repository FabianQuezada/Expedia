import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Experiencia } from 'src/experiencia/entities/experiencia.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { FechasExperiencia } from 'src/fechas-experiencia/entities/fechas-experiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Experiencia, Usuario, FechasExperiencia])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [TypeOrmModule],
})
export class ReservaModule {}
