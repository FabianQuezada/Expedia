import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { ReservaModule } from 'src/reserva/reserva.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resena]), ReservaModule],
  controllers: [ResenaController],
  providers: [ResenaService],
  exports: [ResenaService],
})
export class ResenaModule {}
