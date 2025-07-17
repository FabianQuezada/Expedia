import { Module } from '@nestjs/common';
import { CancelacionService } from './cancelacion.service';
import { CancelacionController } from './cancelacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancelacion } from './entities/cancelacion.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { ReservaModule } from 'src/reserva/reserva.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cancelacion]),
  ReservaModule],
  controllers: [CancelacionController],
  providers: [CancelacionService],
})
export class CancelacionModule {}
