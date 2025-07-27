import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { ReservaModule } from 'src/reserva/reserva.module';
import { forwardRef} from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Resena]), forwardRef(() => ReservaModule)],
  controllers: [ResenaController],
  providers: [ResenaService],
  exports: [TypeOrmModule,ResenaService],
})
export class ResenaModule {}
