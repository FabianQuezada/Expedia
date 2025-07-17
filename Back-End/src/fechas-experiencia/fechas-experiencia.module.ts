import { Module } from '@nestjs/common';
import { FechasExperienciaService } from './fechas-experiencia.service';
import { FechasExperienciaController } from './fechas-experiencia.controller';

@Module({
  controllers: [FechasExperienciaController],
  providers: [FechasExperienciaService],
})
export class FechasExperienciaModule {}
