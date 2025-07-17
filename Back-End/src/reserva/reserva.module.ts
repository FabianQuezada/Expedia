import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Experiencia } from 'src/experiencia/entities/experiencia.entity';
import { Reserva } from './entities/reserva.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FechasExperiencia } from 'src/fechas-experiencia/entities/fechas-experiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Usuario, Experiencia, FechasExperiencia])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
