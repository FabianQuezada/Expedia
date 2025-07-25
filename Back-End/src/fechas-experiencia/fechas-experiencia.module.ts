import { Module } from '@nestjs/common';
import { FechasExperienciaService } from './fechas-experiencia.service';
import { FechasExperienciaController } from './fechas-experiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FechasExperiencia } from './entities/fechas-experiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FechasExperiencia])],
  controllers: [FechasExperienciaController],
  providers: [FechasExperienciaService],
  exports: [TypeOrmModule, FechasExperienciaService],
})
export class FechasExperienciaModule {}
