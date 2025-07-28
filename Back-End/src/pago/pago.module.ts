import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Usuario, Reserva])],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService]
})
export class PagoModule {}
