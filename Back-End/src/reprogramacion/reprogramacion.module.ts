import { Module } from '@nestjs/common';
import { ReprogramacionService } from './reprogramacion.service';
import { ReprogramacionController } from './reprogramacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reprogramacion } from './entities/reprogramacion.entity';
import { ReservaModule } from 'src/reserva/reserva.module';
import { FechasExperienciaModule } from 'src/fechas-experiencia/fechas-experiencia.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reprogramacion]),
  ReservaModule, FechasExperienciaModule],
  controllers: [ReprogramacionController],
  providers: [ReprogramacionService],
})
export class ReprogramacionModule {}
